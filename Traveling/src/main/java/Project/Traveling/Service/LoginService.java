package Project.Traveling.Service;

import Project.Traveling.Exceptions.AdminException;
import Project.Traveling.Exceptions.CustomerException;
import Project.Traveling.Model.*;
import Project.Traveling.utills.JWT;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.security.auth.login.LoginException;

@Service
@RequiredArgsConstructor
public class LoginService {
    private static final Logger logger = LoggerFactory.getLogger(LoginService.class);

    private final AdminService adminService;
    private final CustomerService customerService;
    private final JWT jwt;

    @Value("${admin.email}")
    private String adminEmail;

    @Value("${admin.password}")
    private String adminPassword;
    public String register(UserDetails user) throws LoginException, CustomerException, AdminException {
        switch (user.getUserType()) {
            case CUSTOMER:
                logger.info("Registering customer: {}", user.getEmail());

                // Set the username by concatenating first name and last name or create a default username
                String username = user.getUserName();
                if (username == null || username.isEmpty()) {
                    username = user.getFirstName() + "_" + user.getLastName();
                }

                customerService.addCustomer(Customer.builder()
                        .customerID(0)
                        .firstName(user.getFirstName()) // Include firstName
                        .lastName(user.getLastName())   // Include lastName
                        .email(user.getEmail())
                        .password(user.getPassword())   // You should encrypt this in production
                        .username(username)             // Set the username
                        .build());
                break;
            default:
                throw new LoginException("Invalid user type");
        }
        String token = jwt.generateToken(user);
        logger.info("User registered successfully. Token: {}", token);
        return token;
    }


    public UserDetails loginUser(Credentials credentials) throws LoginException, CustomerException {
        logger.info("Attempting to log in with email: {}, userType: {}", credentials.getEmail(), credentials.getUserType());
        UserDetails userDetails;
        switch (credentials.getUserType()) {
            case ADMIN:
                userDetails = validateAdminCredentials(credentials);
                break;
            case CUSTOMER:
                userDetails = validateCustomerCredentials(credentials);
                break;
            default:
                logger.warn("Invalid user type: {}", credentials.getUserType());
                throw new LoginException("Invalid user type");
        }
        logger.info("User logged in successfully: {}", userDetails.getEmail());
        return userDetails;
    }

    private UserDetails validateAdminCredentials(Credentials credentials) throws LoginException {
        if (adminEmail.equals(credentials.getEmail()) && adminPassword.equals(credentials.getPassword())) {
            return UserDetails.builder()
                    .email(credentials.getEmail())
                    .userName("Admin")
                    .userType(UserType.ADMIN)
                    .userId(1)
                    .password(credentials.getPassword())
                    .build();
        } else {
            throw new LoginException("Invalid admin credentials");
        }
    }

    private UserDetails validateCustomerCredentials(Credentials credentials) throws LoginException, CustomerException {
        logger.info("Validating customer credentials for: {}", credentials.getEmail());
        if (!customerService.isCustomerExists(credentials.getEmail(), credentials.getPassword())) {
            logger.warn("Customer not found or wrong credentials: {}", credentials.getEmail());
            throw new LoginException("Login failed: Wrong email or password for customer");
        } else {
            Customer customer = customerService.login(credentials.getEmail(), credentials.getPassword());
            return UserDetails.builder()
                    .email(customer.getEmail())
                    .userName(customer.getFirstName() + "_" + customer.getLastName())
                    .userType(UserType.CUSTOMER)
                    .userId(customer.getCustomerID())
                    .password(customer.getPassword())
                    .build();
        }
    }

    public boolean validateToken(String token) {
        try {
            return jwt.validateToken(token);
        } catch (Exception e) {
            logger.error("Token validation failed: {}", e.getMessage());
            return false;
        }
    }

    public boolean checkUser(String token, UserType userType) {
        try {
            return jwt.checkUser(token, userType);
        } catch (Exception e) {
            logger.error("Failed to check user: {}", e.getMessage());
            return false;
        }
    }
}

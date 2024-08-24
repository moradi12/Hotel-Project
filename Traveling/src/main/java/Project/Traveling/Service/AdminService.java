package Project.Traveling.Service;

import Project.Traveling.Exceptions.AdminException;
import Project.Traveling.Model.Customer;
import Project.Traveling.Repo.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AdminService {

    private static final Logger logger = LoggerFactory.getLogger(AdminService.class);

    @Value("${admin.email}")
    private String adminEmail;

    @Value("${admin.password}")
    private String adminPassword;

    private final CustomerRepository customerRepository;

    public boolean isAdminExists(String email, String password) {
        return adminEmail.equals(email) && adminPassword.equals(password);
    }

    public boolean login(String email, String password) throws AdminException {
        if (isAdminExists(email, password)) {
            logger.info("Admin login successful for email: {}", email);
            return true;
        } else {
            throw new AdminException("Invalid email or password");
        }
    }

    public void addCustomer(Customer customer) {
        if (customerRepository.existsById(customer.getCustomerID())) {
            throw new AdminException("Customer with the same ID already exists");
        }
        if (customerRepository.existsByEmail(customer.getEmail())) {
            throw new AdminException("Customer with the same email already exists");
        }
        customerRepository.save(customer);
        logger.info("Customer added with ID: {}", customer.getCustomerID());
    }

    public boolean updateCustomer(Customer customer) {
        long id = customer.getCustomerID();
        if (!customerRepository.existsById(id)) {
            throw new AdminException("Customer not found");
        }
        Optional<Customer> existingCustomerByEmail = customerRepository.findByEmail(customer.getEmail());
        if (existingCustomerByEmail.isPresent() && existingCustomerByEmail.get().getCustomerID() != id) {
            throw new AdminException("Customer with the same email already exists");
        }
        customerRepository.saveAndFlush(customer);
        logger.info("Customer updated with ID: {}", id);
        return true;
    }

    public void deleteCustomer(long customerId) {
        if (!customerRepository.existsById(customerId)) {
            throw new AdminException("Customer not found");
        }
        customerRepository.deleteById(customerId);
        logger.info("Customer deleted with ID: {}", customerId);
    }

    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    public Optional<Customer> getOneCustomer(long customerId) {
        return customerRepository.findById(customerId);
    }
}

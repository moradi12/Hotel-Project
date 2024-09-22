package Project.Traveling.Controller;

import Project.Traveling.Exceptions.AdminException;
import Project.Traveling.Exceptions.CustomerException;
import Project.Traveling.Model.Credentials;
import Project.Traveling.Model.UserDetails;
import Project.Traveling.Service.IBookedRoomService;
import Project.Traveling.Service.LoginService;
import Project.Traveling.utills.JWT;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.security.auth.login.LoginException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/booked-rooms")
@RequiredArgsConstructor
@CrossOrigin
public class BookedRoomController {

    private final JWT jwt;
    private final IBookedRoomService bookedRoomService;
    private final LoginService loginService;

    @PostMapping("/register-user")
    public ResponseEntity<?> registerUser(@RequestBody UserDetails userDetails) {
        System.out.println("Received registration request for user: " + userDetails.getEmail());
        try {
            // Register the user and generate JWT token
            String token = loginService.register(userDetails);

            // Prepare response headers with the token
            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "Bearer " + token);

            // Return token and success message
            Map<String, Object> responseBody = new HashMap<>();
            responseBody.put("token", token);
            responseBody.put("message", "User registered successfully");

            return new ResponseEntity<>(responseBody, headers, HttpStatus.CREATED);

        } catch (LoginException | CustomerException | AdminException e) {
            // Return structured error response for client-side handling
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "Registration failed");
            errorResponse.put("message", e.getMessage());

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        } catch (Exception e) {
            // Return structured error response for internal server errors
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "Registration failed");
            errorResponse.put("message", e.getMessage());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Credentials credentials) {
        try {
            // Attempt to log in the user
            UserDetails user = loginService.loginUser(credentials);

            // Print only the email of the user after successful login
            System.out.println("User successfully logged in with email: " + user.getEmail());

            // Generate JWT token and prepare response
            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "Bearer " + jwt.generateToken(user));

            // Prepare response body with user details
            Map<String, Object> responseBody = new HashMap<>();
            responseBody.put("id", user.getUserId());
            responseBody.put("userName", user.getUserName());
            responseBody.put("message", "User logged in successfully");

            return new ResponseEntity<>(responseBody, headers, HttpStatus.CREATED);

        } catch (LoginException | CustomerException | AdminException e) {
            // Return structured error response for unauthorized login attempts
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "Login failed");
            errorResponse.put("message", e.getMessage());

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
        } catch (Exception e) {
            // Return structured error response for internal server errors
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "Login failed");
            errorResponse.put("message", e.getMessage());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }
}

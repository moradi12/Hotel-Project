package Project.Traveling.Controller;

import Project.Traveling.Exceptions.AdminException;
import Project.Traveling.Exceptions.CustomerException;
import Project.Traveling.Model.BookedRoom;
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

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody UserDetails userDetails) {
        System.out.println("Received registration request for user: " + userDetails.getEmail());
        try {
            String token = loginService.register(userDetails);
            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "Bearer " + token);

            return new ResponseEntity<>(token, headers, HttpStatus.CREATED);
        } catch (LoginException | CustomerException | AdminException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Registration failed: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Registration failed: " + e.getMessage());
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

            Map<String, Object> map = new HashMap<>();
            map.put("id", user.getUserId());
            map.put("userName", user.getUserName());

            return new ResponseEntity<>(map, headers, HttpStatus.CREATED);
        } catch (LoginException | CustomerException | AdminException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Login failed: " + e.getMessage());
        }
    }}

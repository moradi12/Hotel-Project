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

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Credentials credentials) throws LoginException {
        try {
            UserDetails user = loginService.loginUser(credentials);
            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "Bearer " + jwt.generateToken(user));
            Map<String, Object> map = new HashMap<>();
            map.put("id", user.getUserId());
            map.put("userName", user.getUserName());
            return new ResponseEntity<>(map, headers, HttpStatus.CREATED);
        } catch (LoginException | CustomerException | AdminException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Login failed: " + e.getMessage());
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody UserDetails userDetails) {
        try {
            System.out.println("Received registration request for user: " + userDetails.getEmail());
            String token = loginService.register(userDetails);
            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "Bearer " + token);
            return new ResponseEntity<>("User registered successfully", headers, HttpStatus.CREATED);
        } catch (LoginException | CustomerException | AdminException e) {
            System.err.println("Registration failed: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Registration failed: " + e.getMessage());
        } catch (Exception e) {
            System.err.println("Unexpected error during registration: " + e.getMessage());
            return new ResponseEntity<>("An error occurred while processing your request.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }}
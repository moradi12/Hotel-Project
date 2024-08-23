package Project.Traveling.Controller;

import Project.Traveling.Model.BookedRoom;
import Project.Traveling.Service.IBookedRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/booked-rooms")
@RequiredArgsConstructor
public class BookedRoomController {

    private final IBookedRoomService bookedRoomService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody BookedRoom bookedRoom) {
        try {
            BookedRoom savedBooking = bookedRoomService.registerUser(bookedRoom);
            return new ResponseEntity<>(savedBooking, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>("An error occurred while processing your request.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

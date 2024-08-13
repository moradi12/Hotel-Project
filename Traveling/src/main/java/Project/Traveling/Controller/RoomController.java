package Project.Traveling.Controller;

import Project.Traveling.Exceptions.PhotoRetrievalException;
import Project.Traveling.Exceptions.ResourceNotFoundException;
import Project.Traveling.Model.BookedRoom;
import Project.Traveling.Model.Room;
import Project.Traveling.Response.BookingResponse;
import Project.Traveling.Response.RoomResponse;
import Project.Traveling.Service.BookingService;
import Project.Traveling.Service.IRoomService;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.rowset.serial.SerialBlob;
import java.io.IOException;
import java.math.BigDecimal;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@RestController
@RequestMapping("/rooms")
@CrossOrigin(origins = "http://localhost:5173")
public class RoomController {

    private final IRoomService roomService;
    private final BookingService bookingService;

    @PostMapping("/add/new-room")
    public ResponseEntity<RoomResponse> addNewRoom(
            @RequestParam("photo") MultipartFile photo,
            @RequestParam("roomType") String roomType,
            @RequestParam("roomPrice") BigDecimal roomPrice) throws SQLException, IOException {
        // Log incoming data
        System.out.println("Adding new room with type: " + roomType + " and price: " + roomPrice); // Added
        System.out.println("Photo: " + photo.getOriginalFilename()); // Added

        Room savedRoom = roomService.addNewRoom(photo, roomType, roomPrice);
        RoomResponse response = new RoomResponse(savedRoom.getId(), savedRoom.getRoomType(), savedRoom.getRoomPrice());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/room/types")
    public List<String> getRoomTypes() {
        return roomService.getAllRoomTypes();
    }

    @PutMapping("/update/{roomId}")
    public ResponseEntity<?> updateRoom(@PathVariable Long roomId,
                                        @RequestParam(required = false) String roomType,
                                        @RequestParam(required = false) BigDecimal roomPrice,
                                        @RequestParam(required = false) MultipartFile photo) {

        byte[] photoBytes = null;
        try {
            if (photo != null && !photo.isEmpty()) {
                System.out.println("Updating photo for room ID: " + roomId); // Added
                photoBytes = photo.getBytes();
            } else {
                System.out.println("No photo provided, retrieving existing photo for room ID: " + roomId); // Added
                photoBytes = roomService.getRoomPhotoByRoomId(roomId);
            }
        } catch (IOException | SQLException e) {
            System.err.println("Error processing the photo or retrieving existing photo: " + e.getMessage()); // Added
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error processing the photo or retrieving existing photo: " + e.getMessage()); // Added
        }

        Room theRoom = roomService.updateRoom(roomId, roomType, roomPrice, photoBytes);

        RoomResponse roomResponse = getRoomResponse(theRoom);

        return ResponseEntity.ok(roomResponse);
    }

    @PutMapping("/edit/{roomId}")
    public ResponseEntity<RoomResponse> editRoom(
            @PathVariable Long roomId,
            @RequestParam(value = "photo", required = false) MultipartFile photo,
            @RequestParam("roomType") String roomType,
            @RequestParam("roomPrice") BigDecimal roomPrice) throws SQLException, IOException {
        // Log the incoming request data
        System.out.println("Editing room with ID: " + roomId); // Added
        System.out.println("New room type: " + roomType); // Added
        System.out.println("New room price: " + roomPrice); // Added
        if (photo != null) {
            System.out.println("New photo: " + photo.getOriginalFilename()); // Added
        } else {
            System.out.println("No new photo provided."); // Added
        }

        Room updatedRoom = roomService.editRoom(roomId, photo, roomType, roomPrice);
        RoomResponse response = new RoomResponse(updatedRoom.getId(), updatedRoom.getRoomType(), updatedRoom.getRoomPrice());
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/delete/{roomId}")
    public ResponseEntity<String> deleteRoom(@PathVariable Long roomId) {
        try {
            roomService.deleteRoom(roomId);
            return ResponseEntity.ok("Room deleted successfully.");
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while deleting the room.");
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<Room>> getAllRooms() throws SQLException {
        List<Room> rooms = roomService.getAllRooms();
        System.out.println("Fetched rooms from DB: " + rooms); // Added
        return ResponseEntity.ok(rooms);
    }

    private RoomResponse getRoomResponse(Room room) throws PhotoRetrievalException {
        List<BookedRoom> bookings = getAllBookingsByRoomId(room.getId());
        return new RoomResponse(room.getId(), room.getRoomType(), room.getRoomPrice(), room.isBooked());
    }

    private List<BookedRoom> getAllBookingsByRoomId(Long roomId) {
        return bookingService.getAllBookingsByRoomId(roomId);
    }

    @GetMapping("/room/{roomId}")
    public ResponseEntity<Optional<RoomResponse>> getRoomById(@PathVariable Long roomId) {
        Optional<Room> theRoom = roomService.getRoomById(roomId);
        return theRoom.map(room -> {
            RoomResponse roomResponse = getRoomResponse(room);
            return ResponseEntity.ok(Optional.of(roomResponse));
        }).orElseThrow(() -> new ResourceNotFoundException("Room not found"));
    }
}

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

import java.io.IOException;
import java.math.BigDecimal;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/rooms")
public class RoomController {

    private final IRoomService roomService;
    private final BookingService bookingService;

    @PostMapping("/add/new-room")
    public ResponseEntity<RoomResponse> addNewRoom(
            @RequestParam("photo") MultipartFile photo,
            @RequestParam("roomType") String roomType,
            @RequestParam("roomPrice") BigDecimal roomPrice) throws SQLException, IOException {
        Room savedRoom = roomService.addNewRoom(photo, roomType, roomPrice);
        RoomResponse response = new RoomResponse(savedRoom.getId(), savedRoom.getRoomType(), savedRoom.getRoomPrice());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/room/types")
    public List<String> getRoomTypes() {
        return roomService.getAllRoomTypes();
    }




    @PutMapping("/edit/{roomId}")
    public ResponseEntity<RoomResponse> editRoom(
            @PathVariable Long roomId,
            @RequestParam(value = "photo", required = false) MultipartFile photo,
            @RequestParam("roomType") String roomType,
            @RequestParam("roomPrice") BigDecimal roomPrice) throws SQLException, IOException {
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
        System.out.println("Fetched rooms from DB: " + rooms);

//        List<RoomResponse> responses = new ArrayList<>();
//        for (Room room : rooms) {
//            byte[] photoBytes = roomService.getRoomPhotoByRoomId(room.getId());
//            if (photoBytes != null && photoBytes.length > 0) {
//                String base64Photo = new Base64().encodeBase64String(photoBytes);
//                RoomResponse roomResponse = getRoomResponse(room);
//                roomResponse.setPhoto(base64Photo);
//                responses.add(roomResponse);
//            }
//        }
//
//        System.out.println("Responses to be sent: " + responses);
        return ResponseEntity.ok(rooms);
    }

    private RoomResponse getRoomResponse(Room room) throws PhotoRetrievalException {
        List<BookedRoom> bookings = getAllBookingsByRoomId(room.getId());
//        List<BookingResponse> bookingInfo = bookings.stream()
//                .map(booking -> new BookingResponse(
//                        booking.getBookingId(),
//                        booking.getCheckInDate(),
//                        booking.getCheckOutDate(),
//                        booking.getBookingConformationCode()
//                ))
//                .toList();
        byte[] photoBytes = null;
//        Blob photoBlob = room.getPhoto();
//        if (photoBlob != null) {
//            try {
//                photoBytes = photoBlob.getBytes(1, (int) photoBlob.length());
//            } catch (SQLException e) {
//                throw new PhotoRetrievalException("Error retrieving photo", e);
//            }
//        }
        return new RoomResponse(room.getId(), room.getRoomType(), room.getRoomPrice(), room.isBooked());//, photoBytes);
    }

    private List<BookedRoom> getAllBookingsByRoomId(Long roomId) {
        return bookingService.getAllBookingsByRoomId(roomId);
    }
}

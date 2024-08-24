package Project.Traveling.Controller;

import Project.Traveling.Exceptions.InvalidBookingsRequestException;
import Project.Traveling.Exceptions.ResourceNotFoundException;
import Project.Traveling.Model.BookedRoom;
import Project.Traveling.Model.Room;
import Project.Traveling.Response.BookingResponse;
import Project.Traveling.Response.RoomResponse;
import Project.Traveling.Service.IBookingService;
import Project.Traveling.Service.IRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/bookings")
public class BookingController {
    private final IBookingService bookingService;
    private final IRoomService iroomService;

    @GetMapping("all-bookings")
    public ResponseEntity<List<BookingResponse>> getAllBookings() {
        List<BookedRoom> bookings = bookingService.getAllBookings();
        List<BookingResponse> bookingResponses = new ArrayList<>();
        for (BookedRoom booking : bookings) {
            BookingResponse bookingResponse = getBookingResponse(booking);
            bookingResponses.add(bookingResponse);
        }
        return ResponseEntity.ok(bookingResponses);
    }

    @GetMapping("/confirmation/{confirmationCode}")
    public ResponseEntity<?> getBookingByConfirmationCode(@PathVariable String confirmationCode) {
        try {
            BookedRoom booking = bookingService.findBookingByConfirmationCode(confirmationCode);
            BookingResponse bookingResponse = getBookingResponse(booking);
            return ResponseEntity.ok(bookingResponse);
        } catch (ResourceNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }
    }

    @PostMapping("/room/{roomId}/booking")
    public ResponseEntity<?> saveBooking(@PathVariable Long roomId,
                                         @RequestBody BookedRoom bookingRequest) {
        try {
            String confirmationCode = bookingService.saveBooking(roomId, bookingRequest);
            return ResponseEntity.ok("Room booked successfully! Your booking confirmation code is: " + confirmationCode);
        } catch (InvalidBookingsRequestException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/booking/{bookingId}/delete")
    public void cancelBooking(@PathVariable Long bookingId) {
        bookingService.cancelBooking(bookingId);
    }

    private BookingResponse getBookingResponse(BookedRoom booking) {
        Room theRoom = iroomService.getRoomById(booking.getRoom().getId()).orElseThrow(() -> new ResourceNotFoundException("Room not found"));
        RoomResponse roomResponse = new RoomResponse(
                theRoom.getId(),
                theRoom.getRoomType(),
                theRoom.getRoomPrice());
        return new BookingResponse(
                booking.getBookingId(),
                booking.getCheckInDate(),
                booking.getCheckOutDate(),
                booking.getGustFullName(),
                booking.getGuestEmail(),
                booking.getNumberOfAdults(),
                booking.getNumberOfChildren(),
                booking.getTotalNumberOfGuest(),
                booking.getBookingConfirmationCode(),
                roomResponse
        );
    }
}

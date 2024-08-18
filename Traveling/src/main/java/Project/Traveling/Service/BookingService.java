package Project.Traveling.Service;

import Project.Traveling.Exceptions.InvalidBookingsRequestException;
import Project.Traveling.Model.BookedRoom;
import Project.Traveling.Model.Room;
import Project.Traveling.Repo.BookingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookingService implements IBookingService {
    private final BookingRepository bookingRepository;
    private final IRoomService roomService;

    @Override
    public List<BookedRoom> getAllBookings() {
        return bookingRepository.findAll();
    }

    public List<BookedRoom> getAllBookingsByRoomId(Long roomId) {
        return bookingRepository.findByRoomId(roomId);
    }

    @Override
    public void cancelBooking(Long bookingId) {
        bookingRepository.deleteById(bookingId);
    }

    @Override
    public String saveBooking(Long roomId, BookedRoom bookingRequest) {
        if (bookingRequest.getCheckOutDate().isBefore(bookingRequest.getCheckInDate())) {
            throw new InvalidBookingsRequestException("Check-in date must be before check-out date");
        }

        Room room = roomService.getRoomById(roomId).orElseThrow(() ->
                new InvalidBookingsRequestException("Room not found"));
        List<BookedRoom> existingBookings = room.getBookings();
        boolean roomIsAvailable = roomIsAvailable(bookingRequest, existingBookings);

        if (roomIsAvailable) {
            room.addBooking(bookingRequest);
            bookingRepository.save(bookingRequest);
            return bookingRequest.getBookingConfirmationCode();
        } else {
            throw new InvalidBookingsRequestException("Sorry, this room is unavailable for those dates");
        }
    }

    @Override
    public BookedRoom findBookingByConfirmationCode(String confirmationCode) {
        return bookingRepository.findByBookingConfirmationCode(confirmationCode)
                .orElseThrow(() -> new InvalidBookingsRequestException("Booking not found"));
    }

    private boolean roomIsAvailable(BookedRoom bookingRequest, List<BookedRoom> existingBookings) {
        return existingBookings.stream()
                .noneMatch(existingBooking ->
                        bookingRequest.getCheckInDate().equals(existingBooking.getCheckInDate())
                                || bookingRequest.getCheckOutDate().isBefore(existingBooking.getCheckOutDate())
                                || (bookingRequest.getCheckInDate().isAfter(existingBooking.getCheckInDate())
                                && bookingRequest.getCheckInDate().isBefore(existingBooking.getCheckOutDate()))
                                || (bookingRequest.getCheckInDate().isBefore(existingBooking.getCheckInDate())
                                && bookingRequest.getCheckOutDate().equals(existingBooking.getCheckInDate()))
                                || bookingRequest.getCheckOutDate().equals(existingBooking.getCheckOutDate())
                                || (bookingRequest.getCheckInDate().isBefore(existingBooking.getCheckOutDate())
                                && bookingRequest.getCheckOutDate().isAfter(existingBooking.getCheckOutDate()))
                                || bookingRequest.getCheckOutDate().isAfter(existingBooking.getCheckOutDate())
                                || (bookingRequest.getCheckInDate().equals(existingBooking.getCheckInDate())
                                && bookingRequest.getCheckOutDate().equals(existingBooking.getCheckOutDate()))
                );
    }
}

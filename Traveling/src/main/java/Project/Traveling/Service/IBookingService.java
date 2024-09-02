package Project.Traveling.Service;

import Project.Traveling.Model.BookedRoom;

import java.util.List;
public interface IBookingService {


    void cancelBooking(Long bookingId);

    String saveBooking(Long roomId, BookedRoom bookingRequest);

    BookedRoom findBookingByConfirmationCode(String confirmationCode);

    List<BookedRoom> getAllBookings();

    List<BookedRoom> getAllBookingsByRoomId(Long roomId);
}

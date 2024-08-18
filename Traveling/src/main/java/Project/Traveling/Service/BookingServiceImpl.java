package Project.Traveling.Service;

import Project.Traveling.Model.BookedRoom;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class BookingServiceImpl implements IBookingService {

    @Override
    public void cancelBooking(Long bookingId) {
        // Implementation here
    }

    @Override
    public String saveBooking(Long roomId, BookedRoom bookingRequest) {
        // Implementation here
        return null;
    }

    @Override
    public BookedRoom findBookingByConfirmationCode(String confirmationCode) {
        // Implementation here
        return null;
    }

    @Override
    public List<BookedRoom> getAllBookings() {
        // Implementation here
        return null;
    }
}

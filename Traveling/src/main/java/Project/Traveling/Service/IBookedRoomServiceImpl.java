package Project.Traveling.Service;

import Project.Traveling.Model.BookedRoom;
import Project.Traveling.Repo.BookedRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class IBookedRoomServiceImpl implements IBookedRoomService {

    private final BookedRepo bookedRepo;

    @Override
    public BookedRoom registerUser(BookedRoom bookedRoom) {
        // Validate guest's email and full name
        if (bookedRoom.getGuestEmail() == null || bookedRoom.getGuestEmail().isEmpty()) {
            throw new IllegalArgumentException("Guest email is required.");
        }
        if (bookedRoom.getGustFullName() == null || bookedRoom.getGustFullName().isEmpty()) {
            throw new IllegalArgumentException("Guest full name is required.");
        }

        bookedRoom.calculateTotalNumberOfGuest();

        if (bookedRoom.getBookingConfirmationCode() == null || bookedRoom.getBookingConfirmationCode().isEmpty()) {
            bookedRoom.setBookingConformationCode(generateConfirmationCode());
        }

        return bookedRepo.save(bookedRoom);
    }

    private String generateConfirmationCode() {
        return java.util.UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }
}

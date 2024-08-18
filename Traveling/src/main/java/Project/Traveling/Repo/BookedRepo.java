package Project.Traveling.Repo;

import Project.Traveling.Model.BookedRoom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BookedRepo extends JpaRepository<BookedRoom,Long> {
    Optional<BookedRoom> findByBookingConfirmationCode(String confirmationCode);
    List<BookedRoom> findByRoomId(Long roomId);
}

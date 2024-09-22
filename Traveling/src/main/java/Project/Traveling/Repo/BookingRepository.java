package Project.Traveling.Repo;

import Project.Traveling.Model.BookedRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookingRepository extends JpaRepository<BookedRoom, Long> {

    List<BookedRoom> findByRoomId(Long roomId);

    @Query("SELECT b FROM BookedRoom b WHERE b.bookingConfirmationCode = :confirmationCode")
    Optional<BookedRoom> findByBookingConfirmationCode(@Param("confirmationCode") String confirmationCode);

    List<BookedRoom> findByGuestEmail(String email);

}
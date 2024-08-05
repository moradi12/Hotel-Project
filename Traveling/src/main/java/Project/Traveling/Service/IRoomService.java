package Project.Traveling.Service;

import Project.Traveling.Model.Room;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.sql.SQLException;
import java.util.List;

public interface IRoomService  {
    Room addNewRoom(MultipartFile photo, String roomType, BigDecimal roomPrice) throws IOException, SQLException;

    List<String> getAllRoomTypes();

    List<Room> getAllRooms();

    byte[] getRoomPhotoByRoomId(Long roomId) throws SQLException;

    Room editRoom(Long roomId, MultipartFile photo, String roomType, BigDecimal roomPrice) throws IOException, SQLException;

    void deleteRoom(Long roomId);
}


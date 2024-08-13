package Project.Traveling.Service;

import Project.Traveling.Exceptions.InternalServerException;
import Project.Traveling.Exceptions.ResourceNotFoundException;
import Project.Traveling.Model.Room;
import Project.Traveling.Repo.RoomRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.rowset.serial.SerialBlob;
import java.io.IOException;
import java.math.BigDecimal;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RoomServiceImpl implements IRoomService {
    private final RoomRepo roomRepo;

    @Override
    public Room addNewRoom(MultipartFile file, String roomType, BigDecimal roomPrice) throws IOException, SQLException {
        Room room = new Room();
        room.setRoomType(roomType);
        room.setRoomPrice(roomPrice);
        if (!file.isEmpty()) {
            byte[] photoBytes = file.getBytes();
//            Blob photoBlob = new SerialBlob(photoBytes);
//            room.setPhoto(photoBlob);
        }


        return roomRepo.save(room);
    }

    Room room = new Room();

    @Override
    public List<String> getAllRoomTypes() {
        return roomRepo.findDistinctRoomTypes();


    }


    @Override
    public List<Room> getAllRooms() {
        return roomRepo.findAll();
    }

    @Override
    public byte[] getRoomPhotoByRoomId(Long roomId) throws SQLException {
        Optional<Room> theRoom = roomRepo.findById(roomId);
        if (theRoom.isEmpty()) {
            throw new ResourceNotFoundException("Sorry, Room not found!");
        }
//        Blob photoBlob = theRoom.get().getPhoto();
//        if (photoBlob == null) {
//            return photoBlob.getBytes(1, (int) photoBlob.length());
//        }
        return null;
    }

    @Override
    public Room editRoom(Long roomId, MultipartFile photo, String roomType, BigDecimal roomPrice) throws IOException, SQLException {
        Optional<Room> optionalRoom = roomRepo.findById(roomId);
        if (optionalRoom.isEmpty()) {
            throw new ResourceNotFoundException("Sorry, Room not found!");
        }

        Room room = optionalRoom.get();
        room.setRoomType(roomType);
        room.setRoomPrice(roomPrice);

//        if (photo != null && !photo.isEmpty()) {
//            byte[] photoBytes = photo.getBytes();
//            Blob photoBlob = new SerialBlob(photoBytes);
//            room.setPhoto(photoBlob);
//        }

        return roomRepo.save(room);
    }

    @Override
    public List<Room> deleteRoom(Long roomId) {
        Room room = roomRepo.findById(roomId)
                .orElseThrow(() -> new ResourceNotFoundException("Sorry, Room not found!"));

        // Remove all associated bookings before deleting the room
        if (!room.getBookings().isEmpty()) {
            room.getBookings().clear();
        }

        roomRepo.delete(room);
        return roomRepo.findAll();
    }

    @Override
    public Room updateRoom(Long roomId, String roomType, BigDecimal roomPrice, byte[] photoBytes) {
        Room room = roomRepo.findById(roomId)
                .orElseThrow(() -> new ResourceNotFoundException("Room not found"));

        if (roomType != null) room.setRoomType(roomType);
        if (roomPrice != null) room.setRoomPrice(roomPrice);
        if (photoBytes != null && photoBytes.length > 0) {
            try {
                room.setPhoto(new SerialBlob(photoBytes));
            } catch (SQLException ex) {
                throw new InternalServerException("Error updating room");
            }
        }

        return roomRepo.saveAndFlush(room);
    }

    @Override
    public Optional<Room> getRoomById(Long roomId) {
        return Optional.of(roomRepo.findById(roomId).get());
    }


}



//    public void forceDeleteCustomer(int customerId) throws CustomerExceptionException {
//        Customer customer = customerRepository.findById(customerId)
//                .orElseThrow(() -> new CustomerNotFoundException(ErrMsg.CUSTOMER_NOT_FOUND.getMsg()));
//        List<Coupon> customerCoupons = customer.getCoupons();
//        for (Coupon coupon : customerCoupons) {
//            couponRepository.delete(coupon);
//        }
//        customerRepository.delete(customer);
//
//        System.out.println("Customer and associated coupons forcefully deleted with ID: " + customerId);
//    }
//
//
//    public List<Customer> getAllCustomers() {
//        return customerRepository.findAll();
//    }
//
//
//    public Optional<Customer> getOneCustomer(int customerId) {
//        return customerRepository.findById(customerId);
//    }
//}


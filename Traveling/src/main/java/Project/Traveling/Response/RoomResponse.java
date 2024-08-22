package Project.Traveling.Response;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Base64;
import java.util.List;

@NoArgsConstructor
@Data
public class RoomResponse {

    private Long id;
    private String roomType;
    private BigDecimal roomPrice;
    private boolean isBooked;
    private String photo;

    private List<BookingResponse> bookings;

    public RoomResponse(Long id, String roomType, BigDecimal roomPrice) {
        this.id = id;
        this.roomType = roomType;
        this.roomPrice = roomPrice;
    }

    public RoomResponse(Long id, String roomType,
                        BigDecimal roomPrice,
                        boolean isBooked){//,
        //byte[] photoBytes) { // Removed bookings parameter for clarity
        this.id = id;
        this.roomType = roomType;
        this.roomPrice = roomPrice;
        this.isBooked = isBooked;
//        this.photo = photoBytes != null ? Base64.getEncoder().encodeToString(photoBytes) : null;
//        this.bookings = bookings; // Uncomment if needed and modify constructor accordingly
    }

}

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
    private String photo;  // This stores the base64 encoded string of the photo
    private List<BookingResponse> bookings;

    // Constructor with minimal fields
    public RoomResponse(Long id, String roomType, BigDecimal roomPrice) {
        this.id = id;
        this.roomType = roomType;
        this.roomPrice = roomPrice;
    }

    // Constructor with basic fields including isBooked
    public RoomResponse(Long id, String roomType, BigDecimal roomPrice, boolean isBooked) {
        this.id = id;
        this.roomType = roomType;
        this.roomPrice = roomPrice;
        this.isBooked = isBooked;
    }

    // Constructor that includes photo as a byte array, converting it to base64
    public RoomResponse(Long id, String roomType,
                        BigDecimal roomPrice,
                        boolean isBooked,
                        byte[] photoBytes) {
        this.id = id;
        this.roomType = roomType;
        this.roomPrice = roomPrice;
        this.isBooked = isBooked;
        this.photo = photoBytes != null ? Base64.getEncoder().encodeToString(photoBytes) : null;
    }

    // Constructor that includes all fields: photo as a byte array, bookings, and other room details
    public RoomResponse(Long id, String roomType,
                        BigDecimal roomPrice,
                        boolean isBooked,
                        byte[] photoBytes,
                        List<BookingResponse> bookings) {
        this.id = id;
        this.roomType = roomType;
        this.roomPrice = roomPrice;
        this.isBooked = isBooked;
        this.photo = photoBytes != null ? Base64.getEncoder().encodeToString(photoBytes) : null;
        this.bookings = bookings;
    }

    // Constructor that accepts a photo as a base64 string directly
    public RoomResponse(Long id, String roomType,
                        BigDecimal roomPrice,
                        boolean isBooked,
                        String photoBase64) {
        this.id = id;
        this.roomType = roomType;
        this.roomPrice = roomPrice;
        this.isBooked = isBooked;
        this.photo = photoBase64;
    }

    // Constructor that includes all fields: photo as a base64 string, bookings, and other room details
    public RoomResponse(Long id, String roomType,
                        BigDecimal roomPrice,
                        boolean isBooked,
                        String photoBase64,
                        List<BookingResponse> bookings) {
        this.id = id;
        this.roomType = roomType;
        this.roomPrice = roomPrice;
        this.isBooked = isBooked;
        this.photo = photoBase64;
        this.bookings = bookings;
    }
}

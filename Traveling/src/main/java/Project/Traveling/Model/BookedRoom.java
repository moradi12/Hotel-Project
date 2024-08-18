package Project.Traveling.Model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor


public class BookedRoom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookingId;

    @Column(name = "check_In")
    private LocalDate checkInDate;

    @Column(name = "check_Out")
    private LocalDate checkOutDate;
    @Column(name = "gust_FullName")
    private String gustFullName;

    @Column(name = "gust_Email")
    private String guestEmail;

    @Column(name = "adults")
    private int numberOfAdults;

    @Column(name = "children")
    private int numberOfChildren;

    @Column(name = "total")
    private int totalNumberOfGuest;

    @Column(name = "confirmation_Code")
    private String bookingConfirmationCode;

    @ManyToOne(fetch= FetchType.LAZY)
    @JoinColumn(name = "room_ID")
    private Room room;




    public void CalculateTotalNumberOfGuest() {
        this.totalNumberOfGuest = this.numberOfAdults + numberOfChildren;
    }

    public void setNumberOfAdults(int numberOfAdults) {
        numberOfAdults = numberOfAdults;
        CalculateTotalNumberOfGuest();
    }

    public void setNumberOfChildren(int numberOfChildren) {
        numberOfChildren = numberOfChildren;
        CalculateTotalNumberOfGuest();
    }

    public BookedRoom(String bookingConformationCode) {
        this.bookingConfirmationCode  = bookingConformationCode;
    }

    public void setBookingConformationCode(String bookingConformationCode) {
        this.bookingConfirmationCode  = bookingConformationCode;

    }

    public String getBookingConfirmationCode() {
        return this.bookingConfirmationCode ;
    }
}

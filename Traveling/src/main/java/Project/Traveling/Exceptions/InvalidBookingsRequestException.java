package Project.Traveling.Exceptions;

public class InvalidBookingsRequestException extends RuntimeException {

    // Default constructor
    public InvalidBookingsRequestException() {
        super("Invalid booking request.");
    }

    // Constructor that accepts a custom error message
    public InvalidBookingsRequestException(String message) {
        super(message);
    }

    // Constructor that accepts a custom error message and a cause
    public InvalidBookingsRequestException(String message, Throwable cause) {
        super(message, cause);
    }

    // Constructor that accepts a cause
    public InvalidBookingsRequestException(Throwable cause) {
        super(cause);
    }
}

package Project.Traveling.Exceptions;

public class InternalServerException extends RuntimeException {

    // Default constructor
    public InternalServerException() {
        super("An internal server error occurred");
    }

    // Constructor that accepts a custom error message
    public InternalServerException(String message) {
        super(message);
    }

    // Constructor that accepts a custom error message and a cause
    public InternalServerException(String message, Throwable cause) {
        super(message, cause);
    }

    // Constructor that accepts a cause
    public InternalServerException(Throwable cause) {
        super(cause);
    }
}

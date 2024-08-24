package Project.Traveling.Exceptions;

import lombok.Getter;

@Getter
public class AdminException extends RuntimeException {

    // Default constructor
    public AdminException() {
        super(ErrMsg.ADMIN_NOT_FOUND.getMsg());
    }

    // Constructor that accepts an ErrMsg enum
    public AdminException(ErrMsg errMsg) {
        super(errMsg.getMsg());
    }

    // Constructor that accepts an ErrMsg enum and a cause
    public AdminException(ErrMsg errMsg, Throwable cause) {
        super(errMsg.getMsg(), cause);
    }

    // Constructor that accepts a custom error message
    public AdminException(String message) {
        super(message);
    }

    // Constructor that accepts a custom error message and a cause
    public AdminException(String message, Throwable cause) {
        super(message, cause);
    }

    // Constructor that accepts a cause
    public AdminException(Throwable cause) {
        super(ErrMsg.ADMIN_NOT_FOUND.getMsg(), cause);
    }
}

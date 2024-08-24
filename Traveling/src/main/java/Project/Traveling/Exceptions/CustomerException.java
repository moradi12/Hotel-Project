package Project.Traveling.Exceptions;

import lombok.Getter;

@Getter
public class CustomerException extends RuntimeException {

    // Default constructor
    public CustomerException() {
        super(ErrMsg.CUSTOMER_ERROR.getMsg());
    }

    // Constructor that accepts an ErrMsg enum
    public CustomerException(ErrMsg errMsg) {
        super(errMsg.getMsg());
    }

    // Constructor that accepts an ErrMsg enum and a cause
    public CustomerException(ErrMsg errMsg, Throwable cause) {
        super(errMsg.getMsg(), cause);
    }

    // Constructor that accepts a custom error message
    public CustomerException(String message) {
        super(message);
    }

    // Constructor that accepts a custom error message and a cause
    public CustomerException(String message, Throwable cause) {
        super(message, cause);
    }

    // Constructor that accepts a cause
    public CustomerException(Throwable cause) {
        super(ErrMsg.CUSTOMER_ERROR.getMsg(), cause);
    }
}

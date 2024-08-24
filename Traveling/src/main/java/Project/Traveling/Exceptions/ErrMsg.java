package Project.Traveling.Exceptions;

import lombok.Getter;

@Getter
public enum ErrMsg {
    CUSTOMER_ALREADY_EXISTS("Customer already exists!"),
    CUSTOMER_NOT_FOUND("Customer not found"),
    AUTHENTICATION_FAILED("Authentication failed. Incorrect username or password"),
    UNAUTHORIZED_ACCESS("Unauthorized access. You do not have permission to perform this action"),
    CUSTOMER_ERROR("Error occurred while handling customer operation"),
    ADMIN_NOT_FOUND("Error: Admin not found. Please check the provided details and try again"),
    // Login
    LOGIN_FAILED("Login failed. Invalid username or password"),
    LOGIN_EXCEPTION("Login exception occurred"),
    ADMIN_NOT_ALLOWED("Admin registration is not allowed"),
    INVALID_USER_TYPE("Invalid user type");


    private final String msg;

    ErrMsg(String msg) {
        this.msg = msg;
    }

    public String getMsg() {
        return msg;
    }
}

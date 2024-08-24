package Project.Traveling.Model;

import jakarta.persistence.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class UserDetails {
    private long userId;
    private String userName;
    private String email;
    private String password;
    private UserType userType;

}

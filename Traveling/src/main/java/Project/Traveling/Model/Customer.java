package Project.Traveling.Model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "customer")
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long  customerID;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @NotNull
    @Size(min = 3, max = 20)
    @Column(nullable = false, length = 20)
    private String firstName;

    @Size(min = 3, max = 20)
    @Column(nullable = false, length = 40)
    private String lastName;

    // Optionally, you can include fields such as roles or account status
    // private String role;
    // private boolean active;
}

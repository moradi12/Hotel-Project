package Project.Traveling.Repo;

import Project.Traveling.Model.Role;  // Use your custom Role entity
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(String role);
    boolean existsByName(String role);
}

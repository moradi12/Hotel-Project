package Project.Traveling.Repo;

import Project.Traveling.Model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AdminRepository extends JpaRepository<Admin, Long> {
    Optional<Admin> findByEmailAndPassword(String email, String password);
}

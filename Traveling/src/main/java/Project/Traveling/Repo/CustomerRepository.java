package Project.Traveling.Repo;

import Project.Traveling.Model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {
    Boolean existsByEmail(String email);
    Boolean existsByEmailAndPassword(String email, String password);
    Optional<Customer> findByEmailAndPassword(String email, String password);
    Optional<Customer> findByEmail(String email);

}

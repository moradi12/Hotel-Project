package Project.Traveling.Service;

import Project.Traveling.Exceptions.CustomerException;
import Project.Traveling.Exceptions.ErrMsg;
import Project.Traveling.Model.Customer;
import Project.Traveling.Repo.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CustomerService {
    private final CustomerRepository customerRepository;

    public Customer login(String email, String password) throws CustomerException {
        Optional<Customer> customerOptional = customerRepository.findByEmailAndPassword(email, password);
        if (customerOptional.isPresent()) {
            return customerOptional.get();
        } else {
            throw new CustomerException("Login failed: Customer with the provided email and password does not exist.");
        }
    }

    public boolean isCustomerExists(String email, String password) throws CustomerException {
        if (!customerRepository.existsByEmailAndPassword(email, password)) {
            throw new CustomerException(ErrMsg.AUTHENTICATION_FAILED);
        }
        return true;
    }

    public boolean isCustomerExistsByEmail(String email) throws CustomerException {
        if (!customerRepository.existsByEmail(email)) {
            throw new CustomerException(ErrMsg.CUSTOMER_NOT_FOUND);
        }
        return true;
    }

    public void addCustomer(Customer customer) throws CustomerException {
        if (customerRepository.existsById(customer.getCustomerID()) || customerRepository.existsByEmail(customer.getEmail())) {
            throw new CustomerException(ErrMsg.CUSTOMER_ALREADY_EXISTS);
        }
        customerRepository.save(customer);
    }

    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    public void updateCustomer(Customer customer) throws CustomerException {
        long id = customer.getCustomerID(); // Using primitive long
        if (!customerRepository.existsById(id)) {
            throw new CustomerException(ErrMsg.CUSTOMER_NOT_FOUND);
        }
        Optional<Customer> existingCustomerByEmail = customerRepository.findByEmail(customer.getEmail());
        if (existingCustomerByEmail.isPresent() && existingCustomerByEmail.get().getCustomerID() != id) {
            throw new CustomerException(ErrMsg.CUSTOMER_ALREADY_EXISTS);
        }
        customerRepository.saveAndFlush(customer);
        System.out.println("Customer updated: " + customer);
    }

    public void deleteCustomer(long customerID) throws CustomerException { // Using primitive long
        if (!customerRepository.existsById(customerID)) {
            throw new CustomerException(ErrMsg.CUSTOMER_NOT_FOUND);
        }
        customerRepository.deleteById(customerID);
        System.out.println("Customer deleted successfully: " + customerID);
    }

    public Optional<Customer> getOneCustomer(long customerID) throws CustomerException { // Using primitive long
        Optional<Customer> customer = customerRepository.findById(customerID);
        if (customer.isEmpty()) {
            throw new CustomerException(ErrMsg.CUSTOMER_NOT_FOUND);
        }
        return customer;
    }
}

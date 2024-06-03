package pl.dmcs.springbootjsp_iwa.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.dmcs.springbootjsp_iwa.model.Doctor;
import pl.dmcs.springbootjsp_iwa.model.Patient;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Long> {
    Doctor findByUserUsername(String username);

    Doctor findByName(String name);
}

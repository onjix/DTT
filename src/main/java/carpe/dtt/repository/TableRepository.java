package carpe.dtt.repository;

import carpe.dtt.entity.Table1;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface TableRepository extends CrudRepository<Table1,Long> {
    Optional<Table1> findById(Long id);
}

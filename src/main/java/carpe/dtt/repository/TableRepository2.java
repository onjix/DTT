package carpe.dtt.repository;

import carpe.dtt.entity.Table;
import carpe.dtt.entity.Table2;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface TableRepository2 extends CrudRepository<Table2,Long> {
    Optional<Table2> findById(Long id);
}

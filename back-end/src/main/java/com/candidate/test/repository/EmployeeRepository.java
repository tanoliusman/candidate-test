package com.candidate.test.repository;

import com.candidate.test.model.Employee;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface EmployeeRepository extends MongoRepository<Employee,String> {
    List<Employee> findByCompanyId(String companyId);
}

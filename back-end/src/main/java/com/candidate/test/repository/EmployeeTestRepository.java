package com.candidate.test.repository;

import com.candidate.test.model.EmployeeTest;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface EmployeeTestRepository extends MongoRepository<EmployeeTest,String> {

    List<EmployeeTest> findEmployeeTestByEmployeeId(String employeeId);
    EmployeeTest findEmployeeTestByTestId(String testId);
    void deleteByTestId(String testId);
}

package com.candidate.test.service;

import com.candidate.test.model.Company;
import com.candidate.test.model.Employee;

import java.util.List;
import java.util.Optional;

public interface EmployeeService {

    List<Employee> getAllEmployees();

    Employee addNewEmployee(Employee company);

    Optional<Employee> getEmployeeById(String id);

    Employee updateEmployee(Employee company);

    String deleteEmployee(String id);

    List<Employee> getEmployeeByCompanyId(String companyId);
}

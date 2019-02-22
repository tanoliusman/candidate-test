package com.candidate.test.service.impl;

import com.candidate.test.model.Company;
import com.candidate.test.model.Employee;
import com.candidate.test.repository.EmployeeRepository;
import com.candidate.test.service.CompanyService;
import com.candidate.test.service.EmployeeService;
import com.candidate.test.service.EmployeeTestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeServiceImpl implements EmployeeService {
    @Autowired
    private EmployeeTestService employeeTestService;

    @Autowired
    private EmployeeRepository employeeRepository;
    @Autowired
    private CompanyService companyService;
    @Override
    public List<Employee> getAllEmployees() {

        List<Employee> employees= employeeRepository.findAll();
        for(Employee employee : employees){
            employee.setTests(employeeTestService.getAllEmployeeTests(employee.getId()));
        }
        return employees;
    }

    @Override
    public Employee addNewEmployee(Employee employee) {

        Employee createdEmployee = employeeRepository.save(employee);



        return createdEmployee;
    }

    @Override
    public Optional<Employee> getEmployeeById(String id) {
        return employeeRepository.findById(id);
    }

    @Override
    public Employee updateEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    @Override
    public String deleteEmployee(String id) {
        try {
            employeeRepository.deleteById(id);
        }catch(Exception ex){
            return "false";
        }
        return "true";
    }

    @Override
    public List<Employee> getEmployeeByCompanyId(String companyId) {
        return employeeRepository.findByCompanyId(companyId);
    }
}

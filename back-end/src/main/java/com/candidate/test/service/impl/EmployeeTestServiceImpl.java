package com.candidate.test.service.impl;

import com.candidate.test.model.EmployeeTest;
import com.candidate.test.repository.EmployeeTestRepository;
import com.candidate.test.service.EmployeeTestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeTestServiceImpl implements EmployeeTestService {


    @Autowired
    private EmployeeTestRepository employeeTestRepository;

    @Override
    public EmployeeTest addEmployeeTest(EmployeeTest employee) {
        return employeeTestRepository.save(employee);
    }

    @Override
    public List<EmployeeTest> getAllEmployeeTests(String employeeId) {
        return employeeTestRepository.findEmployeeTestByEmployeeId(employeeId);
    }

    @Override
    public void deleteEmployeeTest(String id) {
            employeeTestRepository.deleteById(id);
    }
}

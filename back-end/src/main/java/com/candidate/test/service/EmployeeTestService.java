package com.candidate.test.service;

import com.candidate.test.model.EmployeeTest;

import java.util.List;

public interface EmployeeTestService {
    EmployeeTest addEmployeeTest(EmployeeTest employee);

    List<EmployeeTest> getAllEmployeeTests(String employeeId);

    void deleteEmployeeTest(String id);
}

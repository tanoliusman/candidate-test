package com.candidate.test.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;

import java.util.List;

public class Employee {

    @Id
    private String id;
    private String name;
    private String phoneNumber;
    private String email;
    private String companyId;

    @Transient
    private List<EmployeeTest> tests;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCompanyId() {
        return companyId;
    }

    public void setCompanyId(String companyId) {
        this.companyId = companyId;
    }

    public List<EmployeeTest> getTests() {
        return tests;
    }

    public void setTests(List<EmployeeTest> tests) {
        this.tests = tests;
    }
}

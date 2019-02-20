package com.candidate.test.service.impl;

import com.candidate.test.model.Company;
import com.candidate.test.repository.CompanyRepository;
import com.candidate.test.service.CompanyService;
import com.candidate.test.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CompanyServiceImpl implements CompanyService {

    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private CompanyRepository companyRepository;

    @Override
    public List<Company> getAllCompanies() {
        List<Company> list =  companyRepository.findAll();
        list.forEach(company->{
            company.setEmployees(employeeService.getEmployeeByCompanyId(company.getId()));
        });
        return list;
    }

    @Override
    public Company addNewCompany(Company company) {
        return companyRepository.insert(company);
    }

    @Override
    public Company getCompanyById(String id) {


        Optional<Company> company =  companyRepository.findById(id);
        Company company1 = company.get();
        company1.setEmployees(employeeService.getEmployeeByCompanyId(company1.getId()));
        return company1;
    }

    @Override
    public Company updateCompany(Company company) {
        return companyRepository.save(company);

    }

    @Override
    public String deleteCompany(String id) {
        try {
            companyRepository.deleteById(id);
        }catch(Exception ex){
            return "false";
        }
        return "true";
    }
}

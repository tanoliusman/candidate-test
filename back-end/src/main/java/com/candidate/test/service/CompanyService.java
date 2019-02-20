package com.candidate.test.service;

import com.candidate.test.model.Company;

import java.util.List;

public interface CompanyService {

    List<Company> getAllCompanies();

    Company addNewCompany(Company company);

    Company getCompanyById(String id);

    Company updateCompany(Company company);

    String deleteCompany(String id);
}

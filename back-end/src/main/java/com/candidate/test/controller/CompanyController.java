package com.candidate.test.controller;

import com.candidate.test.model.Company;
import com.candidate.test.service.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.candidate.test.model.ResponseModel;

import javax.annotation.PostConstruct;
import javax.websocket.server.PathParam;
import javax.xml.ws.Response;

@RestController

public class CompanyController {

	@Autowired
	private CompanyService companyService;

	@PostConstruct
	public void init(){
		System.out.println("asdf");
	}
	@GetMapping("/company")
	public ResponseEntity<?> getAllCompanies(){
		return ResponseEntity.ok().body(companyService.getAllCompanies());
	}

	@PostMapping("/company")
	public ResponseEntity<?> addNewCompany(@RequestBody Company company){
		return ResponseEntity.ok().body(companyService.addNewCompany(company));
	}

	@GetMapping("/company/{id}")
	public ResponseEntity<?> getCompanyById(@PathVariable("id") String id){
		return ResponseEntity.ok().body(companyService.getCompanyById(id));
	}

	@PutMapping("/company")
	public ResponseEntity<?> updateCompany(@RequestBody Company company){
		return ResponseEntity.ok().body(companyService.updateCompany(company));
	}

	@DeleteMapping("/company/{id}")
	public ResponseEntity<?> deleteCompany(@PathVariable("id") String id){
		return ResponseEntity.ok().body(companyService.deleteCompany(id));
	}
	
}

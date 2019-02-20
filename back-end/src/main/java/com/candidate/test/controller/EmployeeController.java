package com.candidate.test.controller;

import com.candidate.test.model.Company;
import com.candidate.test.model.Employee;
import com.candidate.test.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.candidate.test.model.ResponseModel;

@RestController
public class EmployeeController {
	@Autowired
	private EmployeeService employeeService;

	@GetMapping("/employee")
	public ResponseEntity<?> getAllEmployees(){
		return ResponseEntity.ok().body(employeeService.getAllEmployees());
	}


	@PostMapping("/employee")
	public ResponseEntity<?> addNewEmployee(@RequestBody Employee employee){
		return ResponseEntity.ok().body(employeeService.addNewEmployee(employee));
	}

	@GetMapping("/employee/{id}")
	public ResponseEntity<?> getEmployeeById(@PathVariable("id") String id){
		return ResponseEntity.ok().body(employeeService.getEmployeeById(id));
	}

	@PutMapping("/employee")
	public ResponseEntity<?> updateEmployee(@RequestBody Employee employee){
		return ResponseEntity.ok().body(employeeService.updateEmployee(employee));
	}

	@DeleteMapping("/employee/{id}")
	public ResponseEntity<?> deleteEmployee(@PathVariable("id") String id){
		return ResponseEntity.ok().body(employeeService.deleteEmployee(id));
	}
}

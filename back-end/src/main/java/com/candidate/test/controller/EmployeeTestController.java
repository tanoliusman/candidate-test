package com.candidate.test.controller;

import com.candidate.test.model.Employee;
import com.candidate.test.model.EmployeeTest;
import com.candidate.test.service.EmployeeService;
import com.candidate.test.service.EmployeeTestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class EmployeeTestController {
	@Autowired
	private EmployeeTestService employeeTestService;

	@GetMapping("/employee/test/{id}")
	public ResponseEntity<?> getEmployeesTest(@PathVariable("id") String employeeId){
		return ResponseEntity.ok().body(employeeTestService.getAllEmployeeTests(employeeId));
	}


	@PostMapping("/employee/test")
	public ResponseEntity<?> addEmployeeTest(@RequestBody EmployeeTest employee){
		return ResponseEntity.ok().body(employeeTestService.addEmployeeTest( employee));
	}

//	@GetMapping("/employee/{id}")
//	public ResponseEntity<?> getEmployeeById(@PathVariable("id") String id){
//		return ResponseEntity.ok().body(employeeService.getEmployeeById(id));
//	}

//	@PutMapping("/employee/test/")
//	public ResponseEntity<?> updateEmployee(@RequestBody Employee employee){
//		return ResponseEntity.ok().body(employeeService.updateEmployee(employee));
//	}
//
	@DeleteMapping("/employee/test/{id}")
	public ResponseEntity<?> deleteEmployee(@PathVariable("id") String id){
		employeeTestService.deleteEmployeeTest(id);
		return ResponseEntity.ok().build();
	}
}

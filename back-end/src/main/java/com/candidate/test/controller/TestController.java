package com.candidate.test.controller;

import com.candidate.test.model.Employee;
import com.candidate.test.model.Test;
import com.candidate.test.service.EmployeeService;
import com.candidate.test.service.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.candidate.test.model.ResponseModel;

@RestController
public class TestController {

	@Autowired
	private TestService testService;

	@GetMapping("/test")
	public ResponseEntity<?> getAllTests(){
		return ResponseEntity.ok().body(testService.getAllTests());
	}


	@PostMapping("/test")
	public ResponseEntity<?> addNewTest(@RequestBody Test test){
		return ResponseEntity.ok().body(testService.addNewTest(test));
	}

	@GetMapping("/test/{id}")
	public ResponseEntity<?> getTestById(@PathVariable("id") String id){
		return ResponseEntity.ok().body(testService.getTestById(id));
	}

	@PutMapping("/test")
	public ResponseEntity<?> updateTest(@RequestBody Test test){
		return ResponseEntity.ok().body(testService.updateTest(test));
	}

	@DeleteMapping("/test/{id}")
	public ResponseEntity<?> deleteTest(@PathVariable("id") String id){
		return ResponseEntity.ok().body(testService.deleteTest(id));
	}
}

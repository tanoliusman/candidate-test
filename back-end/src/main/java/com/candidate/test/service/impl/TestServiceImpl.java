package com.candidate.test.service.impl;

import com.candidate.test.model.Test;
import com.candidate.test.repository.TestRepository;
import com.candidate.test.service.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TestServiceImpl implements TestService {
    @Autowired
    private TestRepository testRepository;

    @Override
    public List<Test> getAllTests() {
        return testRepository.findAll();
    }

    @Override
    public Test addNewTest(Test test) {
        return testRepository.save(test);
    }

    @Override
    public Optional<Test> getTestById(String id) {
        return testRepository.findById(id);
    }

    @Override
    public Test updateTest(Test test) {
        return testRepository.save(test);
    }

    @Override
    public String deleteTest(String id) {
        try {
            testRepository.deleteById(id);
        }catch(Exception ex){
            return "false";
        }
        return "true";
    }
}

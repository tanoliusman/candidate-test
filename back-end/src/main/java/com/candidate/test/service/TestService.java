package com.candidate.test.service;

import com.candidate.test.model.Test;

import java.util.List;
import java.util.Optional;

public interface TestService {
    List<Test> getAllTests();

    Test addNewTest(Test test);

    Optional<Test> getTestById(String id);

    Test updateTest(Test test);

    String deleteTest(String id);
//    Test getAllTests();
}

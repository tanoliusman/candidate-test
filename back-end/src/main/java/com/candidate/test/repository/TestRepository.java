package com.candidate.test.repository;

import com.candidate.test.model.Test;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TestRepository extends MongoRepository<Test,String> {


}

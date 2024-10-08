package com.tpo.server.repo;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.tpo.server.model.Product;

@Repository
public interface ProductRepository extends MongoRepository<Product, String> {
    List<Product> findByTitle(String title);
}
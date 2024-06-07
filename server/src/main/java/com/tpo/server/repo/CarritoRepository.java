package com.tpo.server.repo;

import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.tpo.server.model.ProductCarrito;

@Repository
public interface CarritoRepository extends MongoRepository<ProductCarrito, String> {
    List<ProductCarrito> findByEmail(String email);
    List<ProductCarrito> findByTitle(String title);
}

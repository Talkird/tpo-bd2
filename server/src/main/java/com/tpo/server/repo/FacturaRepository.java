package com.tpo.server.repo;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.tpo.server.model.Factura;

@Repository
public interface FacturaRepository extends MongoRepository<Factura, String>{
    List<Factura> findByEmail(String email);
}

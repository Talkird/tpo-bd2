package com.tpo.server.repo;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.tpo.server.model.Pedido;

@Repository
public interface PedidoRepository extends MongoRepository<Pedido, String> {
    List<Pedido> findByEmail(String email);

    List<Pedido> findBySelected(boolean selected);
}

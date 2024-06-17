package com.tpo.server.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.tpo.server.model.Pedido;
import com.tpo.server.repo.PedidoRepository;

@RestController
@CrossOrigin(origins = "*")
public class PedidoController {
    @Autowired
    PedidoRepository repo;

    @PostMapping("/pedidos")
    public Pedido generarPedido(@RequestBody Pedido pedido) {
        return repo.save(pedido);
    }

    @GetMapping("/pedidos/{email}")
    public List<Pedido> obtenerPedidosEmail(@PathVariable String email) {
        return repo.findByEmail(email);
    }

}

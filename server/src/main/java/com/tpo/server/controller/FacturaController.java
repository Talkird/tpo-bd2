package com.tpo.server.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.tpo.server.model.Factura;
import com.tpo.server.repo.FacturaRepository;

@RestController
@CrossOrigin(origins = "*")
public class FacturaController {
    @Autowired
    FacturaRepository repo;

    @PostMapping("/facturas")
    public Factura generarFactura(@RequestBody Factura factura) {
        return repo.save(factura);
    }

    @GetMapping("/facturas/{email}")
    public List<Factura> obtenerFacturasEmail(@PathVariable String email) {
        return repo.findByEmail(email);
    }

}

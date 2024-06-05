package com.tpo.server.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.tpo.server.model.Product;
import com.tpo.server.repo.ProductRepository;

@RestController
@CrossOrigin(origins = "*") // xd
public class ProductController {
    @Autowired
    ProductRepository repo;

    @GetMapping("/productos")
    public List<Product> obtenerProductos() {
        return repo.findAll();
    }

    @PostMapping("/productos")
    public Product agregarProducto(@RequestBody Product product) {
        return repo.save(product);
    }

}

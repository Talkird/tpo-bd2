package com.tpo.server.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.tpo.server.model.ProductCarrito;
import com.tpo.server.repo.CarritoRepository;

@RestController
@CrossOrigin(origins = "*")
public class CarritoController {
    @Autowired
    CarritoRepository repo;

    @GetMapping("/carritos")
    public List<ProductCarrito> obtenerCarritos() {
        return repo.findAll();
    }

    @PostMapping("/carritos")
    public ProductCarrito agregarProductCarrito(@RequestBody ProductCarrito carrito) {

        for (ProductCarrito pc : repo.findByEmail(carrito.getEmail())) {
            if (pc.getTitle().equals(carrito.getTitle())) {
                throw new RuntimeException("Producto ya existe");
            }
        }

        return repo.save(carrito);
    }

    @GetMapping("/carritos/{email}")
    public List<ProductCarrito> obtenerProductsCarritoEmail(@PathVariable String email) {
        return repo.findByEmail(email);
    }

    @PutMapping("/carritos/{email}/{title}")
    public ProductCarrito modificarCantidad(@PathVariable String email, @PathVariable String title,
            @RequestBody int nuevaCantidad) {
        List<ProductCarrito> carritos = repo.findByEmail(email);
        for (ProductCarrito carrito : carritos) {
            if (carrito.getTitle().equals(title)) {
                carrito.setCantidad(nuevaCantidad);
                return repo.save(carrito);
            }
        }
        throw new RuntimeException("Carrito not found for email: " + email + " and title: " + title);
    }

    @DeleteMapping("/carritos/{email}")
    public void vaciarCarrito(@PathVariable String email) {
        List<ProductCarrito> carritos = repo.findByEmail(email);
        for (ProductCarrito carrito : carritos) {
            repo.delete(carrito);
        }
    }

    @DeleteMapping("/carritos/{email}/{title}")
    public void borrarProductCarrito(@PathVariable String email, @PathVariable String title) {
        List<ProductCarrito> carritos = repo.findByEmail(email);
        for (ProductCarrito carrito : carritos) {
            if (carrito.getTitle().equals(title)) {
                repo.delete(carrito);
            }
        }
    }

}

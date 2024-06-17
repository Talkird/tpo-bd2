package com.tpo.server.controller;

import java.io.IOException;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.tpo.server.model.Product;
import com.tpo.server.model.ProductCarrito;
import com.tpo.server.repo.CarritoRepository;
import com.tpo.server.repo.ProductRepository;
import com.tpo.server.util.Logger;

@RestController
@CrossOrigin(origins = "*") // xd
public class ProductController {
    @Autowired
    ProductRepository repo;

    @Autowired
    CarritoRepository repoCarrito;

    @GetMapping("/productos")
    public List<Product> obtenerProductos() {
        return repo.findAll();
    }

    @PostMapping("/productos")
    public Product agregarProducto(@RequestBody Product product) {
        return repo.save(product);
    }

    @PutMapping("/productos")
    public Product actualizarProducto(@RequestBody Product product) {
        List<Product> lp = repo.findByTitle(product.getTitle());

        if (lp == null) {
            throw new RuntimeException("Error al actualizar producto");
        }

        int precioViejo, precioNuevo;
        precioViejo = lp.get(0).getPrice();

        List<ProductCarrito> carritos = repoCarrito.findByTitle(lp.get(0).getTitle());

        if (carritos != null) {
            for (ProductCarrito pc : carritos) {
                pc.setPrice(product.getPrice());
                repoCarrito.save(pc);
            }
        }

        Product p = lp.get(0);
        p.setPrice(product.getPrice());
        precioNuevo = p.getPrice();
        try {
            Logger.initializeLogFile();
            Logger.appendChange(
                    "Producto " + p.getTitle() + " de " + precioViejo + " a " + precioNuevo + " - " + new Date());
        } catch (IOException e) {
            e.printStackTrace();
        }
        return repo.save(p);
    }

    @DeleteMapping("/productos")
    public void eliminarProducto(@RequestBody Product product) {
        List<Product> lp = repo.findByTitle(product.getTitle());

        if (lp == null) {
            throw new RuntimeException("Error al eliminar producto");
        }

        List<ProductCarrito> carritos = repoCarrito.findByTitle(lp.get(0).getTitle());

        if (carritos != null) {
            for (ProductCarrito pc : carritos) {
                repoCarrito.delete(pc);
            }
        }

        repo.delete(lp.get(0));
    }
}

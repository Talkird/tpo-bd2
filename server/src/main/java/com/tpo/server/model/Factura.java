package com.tpo.server.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "facturas")
public class Factura {
    @Id
    private String id;
    private String nombre;  
    private String email;
    private String domicilio;
    private String pago;
    private String metodo;
    private int price;
    private String date;
    private List<ProductCarrito> productos;
}

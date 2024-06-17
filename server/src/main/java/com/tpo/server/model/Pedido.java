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
@Document(collection = "pedidos")
public class Pedido {
    @Id
    private String id;
    private String email;
    private int price;
    private String date;
    private boolean selected;
    private List<ProductCarrito> productos;
}

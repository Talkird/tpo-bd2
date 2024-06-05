package com.tpo.server.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "carritos")
public class ProductCarrito {
    @Id
    private String id;
    private String title;
    private int price;
    private String email;
    private int cantidad;
}

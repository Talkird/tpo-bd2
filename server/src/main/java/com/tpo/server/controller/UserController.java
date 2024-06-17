package com.tpo.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.tpo.server.model.User;
import com.tpo.server.repo.UserRepository;

@RestController
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserRepository repo;

    @GetMapping("/users")
    public Iterable<User> getUsers() {
        return repo.findAll();
    }

    @PostMapping("/users")
    public User createUser(@RequestBody User user) {
        if (repo.findByEmail(user.getEmail()) != null) {
            throw new RuntimeException("Email is already in use.");
        }

        return repo.save(user);
    }

    @PostMapping("/login")
    public String login(@RequestBody User user) {
        User usuarioExistente = repo.findByEmail(user.getEmail());

        if (usuarioExistente == null || !usuarioExistente.getPassword().equals(user.getPassword())) {
            throw new RuntimeException("Email o contraseña incorrectas.");
        }

        return "Inicio de sesión exitoso.";
    }

    @PutMapping("/users/{email}")
    public User setActivity(@PathVariable String email, @RequestBody String type) {
        User user = repo.findByEmail(email);

        if (user != null) {
            user.setType(type);
        } else {
            throw new RuntimeException("User not found");
        }

        return repo.save(user);
    }

    @DeleteMapping("/users")
    public void deleteUsers() {
        repo.deleteAll();
    }

}

package com.tpo.server.repo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.tpo.server.model.User;

@Repository
public interface UserRepository extends CrudRepository<User, String> {
    User findByEmail(String email);
}

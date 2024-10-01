package org.springframework.boot.incident_reporter_backend_app.services;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.incident_reporter_backend_app.entities.UserEntity;
import org.springframework.boot.incident_reporter_backend_app.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {


    private UserRepository repository;
    @Autowired
    public UserService(UserRepository userRepository){
        this.repository = userRepository;
    }

    public UserEntity add(UserEntity entity){
        return this.repository.save(entity);
    }

    public UserEntity update(UserEntity entity){

        this.repository.findById(entity.getId()).orElseThrow(() -> new EntityNotFoundException());
        if(entity.getId() == null || !this.repository.existsById(entity.getId())){
            throw new EntityNotFoundException();
        }

        return this.repository.save(entity);
    }

    public void delete(Integer id){
        this.repository.deleteById(id);
    }

    public List<UserEntity> findAllEntities(){
        return this.repository.findAll();
    }

    public UserEntity findById(Integer id){
        return this.repository.findById(id).orElseThrow(EntityNotFoundException::new);
    }
}

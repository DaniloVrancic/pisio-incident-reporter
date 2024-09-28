package org.springframework.boot.incident_reporter_backend_app.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.incident_reporter_backend_app.entities.IncidentEntity;
import org.springframework.boot.incident_reporter_backend_app.entities.UserEntity;
import org.springframework.boot.incident_reporter_backend_app.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService){
        this.userService = userService;
    }
    @GetMapping("/all")
    public ResponseEntity<List<UserEntity>> findAll(){
        List<UserEntity> list = null;
        try{
            list = userService.findAllEntities();
        }
        catch(Exception ex){
            ResponseEntity.notFound();
        }
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserEntity> findEntity(@PathVariable Integer id){
        UserEntity entity = null;
        try{
            entity = userService.findById(id);
        }
        catch(Exception ex){
            ResponseEntity.notFound();
        }
        return new ResponseEntity<>(entity, HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<UserEntity> updateEntity(@RequestBody UserEntity requestBody){
        UserEntity entity = null;
        try{
            entity = userService.update(requestBody);
        }
        catch(Exception ex){
            ResponseEntity.internalServerError();
        }
        return new ResponseEntity<>(entity, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<UserEntity> addEntity(@RequestBody UserEntity requestBody){
        UserEntity entity = null;
        try{
            entity = userService.add(requestBody);
        }
        catch(Exception ex){
            ResponseEntity.internalServerError();
        }
        return new ResponseEntity<>(entity, HttpStatus.OK);
    }
}

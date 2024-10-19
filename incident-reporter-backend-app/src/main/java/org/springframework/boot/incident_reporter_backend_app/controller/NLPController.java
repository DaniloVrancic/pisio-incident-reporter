package org.springframework.boot.incident_reporter_backend_app.controller;

import org.springframework.boot.incident_reporter_backend_app.enums.NLPType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/nlp")
public class NLPController {

    public List<String> doNlp(@RequestBody final String input, final NLPType type){
        

        return null;
    }
}

package org.springframework.boot.incident_reporter_backend_app.enums;

public enum NLPType {

    CRIME("Crime"),
    MEDICAL("Medical"),
    CAUTION("Caution"),
    OTHER("Other");

    private String type;
    NLPType(String type){
        this.type = type;
    }

    public String getType(){
        return this.type;
    }
}

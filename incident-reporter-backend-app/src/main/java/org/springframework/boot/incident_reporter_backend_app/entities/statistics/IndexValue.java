package org.springframework.boot.incident_reporter_backend_app.entities.statistics;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;


public class IndexValue {

    String index;
    Integer value;

    protected IndexValue(){}

    public IndexValue(String index, Integer value){
        this.index = index;
        this.value = value;
    }

    public void setIndex(String index){
        this.index = index;
    }
    public String getIndex(){
        return this.index;
    }
    public void setValue(Integer value){
        this.value = value;
    }

    public Integer getValue(){
        return this.value;
    }
}

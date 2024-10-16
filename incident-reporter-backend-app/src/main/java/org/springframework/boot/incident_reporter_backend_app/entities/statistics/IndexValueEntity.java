package org.springframework.boot.incident_reporter_backend_app.entities.statistics;

public class IndexValueEntity {

    String index;
    Integer value;

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

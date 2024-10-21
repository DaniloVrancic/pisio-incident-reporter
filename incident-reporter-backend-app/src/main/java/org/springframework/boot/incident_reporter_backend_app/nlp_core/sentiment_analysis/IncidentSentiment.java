package org.springframework.boot.incident_reporter_backend_app.nlp_core.sentiment_analysis;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.boot.incident_reporter_backend_app.entities.IncidentEntity;
import org.springframework.boot.incident_reporter_backend_app.nlp_core.model.SentimentResult;
import org.springframework.stereotype.Component;

public class IncidentSentiment {
    @JsonProperty("incident")
    IncidentEntity incidentEntity;
    @JsonProperty("sentiment")
    SentimentResult sentimentResult;

    public IncidentEntity getIncidentEntity() {
        return incidentEntity;
    }

    public SentimentResult sentimentResult(){
        return this.sentimentResult;
    }

    public void setIncidentEntity(IncidentEntity entity){
        this.incidentEntity = entity;
    }

    public void setSentimentResult(SentimentResult result){
        this.sentimentResult = result;
    }
}

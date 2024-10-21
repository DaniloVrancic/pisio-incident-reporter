package org.springframework.boot.incident_reporter_backend_app.nlp_core.sentiment_analysis;

import org.springframework.boot.incident_reporter_backend_app.entities.IncidentEntity;
import org.springframework.boot.incident_reporter_backend_app.nlp_core.model.SentimentResult;
import org.springframework.stereotype.Component;

@Component
public class IncidentSentiment {
    IncidentEntity incidentEntity;
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

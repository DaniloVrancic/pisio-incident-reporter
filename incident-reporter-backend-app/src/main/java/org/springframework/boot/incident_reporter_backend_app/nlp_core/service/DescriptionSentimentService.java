package org.springframework.boot.incident_reporter_backend_app.nlp_core.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.incident_reporter_backend_app.entities.IncidentEntity;
import org.springframework.boot.incident_reporter_backend_app.nlp_core.model.SentimentClassification;
import org.springframework.boot.incident_reporter_backend_app.nlp_core.model.SentimentResult;
import org.springframework.boot.incident_reporter_backend_app.nlp_core.sentiment_analysis.IncidentSentiment;
import org.springframework.boot.incident_reporter_backend_app.nlp_core.sentiment_analysis.SentimentAnalyzer;
import org.springframework.boot.incident_reporter_backend_app.services.IncidentService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicReference;
import java.util.stream.Collectors;

@Service
public class DescriptionSentimentService {


    public Map<String, List<IncidentSentiment>> getIncidentSentiments(List<IncidentEntity> allIncidents){
        List<IncidentSentiment> listToReturn = new ArrayList<>();
        SentimentAnalyzer sentimentAnalyzer = new SentimentAnalyzer();
        sentimentAnalyzer.initialize();
        SentimentResult sentimentResult = null;

        for(IncidentEntity incidentEntity: allIncidents)
        {
            IncidentSentiment newIncidentSentiment = new IncidentSentiment();
            newIncidentSentiment.setIncidentEntity(incidentEntity);
            sentimentResult = sentimentAnalyzer.getSentimentResult(incidentEntity.getDescription());
            newIncidentSentiment.setSentimentResult(sentimentResult);
            listToReturn.add(newIncidentSentiment);
        }
        Map<String, List<IncidentSentiment>> mapToReturn =
                listToReturn.stream()
                        .collect(Collectors.groupingBy(incidentSentiment -> { return incidentSentiment.sentimentResult().getSentimentType();}));

        return mapToReturn;
    }
}

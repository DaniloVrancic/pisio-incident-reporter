package org.springframework.boot.incident_reporter_backend_app.controller;

import edu.stanford.nlp.ling.CoreAnnotations;
import edu.stanford.nlp.ling.CoreLabel;
import edu.stanford.nlp.pipeline.CoreDocument;
import edu.stanford.nlp.pipeline.StanfordCoreNLP;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.incident_reporter_backend_app.entities.IncidentEntity;
import org.springframework.boot.incident_reporter_backend_app.enums.NLPType;
import org.springframework.boot.incident_reporter_backend_app.nlp_core.Pipeline;
import org.springframework.boot.incident_reporter_backend_app.nlp_core.sentiment_analysis.IncidentSentiment;
import org.springframework.boot.incident_reporter_backend_app.nlp_core.service.DescriptionSentimentService;
import org.springframework.boot.incident_reporter_backend_app.services.IncidentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Controller
@RequestMapping("/nlp")
public class NLPController {




    final private StanfordCoreNLP stanfordCoreNLP;
    final private DescriptionSentimentService descriptionSentimentService;
    final private IncidentService incidentService;

    @Autowired
    public NLPController(StanfordCoreNLP stanfordCoreNLP,
                         DescriptionSentimentService descriptionSentimentService,
                         IncidentService incidentService){
        this.stanfordCoreNLP = stanfordCoreNLP;
        this.descriptionSentimentService = descriptionSentimentService;
        this.incidentService = incidentService;
    }

    @PostMapping
    public Set<String> doNlp(@RequestBody final String input, @RequestParam final NLPType type){

        CoreDocument coreDocument = new CoreDocument(input);
        stanfordCoreNLP.annotate(coreDocument);
        List<CoreLabel> coreLabels = coreDocument.tokens();
        return new HashSet<>(collectList(coreLabels, type));
    }

    private List<String> collectList(List<CoreLabel> coreLabels, final NLPType type){
        return coreLabels
                .stream()
                .filter(coreLabel -> type.getType().equalsIgnoreCase(coreLabel.get(CoreAnnotations.NamedEntityTagAnnotation.class)))
                .map(CoreLabel::originalText)
                .collect(Collectors.toList());
    }

    @GetMapping("/incident_sentiments")
    public ResponseEntity<?> getSentimentsForAllDescriptions(){
        try
        {
            List<IncidentEntity> listOfIncidents = incidentService.findAllEntities();

            Map<String, List<IncidentSentiment>> mapOfIncidentSentiments = descriptionSentimentService.getIncidentSentiments(listOfIncidents);

            return new ResponseEntity<>(mapOfIncidentSentiments, HttpStatus.OK);

        }
        catch (Exception ex){
            return ResponseEntity.internalServerError().build();
        }


    }
}

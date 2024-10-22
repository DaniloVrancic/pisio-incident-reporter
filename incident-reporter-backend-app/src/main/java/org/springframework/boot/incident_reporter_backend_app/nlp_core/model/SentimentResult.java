package org.springframework.boot.incident_reporter_backend_app.nlp_core.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class SentimentResult {
    @JsonProperty("score")
    Double sentimentScore;
    @JsonProperty("type")
    String sentimentType;
    @JsonProperty("class")
    SentimentClassification sentimentClass;

    public double getSentiment() {
        return sentimentScore;
    }

    public double getSentimentScore() {
        return sentimentScore;
    }

    public void setSentimentScore(double sentimentScore) {
        this.sentimentScore = sentimentScore;
    }

    public String getSentimentType() {
        return sentimentType;
    }

    public void setSentimentType(String sentimentType) {
        this.sentimentType = sentimentType;
    }

    public SentimentClassification getSentimentClass() {
        return sentimentClass;
    }

    public void setSentimentClass(SentimentClassification sentimentClass) {
        this.sentimentClass = sentimentClass;
    }
}

package org.springframework.boot.incident_reporter_backend_app.nlp_core.model;

public class SentimentResult {
    Double sentimentScore;
    String sentimentType;
    SentimentClassification sentimentClass;

    public double getSentiment() {
        return sentimentScore;
    }

    public Double getSentimentScore() {
        return sentimentScore;
    }

    public void setSentimentScore(Double sentimentScore) {
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

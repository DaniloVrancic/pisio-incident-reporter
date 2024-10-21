package org.springframework.boot.incident_reporter_backend_app.nlp_core.model;

public class SentimentClassification {
    Double veryPositive;
    Double positive;
    Double neutral;
    Double negative;
    Double veryNegative;


    public Double getVeryPositive() {
        return veryPositive;
    }
    public void setVeryPositive(Double veryPositive) {
        this.veryPositive = veryPositive;
    }
    public Double getPositive() {
        return positive;
    }
    public void setPositive(Double positive) {
        this.positive = positive;
    }
    public Double getNeutral() {
        return neutral;
    }
    public void setNeutral(Double neutral) {
        this.neutral = neutral;
    }
    public Double getNegative() {
        return negative;
    }
    public void setNegative(Double negative) {
        this.negative = negative;
    }
    public Double getVeryNegative() {
        return veryNegative;
    }
    public void setVeryNegative(Double veryNegative) {
        this.veryNegative = veryNegative;
    }
}

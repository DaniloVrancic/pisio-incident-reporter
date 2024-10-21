package org.springframework.boot.incident_reporter_backend_app.nlp_core.model;

public class SentimentClassification {
    Double veryPositive;
    Double positive;
    Double neutral;
    Double negative;
    Double veryNegative;


    public double getVeryPositive() {
        return veryPositive;
    }
    public void setVeryPositive(double veryPositive) {
        this.veryPositive = veryPositive;
    }
    public double getPositive() {
        return positive;
    }
    public void setPositive(double positive) {
        this.positive = positive;
    }
    public double getNeutral() {
        return neutral;
    }
    public void setNeutral(double neutral) {
        this.neutral = neutral;
    }
    public double getNegative() {
        return negative;
    }
    public void setNegative(double negative) {
        this.negative = negative;
    }
    public double getVeryNegative() {
        return veryNegative;
    }
    public void setVeryNegative(double veryNegative) {
        this.veryNegative = veryNegative;
    }
}

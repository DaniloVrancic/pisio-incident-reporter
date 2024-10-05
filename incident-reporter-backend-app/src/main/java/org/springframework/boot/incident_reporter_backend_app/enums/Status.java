package org.springframework.boot.incident_reporter_backend_app.enums;


public enum Status {
    REQUESTED("REQUESTED"),
    APPROVED("APPROVED");

    private String value;
    private Status(String value)
    {
        this.value = value;
    }

    public String getValue() {
        return value;
    }


}

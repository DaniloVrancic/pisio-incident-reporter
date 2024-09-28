package org.springframework.boot.incident_reporter_backend_app.util;

import java.util.Base64;

public class B64 {
    public static String encode(byte[] bytes) {
        return Base64.getEncoder().encodeToString(bytes);
    }

    public static byte[] decode(String text){
        return Base64.getDecoder().decode(text);
    }

    public static String replaceSlashes(String b64)
    {
        return b64.replace('/', '_');
    }

    public static String replaceUnderscores(String b64)
    {
        return b64.replace('_', '/');
    }
}
package org.springframework.boot.incident_reporter_backend_app.nlp_core;

import edu.stanford.nlp.pipeline.StanfordCoreNLP;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.util.Properties;

@Component
public class Pipeline {

    private static Properties properties;
    private static String propertiesName = "tokenize, ssplit, parse, sentiment, pos, lemma, ner";

    private static StanfordCoreNLP stanfordCoreNLP;

    private Pipeline() {}

    static {
        properties = new Properties();
        properties.setProperty("annotators", propertiesName);
        properties.setProperty("ner.useSUTime", "false");
    }

    @Bean(name="stanfordCoreNLP")
    public static StanfordCoreNLP getInstance(){
        if(stanfordCoreNLP == null) {
            stanfordCoreNLP = new StanfordCoreNLP(properties);
        }
        return stanfordCoreNLP;
    }
}

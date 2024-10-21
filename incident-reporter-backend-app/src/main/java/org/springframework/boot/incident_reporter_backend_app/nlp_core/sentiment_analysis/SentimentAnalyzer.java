package org.springframework.boot.incident_reporter_backend_app.nlp_core.sentiment_analysis;

import edu.stanford.nlp.ling.CoreAnnotations;
import edu.stanford.nlp.neural.rnn.RNNCoreAnnotations;
import edu.stanford.nlp.pipeline.Annotation;
import edu.stanford.nlp.pipeline.StanfordCoreNLP;
import edu.stanford.nlp.sentiment.SentimentCoreAnnotations;
import edu.stanford.nlp.trees.Tree;
import edu.stanford.nlp.util.CoreMap;
import org.ejml.simple.SimpleMatrix;
import org.springframework.boot.incident_reporter_backend_app.nlp_core.model.SentimentClassification;
import org.springframework.boot.incident_reporter_backend_app.nlp_core.model.SentimentResult;

import java.util.Properties;

public class SentimentAnalyzer {
    /*
     * "Very negative" = 0 "Negative" = 1 "Neutral" = 2 "Positive" = 3
     * "Very positive" = 4
     */

    static Properties props;
    static StanfordCoreNLP pipeline;

    public void initialize() {
        // creates a StanfordCoreNLP object, with POS tagging, lemmatization, NER, parsing, and sentiment
        props = new Properties();
        props.setProperty("annotators", "tokenize, ssplit, parse, sentiment");
        pipeline = new StanfordCoreNLP(props);
    }

    public SentimentResult getSentimentResult(String text) {

        SentimentResult sentimentResult = new SentimentResult();
        SentimentClassification sentimentClass = new SentimentClassification();

        if (text != null && text.length() > 0) {

            // run all Annotators on the text
            Annotation annotation = pipeline.process(text);

            for (CoreMap sentence : annotation.get(CoreAnnotations.SentencesAnnotation.class)) {
                // this is the parse tree of the current sentence
                Tree tree = sentence.get(SentimentCoreAnnotations.SentimentAnnotatedTree.class);
                SimpleMatrix sm = RNNCoreAnnotations.getPredictions(tree);
                String sentimentType = sentence.get(SentimentCoreAnnotations.SentimentClass.class);

                sentimentClass.setVeryPositive((double)Math.round(sm.get(4) * 100d));
                sentimentClass.setPositive((double)Math.round(sm.get(3) * 100d));
                sentimentClass.setNeutral((double)Math.round(sm.get(2) * 100d));
                sentimentClass.setNegative((double)Math.round(sm.get(1) * 100d));
                sentimentClass.setVeryNegative((double)Math.round(sm.get(0) * 100d));

                sentimentResult.setSentimentScore(RNNCoreAnnotations.getPredictedClass(tree));
                sentimentResult.setSentimentType(sentimentType);
                sentimentResult.setSentimentClass(sentimentClass);
            }

        }


        return sentimentResult;
    }

    /*
    // EXAMPLE OF RUNNING THIS METHOD AS A MAIN METHOD
   public static void main(String[] args) throws IOException {

		String text = "Those who find ugly meanings in beautiful things are corrupt without being charming.";

		SentimentAnalyzer sentimentAnalyzer = new SentimentAnalyzer();
		sentimentAnalyzer.initialize();
		SentimentResult sentimentResult = sentimentAnalyzer.getSentimentResult(text);

		System.out.println("Sentiment Score: " + sentimentResult.getSentimentScore());
		System.out.println("Sentiment Type: " + sentimentResult.getSentimentType());
		System.out.println("Very positive: " + sentimentResult.getSentimentClass().getVeryPositive()+"%");
		System.out.println("Positive: " + sentimentResult.getSentimentClass().getPositive()+"%");
		System.out.println("Neutral: " + sentimentResult.getSentimentClass().getNeutral()+"%");
		System.out.println("Negative: " + sentimentResult.getSentimentClass().getNegative()+"%");
		System.out.println("Very negative: " + sentimentResult.getSentimentClass().getVeryNegative()+"%");

	}
     */
}

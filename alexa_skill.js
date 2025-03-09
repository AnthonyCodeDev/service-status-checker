const Alexa = require('ask-sdk-core');
const axios = require('axios');

// Remplace par l'URL de ton serveur ou est hébergé l'API de Status Service ;)
const API_URL = "https://api.serveur.com/check_status";

console.log("🔧 Initialisation du skill Statut Service...");

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        console.log("🔍 LaunchRequestHandler - Vérification si la requête peut être gérée...");
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        console.log("🚀 LaunchRequestHandler - Gestion de la requête de lancement...");
        // Le skill utilise le français par défaut
        const speakOutput = "Bienvenue sur Pulse Service ! Dites-moi quel service vérifier, par exemple Google ou Twitter.";
        console.log("🗣️ Réponse vocale :", speakOutput);
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CheckServiceStatusIntentHandler = {
    canHandle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        console.log("🔍 Intent reçu :", intentName);
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && intentName === 'CheckServiceStatusIntent';
    },
    async handle(handlerInput) {
        console.log("🚀 CheckServiceStatusIntentHandler - Gestion de la requête...");
        
        // Récupération des attributs de session
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        
        // Extraction du slot "service"
        let service = Alexa.getSlotValue(handlerInput.requestEnvelope, 'service');
        if (service) {
            // Stocke la valeur originale dans les attributs de session pour usage ultérieur
            sessionAttributes.service = service;
            handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
        } else if (sessionAttributes.service) {
            // Utilise la valeur précédemment enregistrée si le slot n'est pas fourni cette fois-ci
            service = sessionAttributes.service;
        } else {
            const speakOutput = "Je n'ai pas compris quel service vérifier. Pouvez-vous répéter ?";
            console.log("🗣️ Réponse vocale :", speakOutput);
            return handlerInput.responseBuilder
                .speak(speakOutput)
                .reprompt(speakOutput)
                .getResponse();
        }
        
        // Utilisation du français par défaut
        const language = "fr";
        console.log("🔍 Service utilisé :", service);
        console.log("🔍 Langue utilisée :", language);
        
        // Normalisation du nom du service : suppression des espaces et passage en minuscule
        const normalizedService = service.replace(/\s+/g, '').toLowerCase();
        
        // Construction de l'URL API avec le paramètre language fixé à "fr"
        const apiUrl = `${API_URL}/${normalizedService}?language=${language}`;
        console.log(`📡 URL API : ${apiUrl}`);
        
        try {
            console.log("📡 Tentative de requête vers l'API...");
            const response = await axios.get(apiUrl);
            console.log(`✅ Réponse API reçue : ${JSON.stringify(response.data)}`);
            
            const status = response.data.status;
            let speechText;
            if (status === "up") {
                speechText = `${service} est actuellement accessible. ${response.data.message}.`;
            } else if (status === "down") {
                speechText = `${service} est actuellement inaccessible. ${response.data.message}.`;
            } else {
                speechText = `Je ne peux pas vérifier l'état de ${service} pour le moment.`;
            }
            console.log("🗣️ Réponse vocale :", speechText);
            return handlerInput.responseBuilder
                .speak(speechText)
                .getResponse();
        } catch (error) {
            console.error("❌ Erreur lors de l'appel API:", error);
            if (error.response) {
                console.error("📡 Réponse API (erreur) :", error.response.data);
                console.error("📡 Status code (erreur) :", error.response.status);
            } else if (error.request) {
                console.error("📡 Aucune réponse reçue de l'API :", error.request);
            } else {
                console.error("📡 Erreur de configuration :", error.message);
            }
            const speakOutput = "Désolé, je n'arrive pas à vérifier l'état du service.";
            console.log("🗣️ Réponse vocale :", speakOutput);
            return handlerInput.responseBuilder
                .speak(speakOutput)
                .getResponse();
        }
    }
};



const HelpIntentHandler = {
    canHandle(handlerInput) {
        console.log("🔍 HelpIntentHandler - Vérification si la requête peut être gérée...");
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        console.log("🚀 HelpIntentHandler - Gestion de la requête d'aide...");
        const speakOutput = "Vous pouvez me demander si un service est en ligne en disant par exemple : 'Alexa, demande à Statut Service si Google est accessible'. Quel service voulez-vous vérifier ?";
        console.log("🗣️ Réponse vocale :", speakOutput);
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        console.log("🔍 CancelAndStopIntentHandler - Vérification si la requête peut être gérée...");
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        console.log("🚀 CancelAndStopIntentHandler - Gestion de la requête d'annulation ou d'arrêt...");
        const speakOutput = "Au revoir !";
        console.log("🗣️ Réponse vocale :", speakOutput);
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

const FallbackIntentHandler = {
    canHandle(handlerInput) {
        console.log("🔍 FallbackIntentHandler - Vérification si la requête peut être gérée...");
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        console.log("🚀 FallbackIntentHandler - Gestion de la requête de secours...");
        const speakOutput = "Désolé, je ne comprends pas votre demande. Essayez de me demander si un service est en ligne.";
        console.log("🗣️ Réponse vocale :", speakOutput);
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        console.log("🔍 SessionEndedRequestHandler - Vérification si la requête peut être gérée...");
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log("🚀 SessionEndedRequestHandler - Gestion de la fin de session...");
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        return handlerInput.responseBuilder.getResponse();
    }
};

const ErrorHandler = {
    canHandle() {
        console.log("🔍 ErrorHandler - Vérification si la requête peut être gérée...");
        return true;
    },
    handle(handlerInput, error) {
        console.log("🚀 ErrorHandler - Gestion de l'erreur...");
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);
        const speakOutput = "Désolé, une erreur est survenue. Veuillez réessayer.";
        console.log("🗣️ Réponse vocale :", speakOutput);
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

console.log("🔧 Construction du handler Lambda...");
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        CheckServiceStatusIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler
    )
    .addErrorHandlers(ErrorHandler)
    .lambda();

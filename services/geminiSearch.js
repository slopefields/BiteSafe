import { GoogleGenerativeAI } from "@google/generative-ai";
import { supabaseClient } from "./supabase.js";

import { GEMINI_KEY } from '@env';

async function getConcatenatedRow() {
    const { data: {user}, error } = await supabaseClient.auth.getUser();
    const allergies_array = user.user_metadata.allergiesList;
    console.log(allergies_array.join(", "));
    return allergies_array.join(", ");
}

const schema = {
    description: "List of Restaurants that closely match with their name, location, and review scores",
    type: "array",
    items: {
        type: "object",
        properties: {
            RestaurantName: {
                type: "string",
                description: "Name of the restaurant",
            },
            Address: {
                type: "string",
                description: "Address of the restaurant",
            },
            Stars: {
                type: "string",
                description: "Number of stars out of 5",
            },
            AboutSection: {
                type: "string",
                description: "Give a short 30 word description of the restaurant",
            }
        },
        required: ["RestaurantName", "Address", "Stars", "AboutSection"],
    },
};

export async function geminiAPI(user_input) {
    try {
        const genAI = new GoogleGenerativeAI(GEMINI_KEY);
        const model = genAI.getGenerativeModel({
            model: "gemini-2.0-flash",
            generationConfig: {
                responseMimeType: "application/json",
                responseSchema: schema,
            },
        });
        
        // Ensure you await the result of getConcatenatedRow()
        const allergies = await getConcatenatedRow();  
        
        const user_prompt = "You are a restaurant master who knows every restaurant in the world. Make sure to take account of the schema and allergies and make sure to list a few real places by default: "
            + user_input + ". I am allergic to these items and make sure they aren't in the restaurant: " + allergies;
        
        console.log(user_prompt);  // This should log the prompt

        const result = await model.generateContent(user_prompt);
        const responseText = result.response.text();  // Ensure you call .text() correctly

        console.log("Response Text:", responseText);  // Debug the response

        // Parse the JSON string into an object
        const data = JSON.parse(responseText);  // Assuming result.response.text() is a JSON string
        
        return data;
        
    } catch (error) {
        console.log("Error fetching geminiAPI:", error);
        return [];
    }
}
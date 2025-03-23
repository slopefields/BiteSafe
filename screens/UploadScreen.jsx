import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { supabaseClient } from '../services/supabase';

import { GPT_KEY } from '@env';

export default function UploadScreen({ navigation }) {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const channel = supabaseClient
            .channel('mobile-results-listener')
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'mobile_allergen_results',
                },
                (payload) => {
                    console.log('New result detected:', payload.new);
                    navigation.navigate('CameraResults', { result: payload.new });
                }
            )
            .subscribe();

        return () => {
            supabaseClient.removeChannel(channel);
        };
    }, []);

    const pickImageAndAnalyze = async () => {
        try {
            const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (!permissionResult.granted) {
                Alert.alert("Permission required", "We need access to your camera roll.");
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 1,
                base64: false,
            });

            if (!result.canceled && result.assets && result.assets.length > 0) {
                setLoading(true);
                const imageUri = result.assets[0].uri;
                const base64Image = await FileSystem.readAsStringAsync(imageUri, { encoding: 'base64' });

                const response = await fetch('https://api.openai.com/v1/chat/completions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${GPT_KEY}`,
                    },
                    body: JSON.stringify({
                        model: 'gpt-4-turbo',
                        messages: [
                            {
                                role: 'system',
                                content: 'You are an allergy detection expert who can identify if food contains Milk, Eggs, Nuts, Gluten, Soy, or Seafood.',
                            },
                            {
                                role: 'user',
                                content: [
                                    {
                                        type: 'text',
                                        text: `You will be presented with an image of one of the following:
1) A menu (text) with multiple dishes. Identify allergens in each.
2) A food item or packaging. Identify it and its allergens.

Format the response like this:

Dish Name  
Ingredients List  
Allergens

Example:

Smartfood White Cheddar Popcorn  
Popcorn, vegetable oil, cheddar cheese (milk, cheese cultures, salt, enzymes), whey, buttermilk, natural flavor, salt.  
Milk

If unidentifiable, respond: "Try another angle or get closer to the label."`,
                                    },
                                    {
                                        type: 'image_url',
                                        image_url: {
                                            url: `data:image/jpeg;base64,${base64Image}`,
                                        },
                                    },
                                ],
                            },
                        ],
                        max_tokens: 500,
                    }),
                });

                const resultJson = await response.json();

                if (resultJson?.error) {
                    console.error('OpenAI error:', resultJson.error);
                    Alert.alert("OpenAI Error", resultJson.error.message || "Something went wrong.");
                    return;
                }

                const resultText = resultJson?.choices?.[0]?.message?.content;

                if (resultText) {
                    navigation.navigate('UploadResults', { result: resultText });
                } else {
                    Alert.alert("Analysis failed", "No response from the AI.");
                }
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "Something went wrong during analysis.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                {loading ? (
                    <ActivityIndicator size="large" color="#55d684" />
                ) : (
                    <TouchableOpacity style={styles.uploadButton} onPress={pickImageAndAnalyze}>
                        <Text style={styles.uploadText}>Upload</Text>
                    </TouchableOpacity>
                )}
            </View>

            <View style={styles.navbar}>
                <TouchableOpacity style={styles.navItem}>
                    <Ionicons name="camera-outline" size={28} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <Ionicons name="search" size={28} color="white" onPress={() => navigation.navigate('Main')} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <Ionicons name="glasses-outline" size={28} color="white" onPress={() => navigation.navigate('RaybanConnecting')} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    uploadButton: {
        backgroundColor: '#55d684',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 30,
        width: '100%',
        alignItems: 'center',
    },
    uploadText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    navbar: {
        flexDirection: 'row',
        backgroundColor: '#55d684',
        height: 90,
        justifyContent: 'space-around',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        left: 0,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    navItem: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
});

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { supabaseClient } from '../services/supabase';

export default function CameraResults({ navigation, route }) {
    const [results, setResults] = useState([]);

    useEffect(() => {
        if (route.params?.result) {
            if (typeof route.params.result === 'string') {
                parseAndStoreAllResults(route.params.result);
            } else {
                setResults([route.params.result]); // From Supabase listener
            }
        }
    }, [route.params?.result]);

    const parseAndStoreAllResults = async (rawText) => {
        try {
            const entries = rawText.trim().split(/\n\n+/).map(block => block.trim()).filter(Boolean);
            const parsed = [];

            for (let entry of entries) {
                const lines = entry.split('\n').map(line => line.trim()).filter(Boolean);
                if (lines.length < 3) continue;

                const dish_name = lines[0];
                const ingredients = lines[1];
                const allergens = lines.slice(2).join(', ');

                const result = { dish_name, ingredients, allergens };
                parsed.push(result);

                const { error } = await supabaseClient
                    .from('mobile_allergen_results')
                    .insert([result]);
            }

            setResults(parsed);
        } catch (err) {
            console.error('Parse/store error:', err);
            Alert.alert('Error', 'Something went wrong while saving results.');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                {results.length > 0 ? results.map((item, index) => (
                    <View key={index} style={styles.card}>
                        <Text style={styles.dishName}>{item.dish_name}</Text>
                        <Text style={styles.ingredients}>Ingredients: {item.ingredients}</Text>
                        <Text style={styles.allergens}>Allergens: {item.allergens}</Text>
                    </View>
                )) : (
                    <Text style={styles.loadingText}>Loading...</Text>
                )}
            </ScrollView>

            <View style={styles.navBar}>
                <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('UploadScreen')}>
                    <Ionicons name="camera-outline" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Main')}>
                    <Ionicons name="search" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('RaybanConnecting')}>
                    <Ionicons name="glasses-outline" size={24} color="white" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    content: {
        padding: 20,
        paddingTop: 60,
        paddingBottom: 100,
        alignItems: 'center',
    },
    card: {
        width: '100%',
        backgroundColor: '#e8f8ee',
        padding: 20,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
        marginBottom: 20,
    },
    dishName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 10,
    },
    ingredients: {
        fontSize: 16,
        color: '#555',
        textAlign: 'center',
        marginBottom: 6,
    },
    allergens: {
        fontSize: 16,
        color: '#d9534f',
        textAlign: 'center',
    },
    loadingText: {
        marginTop: 100,
        fontSize: 18,
        color: '#777',
        textAlign: 'center',
    },
    navBar: {
        flexDirection: 'row',
        height: 60,
        backgroundColor: '#55d684',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    navItem: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
    },
});

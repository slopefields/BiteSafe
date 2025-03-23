import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { supabaseClient } from '../services/supabase.js'; // Make sure this points to your Supabase client

export default function RaybanResults({ navigation }) {
    const [results, setResults] = useState([]);

    useEffect(() => {
        fetchResults();
    }, []);

    const fetchResults = async () => {
        const { data, error } = await supabaseClient
            .from('allergen_results')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching results:', error);
        } else {
            setResults(data);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                {results.map((item, index) => (
                    <View key={index} style={styles.card}>
                        <Text style={styles.dishName}>{item.dish_name}</Text>
                        <Text style={styles.ingredients}>Ingredients: {item.ingredients}</Text>
                        <Text style={styles.allergens}>Allergens: {item.allergens}</Text>
                    </View>
                ))}
            </ScrollView>

            <View style={styles.navBar}>
                <TouchableOpacity style={styles.navItem}>
                    <Ionicons name="camera-outline" size={24} color="white" onPress={() => navigation.navigate('UploadScreen')} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.navItem}>
                    <Ionicons name="search-outline" size={24} color="white" onPress={() => navigation.navigate('Main')} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.navItem}>
                    <Ionicons name="glasses-outline" size={24} color="white" />
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
        padding: 20,
        paddingTop: 60,
        paddingBottom: 100,
        alignItems: 'center',
    },
    card: {
        width: '100%',
        backgroundColor: '#e8f8ee',
        padding: 20,
        marginBottom: 20,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
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

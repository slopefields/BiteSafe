import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SearchBar from '../components/SearchBar.jsx';

export default function MainScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.headerText}> Feeling Hungry ? </Text>

                {/* Search bar */}
                <SearchBar />
                {/* End search bar */}
            </View>

            <View style={styles.navbar}>
                <TouchableOpacity style={styles.navButton}>
                    <Ionicons name="camera" size={24} color="white" onPress={() => navigation.navigate('UploadScreen')} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.navButton}>
                    <Ionicons name="search" size={24} color="white" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('RaybanConnecting')}>
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
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 60,
        alignItems: 'center',
    },
    headerText: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#000000',
        textAlign: 'center',
        marginBottom: 30,
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
    navButton: {
        padding: 10,
    },
});
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';

export default function WelcomeScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.logoContainer}>
                    <Text style={styles.logoText}>
                        <Text style={styles.logoGreen}>Bite</Text>
                        <Text style={styles.logoBlack}>Safe</Text>
                    </Text>
                </View>

                <View style={styles.taglineContainer}>
                    <Text style={styles.taglineText}>
                        <Text style={styles.taglineBlack}>Eat </Text>
                        <Text style={styles.taglineGreen}>Smarter</Text>
                        <Text style={styles.taglineBlack}>, Live </Text>
                        <Text style={styles.taglineGreen}>Safer.</Text>
                    </Text>
                </View>

                <Text style={styles.subtitleText}>
                    Scan for allergies and stay protected with{'\n'}AI-powered food safety.
                </Text>

                <View style={styles.imageContainer}>
                    <Image
                        source={require("../assets/landing-image.png")}
                        style={styles.image}
                        resizeMode="contain"
                    />
                </View>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('SignUp')}
                >
                    <Text style={styles.buttonText}>Get Started</Text>
                </TouchableOpacity>

                <View style={styles.loginContainer}>
                    <Text style={styles.loginText}>Already have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.loginLink}>Log In</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    content: {
        flex: 1,
        paddingHorizontal: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoContainer: {
        marginTop: 60,
        marginBottom: 20,
    },
    logoText: {
        fontSize: 36,
        fontWeight: 'bold',
    },
    logoGreen: {
        color: '#55d684',
    },
    logoBlack: {
        color: '#000000',
    },
    taglineContainer: {
        marginBottom: 16,
    },
    taglineText: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    taglineBlack: {
        color: '#000000',
    },
    taglineGreen: {
        color: '#55d684',
    },
    subtitleText: {
        fontSize: 16,
        color: '#727272',
        textAlign: 'center',
        marginBottom: 30,
        lineHeight: 24,
    },
    imageContainer: {
        width: '100%',
        height: 300,
        marginBottom: 40,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    button: {
        backgroundColor: '#55d684',
        borderRadius: 30,
        paddingVertical: 16,
        width: '100%',
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    loginContainer: {
        flexDirection: 'row',
        marginBottom: 40,
    },
    loginText: {
        fontSize: 16,
        color: '#000000',
    },
    loginLink: {
        fontSize: 16,
        color: '#55d684',
        fontWeight: 'bold',
    },
});
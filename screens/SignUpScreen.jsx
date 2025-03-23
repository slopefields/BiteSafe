import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    ScrollView,
    SafeAreaView,
    Modal
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { signUp } from '../services/authServices.js';
import { Alert } from 'react-native';

export default function SignUpScreen({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [selectedAllergies, setSelectedAllergies] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const allergies = [
        'Shellfish',
        'Fish',
        'Nuts',
        'Soy',
        'Gluten',
        'Dairy',
        'Eggs'
    ];

    const toggleAllergySelection = (item) => {
        if (selectedAllergies.includes(item)) {
            setSelectedAllergies(selectedAllergies.filter(allergy => allergy !== item));
        } else {
            setSelectedAllergies([...selectedAllergies, item]);
        }
    };

    const handleSignUp = async () => {
        if (!username || !password) {
            Alert.alert("Error", "Username and password are required.");
            return;
        }
        const user = await signUp(username, password, selectedAllergies);
        if (user) {
            Alert.alert("Success", "Account created successfully!", [
                { text: "OK", onPress: () => navigation.navigate('Welcome') }
            ]);
        } else {
            Alert.alert("Sign-up Failed", "Please try again.");
        }
        console.log("DONE")
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.title}>Sign Up</Text>
                <Text style={styles.subtitle}>A Safer Bite Starts Here!</Text>

                <Image
                    source={require("../assets/registration-image.png")}
                    style={styles.image}
                    resizeMode="contain"
                />

                <View style={styles.formContainer}>
                    <Text style={styles.label}>Username</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Don't use your real name"
                        placeholderTextColor="#a7a7a7"
                        value={username}
                        onChangeText={setUsername}
                    />

                    <Text style={styles.label}>Password</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Min. 6 characters"
                        placeholderTextColor="#a7a7a7"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />

                    <Text style={styles.label}>Allergies</Text>
                    <TouchableOpacity
                        style={styles.pickerButton}
                        onPress={() => setShowModal(true)}
                    >
                        <Text style={styles.pickerButtonText}>
                            {selectedAllergies.length > 0 ? selectedAllergies.join(', ') : 'Select Your Allergies'}
                        </Text>
                        <Text style={styles.dropdownIcon}>▼</Text>
                    </TouchableOpacity>

                    {/* MODAL FOR MULTI-SELECTION */}
                    <Modal
                        transparent
                        animationType="fade"
                        visible={showModal}
                        onRequestClose={() => setShowModal(false)}
                    >
                        <View style={styles.modalOverlay}>
                            <View style={styles.modalContainer}>
                                <Text style={styles.modalTitle}>Select Allergies</Text>
                                {allergies.map((allergy, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={styles.checkboxContainer}
                                        onPress={() => toggleAllergySelection(allergy)}
                                    >
                                        <AntDesign
                                            name={selectedAllergies.includes(allergy) ? "checksquare" : "checksquareo"}
                                            size={24}
                                            color={selectedAllergies.includes(allergy) ? "#55d684" : "#a7a7a7"}
                                        />
                                        <Text style={styles.checkboxLabel}>{allergy}</Text>
                                    </TouchableOpacity>
                                ))}

                                <TouchableOpacity
                                    style={styles.modalCloseButton}
                                    onPress={() => setShowModal(false)}
                                >
                                    <Text style={styles.modalCloseButtonText}>Done</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>

                    <TouchableOpacity
                        style={styles.signUpButton}
                        onPress={handleSignUp}
                    >
                        <Text style={styles.signUpButtonText}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    scrollContainer: {
        flexGrow: 1,
        padding: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#000000',
        marginTop: 20,
    },
    subtitle: {
        fontSize: 18,
        color: '#000000',
        marginTop: 8,
        marginBottom: 20,
    },
    image: {
        width: '100%',
        height: 250,
        alignSelf: 'center',
        marginVertical: 20,
    },
    formContainer: {
        width: '100%',
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000000',
        marginTop: 16,
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#d9d9d9',
        borderRadius: 8,
        padding: 16,
        fontSize: 16,
        color: '#000000',
    },
    pickerButton: {
        backgroundColor: '#d9d9d9',
        borderRadius: 8,
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    pickerButtonText: {
        fontSize: 16,
        color: '#a7a7a7',
    },
    dropdownIcon: {
        fontSize: 16,
        color: '#a7a7a7',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        backgroundColor: '#ffffff',
        width: '80%',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        width: '100%',
    },
    checkboxLabel: {
        fontSize: 18,
        marginLeft: 10,
        color: '#000000',
    },
    modalCloseButton: {
        backgroundColor: '#55d684',
        borderRadius: 8,
        padding: 12,
        marginTop: 20,
        width: '100%',
        alignItems: 'center',
    },
    modalCloseButtonText: {
        fontSize: 16,
        color: '#ffffff',
        fontWeight: 'bold',
    },
    signUpButton: {
        backgroundColor: '#55d684',
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
        marginTop: 32,
        marginBottom: 20,
    },
    signUpButtonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});


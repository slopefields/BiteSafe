import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, Alert } from 'react-native';  // Ensure Alert is imported here

const RestaurantRowButton = ({ restaurant, restaurantAddress, restaurantStars, restaurantAbout }) => {
  const handlePress = () => {
    // Show an alert with all the restaurant details
    Alert.alert(
      restaurant.name, // Title of the alert
      `Address: ${restaurantAddress}\nStars: ${restaurantStars}\nAbout: ${restaurantAbout}`,
      [{ text: "OK" }] // Button for dismissing the alert
    );
  };

  return (
    <TouchableOpacity style={styles.restaurantCard} onPress={handlePress}>
      <Image
        source={restaurant.image ? { uri: restaurant.image } : require('../assets/Placeholder.png')}
        style={styles.restaurantImage}
      />
      <View style={styles.restaurantInfo}>
        <Text style={styles.restaurantName}>{restaurant.name}</Text>
        <Text style={styles.restaurantAddress}>{restaurantAddress}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  restaurantCard: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderRadius: 30,
    marginBottom: 5,
    paddingVertical: 5,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '105%',
    marginLeft: '-2.5%',
  },
  restaurantImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 16,
  },
  restaurantInfo: {
    flex: 1,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  restaurantAddress: {
    fontSize: 14,
    color: '#666',
  },
});

export default RestaurantRowButton;
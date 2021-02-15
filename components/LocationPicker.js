import React from "react";
import {
  View,
  Button,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { ScrollView } from "react-native-gesture-handler";

import Colors from "../constants/colors";
import Card from "../components/Card";
import { useState } from "react";

export default LocationPicker = () => {
  const [isFetching, setfetchingState] = useState(false);
  const [pickedLocation, setPickedLocation] = useState(null);

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.LOCATION);
    if (result.status != "granted") {
      Alert.alert("Permission Denied", [{ text: "Ok" }]);
      return fslse;
    }
    return true;
  };

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (hasPermission) {
      try {
        setfetchingState(true);
        const location = await Location.getCurrentPositionAsync({
          timeout: 5000,
        });
        setPickedLocation({
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        });
      } catch (err) {
        Alert.alert(
          "Could not fetch location ",
          "please try again or choose location from map",
          [{ text: "OK" }]
        );
      }
    } else return;
  };

  return (
    <ScrollView style={styles.locationPicker}>
      <Card>
        <View style={styles.mapPreview}>
          {isFetching ? (
            <ActivityIndicator size="large" color={Colors.primary} />
          ) : (
            <Text>No location Chosen Yet!</Text>
          )}
        </View>
      </Card>
      <Button
        title="Get User Location "
        color={Colors.primary}
        onPress={getLocationHandler}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  locationPicker: {
    marginBottom: 10,
  },
  mapPreview: {
    marginBottom: 10,
    width: "100%",
    height: 150,
    borderColor: Colors.primary,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

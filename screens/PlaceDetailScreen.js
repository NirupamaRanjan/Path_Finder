import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const PlaceDetailScreen = (props) => {
  return (
    <View>
      <Text>"This is PlaceDetailScreen"</Text>
    </View>
  );
};

PlaceDetailScreen.navigationOptions = (navData) => {
  return {
    headerTitle: navData.navigation.getParam("placeTitle"),
  };
};
export default PlaceDetailScreen;

const styles = StyleSheet.create({});

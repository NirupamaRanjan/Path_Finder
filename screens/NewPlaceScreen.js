import React, { useState } from "react";
import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";

import Color from "../constants/colors";
import Card from "../components/Card";
import * as placesActions from "../store/actions/placesAction";
import ImageSelector from "../components/ImageSelector.js";
import LocationPicker from "../components/LocationPicker";

const NewPlaceScreen = (props) => {
  const [placeTitle, setPlaceTitle] = useState("");
  const [selectedImage, setSelectedImage] = useState();

  const dispatch = useDispatch();

  const setPlaceTitleHandler = (newPlace) => {
    setPlaceTitle(newPlace);
  };

  const imageTakenHandler = (imagePath) => {
    setSelectedImage(imagePath);
  };
  const savePlaceHandler = () => {
    dispatch(placesActions.addPlace(placeTitle, selectedImage));
    props.navigation.goBack();
  };

  return (
    <ScrollView>
      <Card style={styles.card}>
        <View style={styles.card}>
          <Text style={styles.label}>Title</Text>

          <TextInput
            placeholder="Add new place"
            style={styles.textInput}
            onChangeText={setPlaceTitleHandler}
            value={placeTitle}
          />
          <ImageSelector onImageTaken={imageTakenHandler} />
          <LocationPicker />
          <Button
            title="Save Place"
            onPress={savePlaceHandler}
            color={Color.primary}
          />
        </View>
      </Card>
    </ScrollView>
  );
};

export default NewPlaceScreen;

const styles = StyleSheet.create({
  card: { margin: 20 },
  label: {
    fontSize: 18,
    marginBottom: 15,
  },
  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.primary,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
});

import React, { useState } from "react";
import { StyleSheet, Text, View, Button, Image, Alert } from "react-native";
import Colors from "../constants/colors";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

const ImageSelector = (props) => {
  const [capturedImage, setCapturedImage] = useState(null);

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(
      Permissions.MEDIA_LIBRARY,
      Permissions.CAMERA
    );
    if (result.status != "granted") {
      Alert.alert("Permission Denied", [{ text: "Ok" }]);
      return fslse;
    }
    return true;
  };
  const takeIamgeHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (hasPermission) {
      const image = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.5,
      });
      setCapturedImage(image.uri);
      props.onImageTaken(image.uri);
    } else return;
  };
  return (
    <View style={styles.ImagePicker}>
      <View style={styles.ImagePreview}>
        {!capturedImage ? (
          <Text>No image is taken</Text>
        ) : (
          <Image style={styles.Image} source={{ uri: capturedImage }} />
        )}
      </View>
      <Button
        title="Take Image"
        color={Colors.primary}
        onPress={takeIamgeHandler}
      />
    </View>
  );
};

export default ImageSelector;
const styles = StyleSheet.create({
  ImagePicker: {
    alignItems: "center",
  },
  ImagePreview: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: Colors.primary,
    borderWidth: 1,
  },
  Image: {
    width: "100%",
    height: "100%",
  },
});

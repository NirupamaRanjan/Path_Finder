export const ADD_PLACE = "ADD_PLACE";
export const SET_PLACES = "SET_PLACES";
import * as FileSystem from "expo-file-system";

import { insertPlace, fetchPlaces } from "../../helpers/db";

export const addPlace = (title, image) => {
  return async (dispatch) => {
    const fileName = image.split("/").pop(); //split converts the image string into an array of string segments where each segment is a segment before and after such a slash in the string.popin the last element(fileName) for eg. imageFolder/myimage.jpg will return myimage.jpg
    const newPath = FileSystem.documentDirectory + fileName;

    try {
      await FileSystem.moveAsync({
        from: image,
        to: newPath,
      });
      const dbResult = await insertPlace(
        title,
        newPath,
        "Dummy address",
        15.6,
        12.3
      );
      console.log(dbResult);
    } catch (err) {
      console.log(err);
      throw err;
    } //takes two object to and from
    dispatch({
      type: ADD_PLACE,
      placeData: { id: dbResult.insertId, title: title, image: newPath },
    });
  };
};

export const loadPlaces = () => {
  return async (dipatch) => {
    try {
      const dbResult = await fetchPlaces();
      console.log(dbResult);
      dipatch({ type: SET_PLACES, places: dbResult.rows._array });
    } catch (err) {
      throw err;
    }
  };
};

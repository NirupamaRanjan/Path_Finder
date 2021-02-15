import React, { useState } from "react";
import { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Platform,
  FlatList,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch, useSelector } from "react-redux";

import CustomHeaderButton from "../components/HeaderButton";
import PlaceItem from "../components/PlaceItem";
import * as placesAction from "../store/actions/placesAction";

const PlacesListScreen = (props) => {
  const places = useSelector((state) => state.places.places);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(placesAction.loadPlaces());
  }, [dispatch]);

  return (
    <FlatList
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <PlaceItem
          image={itemData.item.imageUri}
          title={itemData.item.title}
          address={null}
          onSelect={() => {
            props.navigation.navigate("PlaceDetail", {
              placeTitle: itemData.item.title,
              placeId: itemData.item.id,
            });
          }}
        />
      )}
    />
  );
};

PlacesListScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "All Places",
    headerRight: (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Add Place"
          iconName={Platform.OS == "android" ? "md-add" : "ios-add"}
          onPress={() => navData.navigation.navigate({ routeName: "NewPlace" })}
        />
      </HeaderButtons>
    ),
  };
};

export default PlacesListScreen;

const styles = StyleSheet.create({});

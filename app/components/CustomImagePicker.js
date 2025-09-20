import React, { useState } from "react";
import { View, TouchableOpacity, Image, StyleSheet, Alert } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import CustomText from "./CustomText";
import { responsiveFontSize, responsiveHeight as hp } from "react-native-responsive-dimensions";
import { useTheme } from "../theme/ThemeContext";

const CustomImagePicker = ({ onImageSelected }) => {
  const { theme } = useTheme();
  const [photo, setPhoto] = useState(null);

  const openGallery = () => {
    launchImageLibrary({ mediaType: "photo", includeBase64: true }, (res) => {
      if (res.didCancel) return;
      if (res.errorCode) {
        Alert.alert("Error", res.errorMessage || "Gallery error");
        return;
      }
      const asset = res.assets && res.assets[0];
      if (asset) {
        const obj = {
          uri: asset.uri,
          base64: asset.base64,
          fileName: asset.fileName,
          type: asset.type,
        };
        setPhoto(obj.uri);
        onImageSelected?.(obj);
      }
    });
  };

  const openCamera = () => {
    launchCamera({ mediaType: "photo", includeBase64: true, saveToPhotos: true }, (res) => {
      if (res.didCancel) return;
      if (res.errorCode) {
        Alert.alert("Error", res.errorMessage || "Camera error");
        return;
      }
      const asset = res.assets && res.assets[0];
      if (asset) {
        const obj = {
          uri: asset.uri,
          base64: asset.base64,
          fileName: asset.fileName,
          type: asset.type,
        };
        setPhoto(obj.uri);
        onImageSelected?.(obj);
      }
    });
  };

  const chooseImage = () => {
    Alert.alert("Upload Photo", "Choose an option", [
      { text: "Camera", onPress: openCamera },
      { text: "Gallery", onPress: openGallery },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={chooseImage}>
      {photo ? (
        <Image source={{ uri: photo }} style={styles.image} />
      ) : (
        <View style={[styles.placeholder, { borderColor: theme.colors.gray }]}>
          <Icon name="camera" size={24} color={theme.colors.gray} />
          <CustomText size={responsiveFontSize(1.6)} color={theme.colors.gray}>
            Upload Photo
          </CustomText>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default CustomImagePicker;

const styles = StyleSheet.create({
  container: { marginTop: hp(2), marginBottom: hp(3) },
  image: { width: 100, height: 100, borderRadius: 50 },
  placeholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

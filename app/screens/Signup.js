import React, { useMemo, useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  StatusBar,
  ActivityIndicator,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import CustomText from "../components/CustomText";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import { useTheme } from "../theme/ThemeContext";
import {
  responsiveWidth as wp,
  responsiveHeight as hp,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import { SafeAreaView } from "react-native-safe-area-context";
import { postAPI } from "../utils/apis";

const Signup = ({ navigation }) => {
  const { theme } = useTheme();
  const [phone, setPhone] = useState("");
  const [emailId, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState(null); // { uri, base64, fileName, type }
  const [loading, setLoading] = useState(false);

  const emailValid = useMemo(
    () => /\S+@\S+\.\S+/.test(String(emailId || "").toLowerCase()),
    [emailId]
  );
  const phoneValid = useMemo(() => (phone || "").trim().length >= 7, [phone]);
  const passwordValid = useMemo(() => {
    const p = (password || "").trim();
    return p.length >= 6 && /\d/.test(p);
  }, [password]);

  const formValid = emailValid && phoneValid && passwordValid;

  const handlePickImage = () => {
    Alert.alert("Upload Photo", "Choose an option", [
      {
        text: "Camera",
        onPress: () => {
          launchCamera({ mediaType: "photo", includeBase64: true }, (res) => {
            if (res.didCancel || res.errorCode) return;
            const asset = res.assets && res.assets[0];
            if (asset) {
              setPhoto({
                uri: asset.uri,
                base64: asset.base64,
                fileName: asset.fileName,
                type: asset.type,
              });
            }
          });
        },
      },
      {
        text: "Gallery",
        onPress: () => {
          launchImageLibrary({ mediaType: "photo", includeBase64: true }, (res) => {
            if (res.didCancel || res.errorCode) return;
            const asset = res.assets && res.assets[0];
            if (asset) {
              setPhoto({
                uri: asset.uri,
                base64: asset.base64,
                fileName: asset.fileName,
                type: asset.type,
              });
            }
          });
        },
      },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  const buildPayload = () => {
    const trimmedPhone = (phone || "").trim();
    const trimmedEmail = (emailId || "").trim().toLowerCase();
    const trimmedPassword = (password || "").trim();

    if (photo && photo.base64) {
      return {
        body: {
          phoneNumber: trimmedPhone,
          emailId: trimmedEmail,
          password: trimmedPassword,
          photoURL: photo.base64, // ✅ backend expects "photoURL"
        },
        isFormData: false,
      };
    }

    if (photo && photo.uri) {
      const fd = new FormData();
      fd.append("phoneNumber", trimmedPhone);
      fd.append("emailId", trimmedEmail);
      fd.append("password", trimmedPassword);
      fd.append("photoURL", {
        uri: photo.uri,
        name: photo.fileName || `profile_${Date.now()}.jpg`,
        type: photo.type || "image/jpeg",
      });
      return { body: fd, isFormData: true };
    }

    return {
      body: {
        phoneNumber: trimmedPhone,
        emailId: trimmedEmail,
        password: trimmedPassword,
        photoURL: null,
      },
      isFormData: false,
    };
  };

  const handleSignup = async () => {
    if (!formValid) {
      Alert.alert(
        "Validation Error",
        !phoneValid
          ? "Please enter a valid phone number."
          : !emailValid
            ? "Please enter a valid email address."
            : "Password must be at least 6 characters and include a number."
      );
      return;
    }

    try {
      setLoading(true);
      const { body, isFormData } = buildPayload();
      const res = await postAPI("signup", body, { isFormData });

      if (res?.success) {
        Alert.alert("Signup Successful", res?.message || "Welcome!", [
          { text: "OK", onPress: () => navigation.replace("Login") },
        ]);
      } else {
        Alert.alert("Signup Failed", res?.message || "Please try again");
      }
    } catch (err) {
      Alert.alert("Error", err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.primary} />
      <SafeAreaView style={{ backgroundColor: theme.colors.primary }} edges={["top"]} />
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.colors.background }]}
        edges={["left", "right", "bottom"]}
      >
        <Image
          source={require("../image/signup_img.png")}
          style={styles.image}
          resizeMode="contain"
        />

        {/* Upload Photo */}
        <TouchableOpacity style={styles.photoContainer} onPress={handlePickImage}>
          {photo ? (
            <Image source={{ uri: photo.uri }} style={styles.photo} />
          ) : (
            <View style={[styles.photoPlaceholder, { borderColor: theme.colors.gray }]}>
              <Icon name="camera" size={24} color={theme.colors.gray} />
              <CustomText size={responsiveFontSize(1.6)} color={theme.colors.gray}>
                Upload Photo
              </CustomText>
            </View>
          )}
        </TouchableOpacity>

        <CustomText
          size={responsiveFontSize(3)}
          weight="700"
          align="center"
          style={{ marginBottom: hp(2) }}
        >
          Sign up
        </CustomText>

        {/* Inputs */}
        <View style={styles.inputContainer}>
          <CustomInput
            placeholder="Phone"
            value={phone}
            onChangeText={setPhone}
            leftIcon="phone"
            keyboardType="phone-pad"
            error={!phoneValid && phone.length > 0 ? "Invalid phone" : undefined}
          />
          <CustomInput
            placeholder="Email"
            value={emailId}
            onChangeText={setEmail}
            leftIcon="envelope"
            keyboardType="email-address"
            autoCapitalize="none"
            error={!emailValid && emailId.length > 0 ? "Invalid email" : undefined}
          />
          <CustomInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            leftIcon="lock"
            error={
              !passwordValid && password.length > 0
                ? "6+ chars & include a number"
                : undefined
            }
          />
        </View>

        {/* Signup button */}
        <CustomButton
          title={loading ? "Signing up..." : "Sign up"}
          onPress={handleSignup}
          disabled={loading || !formValid}
          style={{ opacity: loading || !formValid ? 0.7 : 1 }}
        />

        {loading && (
          <ActivityIndicator style={{ marginTop: hp(1) }} color={theme.colors.primary} />
        )}

        <CustomText
          size={responsiveFontSize(1.8)}
          color={theme.colors.gray}
          align="center"
          style={{ marginVertical: hp(1.5) }}
        >
          or continue with
        </CustomText>

        {/* Social login */}
        <View style={styles.socialContainer}>
          <TouchableOpacity>
            <Icon name="google" size={responsiveFontSize(4)} color={theme.colors.danger} style={styles.socialIcon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="apple" size={responsiveFontSize(4)} color={theme.colors.text} style={styles.socialIcon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="facebook" size={responsiveFontSize(4)} color={theme.colors.secondary} style={styles.socialIcon} />
          </TouchableOpacity>
        </View>

        {/* Navigate to login */}
        <TouchableOpacity style={styles.footer} onPress={() => navigation.navigate("Login")}>
          <CustomText size={responsiveFontSize(1.8)} color={theme.colors.gray} align="center">
            Already have an account?{" "}
            <CustomText color={theme.colors.primary} weight="600">Sign in</CustomText>
          </CustomText>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: wp(5),
  },
  image: {
    width: wp(100),
    height: hp(25),
    marginBottom: hp(2),
  },
  photoContainer: {
    marginTop: hp(2),
    marginBottom: hp(3),
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  photoPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "100%",
    marginBottom: hp(2),
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: hp(1.5),
  },
  socialIcon: {
    marginHorizontal: wp(4),
  },
  footer: {
    marginTop: hp(2),
  },
});

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { Image } from "react-native";
import { Asset } from "expo-asset";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "@/services/api";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import {
  setUserId,
  setBatchId,
  setDepartmentId,
  setProfile,
} from "@/redux/profileSlice";
import { Colors } from "@/constants/Colors";
import { getUserId } from "@/services/asyncStorage";
import { useDispatch } from "react-redux";
import MyCarousel from "@/components/Carousel";
import Items from "@/components/home/Items";
const { width: viewportWidth } = Dimensions.get("window");


const HomeScreen: React.FC = () => {
  const logo = Asset.fromModule(require("../../../../assets/images/logo3.png"));
  const [userID, setUserID] = useState<string | null>(null);
  const dispatch = useDispatch();
  const [userInitials, setUserInitials] = useState<string>("");
  const [greeting, setGreeting] = useState<string>("");

  useEffect(() => {
    const fetchUserId = async () => {
      const data = await getUserId();
      if (typeof data === "string") {
        const { id } = JSON.parse(data);
        setUserID(id);
        dispatch(setUserId(id));
      }
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      setGreeting("Good Morning");
    } else if (currentHour < 18) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }
  }, []);

  const { isLoading, isError, data } = useQuery({
    queryKey: ["profile", userID],
    queryFn: () => getProfile(userID),
    enabled: !!userID,
  });

  useEffect(() => {
    if (data) {
      dispatch(setProfile(data));
      dispatch(setBatchId(data.batch ? data.batch.id : null));
      dispatch(
        setDepartmentId(
          data.batch && data.batch.department ? data.batch.department.id : null
        )
      );

      if (data?.name) {
        const initials = data.name
          .split(" ")
          .map((part) => part.charAt(0).toUpperCase())
          .join("");
        setUserInitials(initials);
      } else {
        setUserInitials("Unknown");
      }
    }
  }, [data]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error fetching profile</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{ flexDirection: "row", gap: 11 }}>
          <View style={styles.logo}>
            <Image source={logo} style={styles.logoImage} />
          </View>
          <Text
            style={{
              paddingTop: 30,
              fontFamily: "Nunito-BlackItalic",
              color: Colors.text,
              fontSize: 22,
            }}
          >
            {greeting}!
          </Text>
        </View>
        <View style={styles.profile}>
          <View style={styles.image}>
            {data && data.profile && data.profile.photoUrl ? (
              <Image
                source={{ uri: data.profile.photoUrl }}
                style={styles.userPhoto}
                resizeMode="cover"
              />
            ) : (
              <View style={styles.userInitialsContainer}>
                <Text style={styles.userInitials}>{userInitials}</Text>
              </View>
            )}
          </View>
          <View style={styles.bio}>
            <Text
              style={{
                fontFamily: "Nunito-Bold",
                fontSize: 22,
                color: Colors.text,
              }}
            >
              {data?.name || "Unknown"}
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontFamily: "Nunito-Bold", color: Colors.text }}>
                Roll: {data?.crn}
              </Text>
              <Text style={{ fontFamily: "Nunito-Bold", color: Colors.text }}>
                , Batch: {data?.batch.name}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.carousel}>
       {/* <MyCarousel /> */}
      </View>
      <View style={styles.contents}>
        <Items />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    gap: 10,
  },
  carouselItem: {
    borderRadius: 8,
    height: hp("30%"),
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    padding: 10,
  },
  carouselImage: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flex: 1,
    backgroundColor: Colors.button,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingTop: 30,
  },
  logo: {},
  profile: {
    width: "100%",
    justifyContent: "flex-start",
    flexDirection: "row",
    gap: 20,
    paddingLeft: 10,
  },
  image: {},
  bio: {
    gap: 10,
  },
  logoImage: {
    width: 80,
    height: 80,
  },
  userPhoto: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  userInitialsContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "gray",
    justifyContent: "center",
    alignItems: "center",
  },
  userInitials: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
  },
  carousel: {
    flex: 1,

    justifyContent: "center",
    alignItems: "center",
    // marginLeft:10,
    // marginRight:10
  },
  contents: {
    flex: 2,
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 18,
  },
});

export default HomeScreen;

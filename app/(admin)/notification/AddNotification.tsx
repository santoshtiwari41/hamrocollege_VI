import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { useDispatch } from "react-redux";
import { addScheduledNotification } from "@/redux/notificationSlice";
import { useNavigation } from "expo-router";
import { v4 as uuidv4 } from "uuid";
import Button from "@/components/Button";
import * as ImagePicker from "expo-image-picker";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { FontAwesome } from '@expo/vector-icons'; 
 import { ScheduledNotification } from "@/redux/notificationSlice";
import { useMutation } from "@tanstack/react-query";
import { sendNotificationBatch } from "@/services/api";
import { useLocalSearchParams,router } from 'expo-router';
const AddNotificationScreen: React.FC = () => {
  const { batchId,batchName,departmentId } = useLocalSearchParams();
  console.log('batch id:',batchId)
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [scheduledDate, setScheduledDate] = useState<string>(
    new Date().toISOString()
  );
  const [imageUri, setImageUri] = useState<string>("");

  const dispatch = useDispatch();
  const navigation = useNavigation();
  
  const notificationMutation=useMutation({
    mutationFn: sendNotificationBatch,
    onSuccess: (res) => {
    console.log(res)
    }
  })
  const addNotification = () => {
    const newNotification: ScheduledNotification = {
      id: uuidv4(),
      title,
      description,
      scheduledDate,
      imageUri: imageUri || "",  
    };

    dispatch(addScheduledNotification(newNotification));
 
    setTitle("");
    setDescription("");
    setScheduledDate(new Date().toISOString());
    setImageUri("");
    notificationMutation.mutate({
     type:"BATCH",
     batchId:batchId,
     title,
     body:description,
     scheduledTime:scheduledDate
    });
   
    navigation.goBack();
  };

  const selectImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,  // Set to false to avoid cropping
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  if(notificationMutation.isPending) {
    return <Text>Loading...</Text>
  }
  if(notificationMutation.isError) {
    // return <Text>{loginMutation.error.message}</Text>
    console.log(notificationMutation.error.message)
  }
  if(notificationMutation.isSuccess) {
    Alert.alert('Success', 'Student Registered Successfully');
   
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>send Notification to {batchName}</Text>

      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder="Schedule Date (YYYY-MM-DDTHH:MM:SS)"
        value={scheduledDate}
        onChangeText={setScheduledDate}
      />

      <TouchableOpacity onPress={selectImage}>
        <View style={styles.imageContainer}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.image} resizeMode="contain" />
          ) : (
            <View style={styles.placeholder}>
              <FontAwesome name="camera" size={40} color="#FFF" />
              <Text style={styles.placeholderText}>Select Image</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={addNotification}>
        <Button title="Add Notification" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#E2E2E2",
    paddingTop: hp("10%"),
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    fontFamily: "Nunito-ExtraBold",
  },
  input: {
    backgroundColor: "#E2E2E2",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    color: "#333",
    fontSize: 16,
    fontFamily: "Nunito-SemiBold",
    borderWidth: 1,
  },
  imageContainer: {
    width: wp("90%"),
    height: hp("30%"),
    borderRadius: 10,
    backgroundColor: "gray",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    overflow: "hidden",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  placeholder: {
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    color: "#FFF",
    fontSize: 16,
    fontFamily: "Nunito-Bold",
    marginTop: 10,
  },
  addButton: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    borderRadius: 10,
  },
  addButtonText: {
    color: "#FFF",
    fontSize: 16,
    textAlign: "center",
    fontFamily: "Nunito-Bold",
  },
});

export default AddNotificationScreen;

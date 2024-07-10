
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons } from "@expo/vector-icons";

const NotificationDetail = () => {
  const { title, description, imageUrl } = useLocalSearchParams();
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);

  const back = () => {
    router.back();
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={back}>
          <Ionicons name="arrow-back" size={30} color="#1A162B" />
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>{description}</Text>
      </View>
      <TouchableOpacity style={styles.imageContainer} onPress={toggleModal}>
        <Image source={{ uri: imageUrl }} style={styles.image} />
      </TouchableOpacity>
      
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.modalCloseButton} onPress={toggleModal}>
            <Ionicons name="close" size={30} color="#FFFFFF" />
          </TouchableOpacity>
          <Image source={{ uri: imageUrl }} style={styles.fullScreenImage} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E2E2E2',
    paddingTop: hp('7%'),
    gap: hp('2%')
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp('3%'),
    gap: hp('2%')
  },
  title: {
    fontSize: 24,
    fontFamily:'Nunito-Bold',
    flexShrink: 1,
  },
  imageContainer: {
    flex: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: wp('100%'),

  },
  image: {
    width: wp('95%'),
    height: hp('73%'),
  },
  descriptionContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  description: {
    fontSize: 16,
    fontFamily: 'Nunito-MediumItalic',
    
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  modalCloseButton: {
    position: 'absolute',
    top:  hp('3%'),
    right:  wp('6%'),
    zIndex: 1,
  },
  fullScreenImage: {
    flex: 1,
    width: wp('100%'),
    height: hp('100%'),
    resizeMode: 'contain',
  },
});

export default NotificationDetail;

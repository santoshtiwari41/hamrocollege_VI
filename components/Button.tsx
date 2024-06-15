import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

interface ButtonProps {
  title: string;
}

const Button: React.FC<ButtonProps> = ({ title }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4e247d',
    height: hp('6%'),
    width: wp('90%') ,
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  text: {
    color: '#fff', 
    fontFamily:'Nunito-Black',
    fontSize:15
  },
});

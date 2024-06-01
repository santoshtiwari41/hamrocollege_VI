import React from 'react';
import { View, TextInput, StyleSheet, TextInputProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

interface InputProps extends TextInputProps {
  icon?: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
}

const InputField: React.FC<InputProps> = ({ icon, placeholder, value, onChangeText, ...props }) => {
  return (
    <View style={styles.inputContainer}>
      {icon && <Ionicons name={icon} size={24} color="#1A162B" style={styles.icon} />}
      <TextInput
        
        style={styles.textInput}
        placeholder={placeholder}
        placeholderTextColor="#999"
        value={value}
        onChangeText={onChangeText}
        {...props}
      />
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1A162B',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    height: hp('6%'),
    width: wp('90%') ,
  },
  icon: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    color: '#333',
    fontSize: 16,
    fontFamily:'Nunito-SemiBold'
  },
});

import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

interface InputProps {
  icon?: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
}

const PasswordField: React.FC<InputProps> = ({ icon, placeholder, value, onChangeText }) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  return (
    <View style={styles.inputContainer}>
      {icon && <Ionicons name={icon} size={24} color="#1A162B" style={styles.icon} />}
      <TextInput
        style={styles.textInput}
        placeholder={placeholder}
        placeholderTextColor="#999"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
      <TouchableOpacity onPress={toggleSecureEntry} style={styles.eyeIconContainer}>
        <Ionicons name={secureTextEntry ? 'eye-off' : 'eye'} size={24} color="#1A162B" />
      </TouchableOpacity>
    </View>
  );
};

export default PasswordField;

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
    width: wp('90%'),
  },
  icon: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    fontFamily:'Nunito-SemiBold'

  },
  eyeIconContainer: {
    position: 'absolute',
    right: 10,
  },
});

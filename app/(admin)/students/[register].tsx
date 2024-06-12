import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, ScrollView } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { Ionicons } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import InputField from '@/components/InputField';
import Button from '@/components/Button';
import { StatusBar } from 'expo-status-bar';
import { useMutation } from '@tanstack/react-query';
import { studentRegister } from '@/services/api';
import { useLocalSearchParams,router } from 'expo-router';
interface Student {
  name: string;
  email: string;
  department: string;
  batch: string|undefined;
  phoneNumber: string;
}

const AdminRegisterStudent: React.FC = () => {
  const { batchId } = useLocalSearchParams();
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [department, setDepartment] = useState<string>('');
  const [batch, setBatch] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const BatchId = batchId 
  const [departmentSelected, setDepartmentSelected] = useState<boolean>(false);

  const registerMutation = useMutation({
    mutationFn: studentRegister,
  });

  const handleRegisterStudent = () => {
    if (!name || !email || !phoneNumber) {
      Alert.alert('Error', 'Please fill in all fields except batchId.');
      return;
    }
   
    registerMutation.mutate({
      name,
      email,
      phone:phoneNumber,
      batchId:BatchId
    });
    resetForm();
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setDepartment('');
    setPhoneNumber('');
  
  };

  if (registerMutation.isPending) {
    return <Text>Loading...</Text>;
  }
  if (registerMutation.isError) {
    return <Text>{registerMutation.error.message}</Text>;
  }
  if (registerMutation.isSuccess) {
    
    console.log('success')
  }

  return (
    <>
      <StatusBar style="dark" backgroundColor="white" />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Register New Student</Text>
        <InputField icon="person" placeholder="Name" value={name} onChangeText={setName} />
        <InputField icon="mail" placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
        {/* <InputField icon="school" placeholder="Batch" value={batch} onChangeText={setBatch} />
         */}
        <InputField icon="call" placeholder="Phone Number" value={phoneNumber} onChangeText={setPhoneNumber} keyboardType="phone-pad" />

        {/* <View style={styles.pickerWrapper}>
          <Ionicons name="business" size={24} color="black" style={styles.pickerIcon} />
          <View style={styles.pickerContainer}>
            <RNPickerSelect
              onValueChange={(value) => {
                setDepartment(value);
                setDepartmentSelected(true);
              }}
              items={[
                { label: 'Computer', value: 'Computer' },
                { label: 'Civil', value: 'Civil' },
                { label: 'Electronics', value: 'Electronics' },
                { label: 'BCA', value: 'BCA' },
                { label: 'IT', value: 'IT' },
                { label: 'Software', value: 'Software' },
              ]}
              style={{
                placeholder: {
                  color: '#999',
                  fontFamily: 'Nunito-SemiBold',
                  fontSize: 16,
                },
              }}
              placeholder={{
                label: 'Choose Department',
                value: '',
              }}
            />
          </View>
        </View> */}
        <TouchableOpacity onPress={handleRegisterStudent} style={{ alignItems: 'center' }}>
          <Button title="Add new student" />
        </TouchableOpacity>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#E2E2E2',
    alignItems: 'center',
    gap: hp('4%'),
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    fontFamily: 'Nunito-ExtraBold',
  },
  pickerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#1A162B',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#E2E2E2',
    paddingLeft: 10,
    height: hp('6%'),
    width: wp('90%'),
  },
  pickerIcon: {
    marginRight: 10,
  },
  pickerContainer: {
    flex: 1,
  },
});

export default AdminRegisterStudent;

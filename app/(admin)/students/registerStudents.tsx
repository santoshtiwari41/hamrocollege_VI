import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, ScrollView } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { Ionicons } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import InputField from '@/components/InputField';
import Button from '@/components/Button';
import { StatusBar } from 'expo-status-bar';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getAllStudents, studentRegister } from '@/services/api';
import { useLocalSearchParams,router } from 'expo-router';
interface Student {
  name: string;
  email: string;
  department: string;
  batch: string|undefined;
  phoneNumber: string;
}

const AdminRegisterStudent: React.FC = () => {
  const queryClient=useQueryClient()
  const { batchId }= useLocalSearchParams();
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [department, setDepartment] = useState<string>('');
 
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  
  
  const registerMutation = useMutation({
    mutationFn: studentRegister,
    onSuccess:(()=>{
      queryClient.invalidateQueries({queryKey: ['students', batchId]})
      router.back()

    })
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
      batchId: batchId as string
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

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createBatch } from '@/services/api';
import { useLocalSearchParams, useRouter } from 'expo-router';

const CreateBatchScreen: React.FC = () => {
  const { departmentId } = useLocalSearchParams();
  const router = useRouter();
  const [name, setName] = useState<string>('');
  const [startYear, setStartYear] = useState<string>('');
  const [endYear, setEndYear] = useState<string>('');
  const queryClient = useQueryClient();

  const batchMutation = useMutation({
    mutationFn: createBatch,
    onSuccess: (() => {
      queryClient.invalidateQueries({ queryKey: ['batches'] });
      router.back();
    }),
    onError: (error: any) => {
      Alert.alert('Error', error.message || 'Something went wrong');
    },
  });

  const handleCreateBatch = () => {
    if (!name || !startYear || !endYear || !departmentId) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    batchMutation.mutate({
      name,
      startYear: parseInt(startYear, 10),
      endYear: parseInt(endYear, 10),
      departmentId: parseInt(departmentId, 10),
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Batch Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter batch name"
      />
      <Text style={styles.label}>Start Year</Text>
      <TextInput
        style={styles.input}
        value={startYear}
        onChangeText={setStartYear}
        placeholder="Enter start year"
        keyboardType="numeric"
      />
      <Text style={styles.label}>End Year</Text>
      <TextInput
        style={styles.input}
        value={endYear}
        onChangeText={setEndYear}
        placeholder="Enter end year"
        keyboardType="numeric"
      />
      <Text style={styles.label}>Department</Text>
     
      <Button title="Create Batch" onPress={handleCreateBatch} />
      {batchMutation.isPending && <Text>Loading...</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default CreateBatchScreen;
     
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Button from '@/components/Button';
import { StatusBar } from 'expo-status-bar';
import { useQuery } from '@tanstack/react-query';
import { getAllStudents } from '@/services/api';
import { useLocalSearchParams, useRouter } from 'expo-router';

interface Student {
  crn: number;
  name: string;
  batch: {
    name: string;
    department: {
      name: string;
    };
  };
}

const AdminRegisterStudent: React.FC = () => {
  const { batchId } = useLocalSearchParams();
  const [students, setStudents] = useState<Student[]>([]);
  const router = useRouter();
  const { isLoading, isError, data } = useQuery({
    queryKey: ['students', batchId],
    queryFn: () => getAllStudents(batchId as string),
    enabled: !!batchId,
  });

  useEffect(() => {
    if (data) {
      setStudents(data.students);
    }
  }, [data]);

  const handleRegisterStudent = () => {
    router.push({
      pathname: `/students/registerStudents`,
      params: { batchId: batchId as string },
    });
  };

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (isError) {
    return <Text>Error fetching students...</Text>;
  }

  return (
    <>
      <StatusBar style="dark" backgroundColor="white" />
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity onPress={handleRegisterStudent} style={styles.addButtonContainer}>
          <Button title="Add new student" />
        </TouchableOpacity>
        {students.map((student) => (
          <TouchableOpacity
            key={student.crn}
            style={styles.studentContainer}
            onPress={() => {
              // Handle student profile click
            }}
          >
            <View style={styles.profileContainer}>
              <Text style={styles.profileInitials}>
                {student.name.split(' ').map((namePart, index) => (
                  <Text key={index} style={index === 0 ? styles.initialsSA : styles.initialsNT}>
                    {namePart.charAt(0).toUpperCase()}
                  </Text>
                ))}
              </Text>
            </View>
            <View style={styles.studentDetailsContainer}>
              <Text style={styles.studentName}>{student.name}</Text>
              <Text style={styles.studentDetails}>Batch: {student.batch.name}</Text>
              <Text style={styles.studentDetails}>Department: {student.batch.department.name}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#E2E2E2',
  },
  addButtonContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  studentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  profileContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#CCCCCC',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  profileInitials: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
  },
  initialsSA: {
    color: '#FF6347', // Coral color for 'SA'
  },
  initialsNT: {
    color: '#20B2AA', // Light sea green color for 'NT'
  },
  studentDetailsContainer: {
    flex: 1,
  },
  studentName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  studentDetails: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 3,
  },
});

export default AdminRegisterStudent;

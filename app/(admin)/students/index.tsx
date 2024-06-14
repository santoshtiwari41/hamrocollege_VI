import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { useQuery } from '@tanstack/react-query';
import { getBatchs } from '@/services/api';
import { Entypo } from '@expo/vector-icons'; // Import the Entypo icon library
import { useRouter } from 'expo-router';

interface Batch {
  id: number;
  name: string;
  startYear: number;
  endYear: number;
  departmentId: number;
}

const departmentNames: { [key: number]: string } = {
  1: 'Civil',
  2: 'IT',
  3: 'Computer',
  4: 'Software',
};

const DepartmentScreen: React.FC = () => {
    const router = useRouter();
    const navigation = useNavigation();
    const { isLoading, error, data } = useQuery({
        queryKey: ['batchData'],
        queryFn: getBatchs
    });
 
    const [selectedDepartmentIndex, setSelectedDepartmentIndex] = useState<number>(0);

    const handleBatchClick = (batch: Batch) => {
       
        router.push({
            pathname: `/students/${batch.id}`, 
            params: { batchId: batch.id },
        });
    };

    const handleAddBatchClick = () => {
        
        router.push('/students/addBatch');
    };

    const departments = Object.keys(departmentNames).map(Number);
    const selectedDepartmentId = departments[selectedDepartmentIndex];

   
    const responseData = data?.data;
    const filteredBatches = responseData?.filter((batch: Batch) => batch.departmentId === selectedDepartmentId) || [];

    if (isLoading) {
        return <Text>Loading...</Text>;
    }

    if (error) {
        return <Text>{error.message}</Text>;
    }

    return (
        <View style={styles.container}>
           <TouchableOpacity style={styles.addButton} onPress={handleAddBatchClick}>
                <Entypo name="plus" size={24} color="black" />
                <Text style={styles.addButtonText}>Add Batch</Text>
            </TouchableOpacity>
            <SegmentedControl
                values={Object.values(departmentNames)}
                selectedIndex={selectedDepartmentIndex}
                onChange={(event) => setSelectedDepartmentIndex(event.nativeEvent.selectedSegmentIndex)}
                style={styles.segmentedControl}
                tintColor="#007AFF"
                fontStyle={{ fontWeight: '500' }}
                activeFontStyle={{ fontWeight: '700', color: '#fff' }}
            />
           
            <ScrollView style={styles.scrollContainer}>
                {filteredBatches.map((batch: Batch) => (
                    <TouchableOpacity
                        key={batch.id}
                        style={styles.batchItem}
                        onPress={() => handleBatchClick(batch)}
                    >
                        <Text style={styles.batchText}>{batch.name}</Text>
                        <Text style={styles.batchYears}>{batch.startYear} - {batch.endYear}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F5F5F5',
    },
    segmentedControl: {
        marginBottom: 20,
        backgroundColor: '#F0F0F0',
        borderRadius: 8,
        padding: 5,
    },
    scrollContainer: {
        flex: 1,
    },
    batchItem: {
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    batchText: {
        fontSize: 18,
        color: '#333',
        fontWeight: 'bold',
    },
    batchYears: {
        fontSize: 14,
        color: '#888',
        marginTop: 5,
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    addButtonText: {
        marginLeft: 10,
        fontSize: 18,
        color: '#333',
    },
});

export default DepartmentScreen;

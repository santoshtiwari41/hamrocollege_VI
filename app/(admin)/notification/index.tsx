import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { useQuery } from '@tanstack/react-query';
import { getBatchs } from '@/services/api';
import { Entypo } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import Button from '@/components/Button';

interface Batch {
  id: number;
  name: string;
  startYear: number;
  endYear: number;
  departmentId: number;
}

const departmentNames: { [key: number]: string } = {
  1: 'Computer',
  2: 'IT',
  3: 'Software',
  4: 'Civil',
};

const Notification: React.FC = () => {
    const router = useRouter();
    const { isLoading, error, data } = useQuery({
        queryKey: ['batchData'],
        queryFn: getBatchs
    });
 
    const [selectedDepartmentIndex, setSelectedDepartmentIndex] = useState<number>(0);
    const [selectedOption, setSelectedOption] = useState<'all' | 'specific'>('all'); 
    const [selectedBatchId, setSelectedBatchId] = useState<number | null>(null);

    const handleBatchClick = (batch: Batch) => {
        router.push({
            pathname: `/(admin)/notification/AddNotification`,
            params: { batchId: batch.id, departmentId: selectedDepartmentIndex + 1, batchName: batch.name },
        });
    };

    const handleDropdownChange = (value: 'all' | 'specific') => {
        setSelectedOption(value);
        if (value === 'all') {
            setSelectedBatchId(null);
        }
    };

    const handleSendToAll = () => {
        if (selectedDepartmentIndex !== null) {
            router.push({
                pathname: `(admin)/notification/sendToAll`,
                params: { departmentId: selectedDepartmentIndex + 1 },
            });
        }
    };
    const handleSendToDepart = () => {
        if (selectedDepartmentIndex !== null) {
            router.push({
                pathname: `(admin)/notification/SendToDepart`,
                params: { departmentId: selectedDepartmentIndex + 1 },
            });
        }
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
             <TouchableOpacity style={styles.addButton} onPress={handleSendToAll}>
                <Entypo name="plus" size={24} color="black" />
                <Text style={styles.addButtonText}>send to all</Text>
            </TouchableOpacity>

            <View style={styles.dropdownContainer}>
                <SegmentedControl
                    backgroundColor='#a848e8'
                    values={Object.values(departmentNames)}
                    selectedIndex={selectedDepartmentIndex}
                    onChange={(event) => setSelectedDepartmentIndex(event.nativeEvent.selectedSegmentIndex)}
                    style={styles.segmentedControl}
                    tintColor="#007AFF"
                    fontStyle={{ fontWeight: '500' }}
                    activeFontStyle={{ fontWeight: '700', color: '#fff' }}
                />
                <Picker
                    selectedValue={selectedOption}
                    onValueChange={(value) => handleDropdownChange(value as 'all' | 'specific')}
                    style={styles.picker}
                >
                    <Picker.Item label="Send to All Batches" value="all" />
                    <Picker.Item label="Send to Specific Batch" value="specific" />
                </Picker>
            </View>
           
            {selectedOption === 'specific' && (
                <ScrollView style={styles.scrollContainer}>
                    {filteredBatches.map((batch: Batch) => (
                        <TouchableOpacity
                            key={batch.id}
                            style={styles.batchItem}
                            onPress={() => {
                                setSelectedBatchId(batch.id);
                                handleBatchClick(batch);
                            }}
                        >
                            <Text style={styles.batchText}>{batch.name}</Text>
                            <Text style={styles.batchYears}>{batch.startYear} - {batch.endYear}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            )}

            {selectedOption === 'all' && (
                <TouchableOpacity style={styles.sendToAllButton} onPress={handleSendToDepart}>
                    <Entypo name="chevron-right" size={24} color="white" />
                    <Button title={`Send to All Batches of ${departmentNames[selectedDepartmentId]}`}/>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F5F5F5',
    },
    dropdownContainer: {
        marginBottom: 20,
    },
    segmentedControl: {
        marginBottom: 10,
        height: 50, 
    },
    picker: {
        height: 40,
        backgroundColor: '#F0F0F0',
        borderRadius: 8,
        marginBottom: 10,
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
    sendToAllButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
       
        paddingVertical: 12,
        borderRadius: 8,
        marginBottom: 20,
    },
    sendToAllText: {
        fontSize: 18,
        color: '#fff',
        marginLeft: 10,
    },
    sendToAll:{
      margin:20
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

export default Notification;

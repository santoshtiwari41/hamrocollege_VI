import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { useQuery } from "@tanstack/react-query";
import { getBatchs } from "@/services/api";
import { Entypo } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ActivityIndicator } from "react-native-paper";

interface Batch {
  id: number;
  name: string;
  startYear: number;
  endYear: number;
  departmentId: number;
}

const departmentNames: { [key: number]: string } = {
  1: "Computer",
  2: "IT",
  3: "Software",
  4: "Civil",
};

const DepartmentScreen: React.FC = () => {
  const router = useRouter();
  const { isLoading, data, isError } = useQuery({
    queryKey: ["batches"],
    queryFn: getBatchs,
  });
  const [selectedDepartmentIndex, setSelectedDepartmentIndex] =
    useState<number>(0);
  const handleBatchClick = (batch: Batch) => {
    router.push({
    pathname: `/students/${batch.id}`,
    params: { batchId: batch.id },
    });
  };

  const handleAddBatchClick = () => {
    router.push({
      pathname: "/students/addBatch",
      params: { departmentId: (selectedDepartmentIndex + 1) },
    });
  };

  const departments = Object.keys(departmentNames).map(Number);
  const selectedDepartmentId = departments[selectedDepartmentIndex];

  const responseData = data?.data;
  const filteredBatches =
    responseData?.filter(
      (batch: Batch) => batch.departmentId === selectedDepartmentId
    ) || [];

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error fetching notifications</Text>
      </View>
    );
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
        onChange={(event) =>
          setSelectedDepartmentIndex(event.nativeEvent.selectedSegmentIndex)
        }
        style={styles.segmentedControl}
        tintColor="#007AFF"
        fontStyle={{ fontWeight: "500" }}
        activeFontStyle={{ fontWeight: "700", color: "#fff" }}
      />

      <ScrollView style={styles.scrollContainer}>
        {filteredBatches.map((batch: Batch) => (
          <TouchableOpacity
            key={batch.id}
            style={styles.batchItem}
            onPress={() => handleBatchClick(batch)}
          >
            <Text style={styles.batchText}>{batch.name}</Text>
            <Text style={styles.batchYears}>
              {batch.startYear} - {batch.endYear}
            </Text>
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
    backgroundColor: "#F5F5F5",
  },
  segmentedControl: {
    marginBottom: 20,
    backgroundColor: "#F0F0F0",
    borderRadius: 8,
    padding: 5,
  },
  scrollContainer: {
    flex: 1,
  },
  batchItem: {
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
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
    color: "#333",
    fontWeight: "bold",
  },
  batchYears: {
    fontSize: 14,
    color: "#888",
    marginTop: 5,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  addButtonText: {
    marginLeft: 10,
    fontSize: 18,
    color: "#333",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 18,
  },
});

export default DepartmentScreen;

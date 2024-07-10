import React, { FunctionComponent } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

import { Colors } from '@/constants/Colors';
import { useNavigation } from 'expo-router';

type IconComponentType = FunctionComponent<{ name: string; size: number; color: string }>;

interface IconProps {
  component: IconComponentType;
  name: string;
  label: string;
  routeName: string; // New property to specify route name
}

interface IconSectionProps {
  title: string;
  icons: IconProps[];
}

const IconSection: React.FC<IconSectionProps> = ({ title, icons }) => {
  const navigation = useNavigation(); // Hook to access navigation object

  const handleIconPress = (routeName: string) => {
    navigation.navigate(routeName); 
  };

  return (
    <View style={styles.sectionContainer}>
      <Text style={[styles.sectionTitle, { fontFamily: 'Nunito-ExtraBold' }]}>{title}</Text>

      <View style={styles.iconsContainer}>
        {icons.map((icon, index) => (
          <TouchableOpacity key={index} style={styles.iconBox} onPress={() => handleIconPress(icon.routeName)}>
            <icon.component name={icon.name} size={30} color={Colors.button} />
            <Text style={styles.iconText}>{icon.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const Items: React.FC = () => {
  return (
    <View style={styles.container}>
      <IconSection
        title="Academic Management"
        icons={[
          { component: FontAwesome as unknown as IconComponentType, name: 'book', label: 'Assignment', routeName: 'Stack/Assignment' },
          { component: FontAwesome as unknown as IconComponentType, name: 'graduation-cap', label: 'Results', routeName: 'Stack/Result' },
          { component: MaterialIcons as unknown as IconComponentType, name: 'library-books', label: 'Resources', routeName: 'Stack/Resources' },
        ]}
      />
      <IconSection
        title="Attendance & Administration"
        icons={[
          { component: FontAwesome as unknown as IconComponentType, name: 'check-square-o', label: 'Attendance', routeName: 'hello' },
          { component: MaterialIcons as unknown as IconComponentType, name: 'exit-to-app', label: 'Leave Request', routeName: 'Stack/LeaveRequest' },
          { component: FontAwesome as unknown as IconComponentType, name: 'bell', label: 'Notices', routeName: 'Stack/Notices' },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
    width: '100%',
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'Nunito-ExtraBold',
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  iconBox: {
    alignItems: 'center',
    padding: 7,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 10,
    backgroundColor: '#FFF',
    width: 92,
    height: 92,
    justifyContent: 'center',
  },
  iconText: {
    marginTop: 5,
    fontSize: 12,
    textAlign: 'center',
    fontFamily: 'Nunito-SemiBold',
  },
});

export default Items;

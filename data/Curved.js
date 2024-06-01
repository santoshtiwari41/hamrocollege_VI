import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { View, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const DottedCurvedLine = () => {
  return (
    <View style={styles.container}>
      <Svg height="150" width={width} viewBox="0 0 1440 320">
        <Path
          d="M0,96C48,128,96,160,144,160C192,160,240,128,288,112C336,96,384,96,432,112C480,128,528,160,576,160C624,160,672,128,720,112C768,96,816,96,864,112C912,128,960,160,1008,160C1056,160,1104,128,1152,112C1200,96,1248,96,1296,112C1344,128,1392,160,1416,176L1440,192L1440,320L0,320Z"
          stroke="#FF4081"
          strokeWidth="10"
          strokeDasharray="10, 10"
          fill="none"
        />
        <Path
          d="M0,160C48,192,96,224,144,224C192,224,240,192,288,176C336,160,384,160,432,176C480,192,528,224,576,224C624,224,672,192,720,176C768,160,816,160,864,176C912,192,960,224,1008,224C1056,224,1104,192,1152,176C1200,160,1248,160,1296,176C1344,192,1392,224,1416,240L1440,256L1440,320L0,320Z"
          stroke="#3F51B5"
          strokeWidth="5"
          strokeDasharray="10, 10"
          fill="none"
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    width: '100%',
  },
});

export default DottedCurvedLine;

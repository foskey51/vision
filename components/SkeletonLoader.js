import React from 'react';
import { View, StyleSheet } from 'react-native';

const SkeletonLoader = () => {
  return (
    <View style={styles.container}>
      <View style={[styles.skeleton, { width: 'auto', marginTop: 15, height: 20 }]} />
      <View style={[styles.skeleton, { width: 180, marginTop: 10, height: 20 }]} />
      <View style={[styles.skeleton, { width: 170, marginTop: 10, height: 20 }]} />
      <View style={[styles.skeleton, { width: 160, marginTop: 10, height: 20 }]} />
      <View style={[styles.skeleton, { width: 150, marginTop: 10, height: 20 }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  skeleton: {
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
  },
});

export default SkeletonLoader;

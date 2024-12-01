import React from 'react';
import { View, StyleSheet } from 'react-native';

const SkeletonLoader = () => {
  return (
    <View style={styles.container}>
      <View style={[styles.skeleton, { width: '90%', height: 20 }]} />
      <View style={[styles.skeleton, { width: '85%', height: 20, marginTop: 10 }]} />
      <View style={[styles.skeleton, { width: '95%', height: 20, marginTop: 10 }]} />
      <View style={[styles.skeleton, { width: '70%', height: 20, marginTop: 10 }]} />
      <View style={[styles.skeleton, { width: '80%', height: 20, marginTop: 10 }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  skeleton: {
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
  },
});

export default SkeletonLoader;

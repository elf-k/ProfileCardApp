import { View, Text, StyleSheet } from 'react-native';
import { useState } from 'react';
import { COLORS, SPACING, RADII, FONTS } from '../theme';

export default function ProfileScreen() {
  const [theme, setTheme] = useState('light');
  const currentTheme = COLORS[theme];

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: currentTheme.bg },
      ]}
    >
      <Text style={[styles.title, { color: currentTheme.text }]}>
        Profile Card
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: FONTS.bold,
    fontSize: 24,
  },
});

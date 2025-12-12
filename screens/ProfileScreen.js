import { View, Text, StyleSheet, Pressable, useWindowDimensions } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADII, FONTS } from '../theme';

export default function ProfileScreen() {
  const [theme, setTheme] = useState('light');
  const currentTheme = COLORS[theme];

  // Responsive logic
  const { width } = useWindowDimensions();
  const isLargeScreen = width > 500;

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.bg }]}>
      
      {/* Theme Toggle Button */}
      <Pressable onPress={toggleTheme} style={styles.themeToggle}>
        <Ionicons
          name={theme === 'light' ? 'moon' : 'sunny'}
          size={28}
          color={currentTheme.text}
        />
      </Pressable>

      {/* Profile Card */}
      <View
        style={[
          styles.card,
          {
            backgroundColor: currentTheme.card,
            padding: isLargeScreen ? SPACING.xl : SPACING.lg,
            width: isLargeScreen ? '60%' : '85%',
          },
        ]}
      >
        <Ionicons
          name="person-circle-outline"
          size={isLargeScreen ? 100 : 80}
          color={currentTheme.text}
        />

        <Text style={[styles.name, { color: currentTheme.text }]}>
          John Doe
        </Text>

        <Text style={[styles.role, { color: currentTheme.text }]}>
          Mobile Developer
        </Text>

        {/* Like Button */}
        <Pressable
          style={({ pressed }) => [
            styles.likeButton,
            { backgroundColor: pressed ? '#e63946' : '#ff6b6b' },
          ]}
          onPress={() => console.log('Profile Liked!')}
        >
          <Ionicons name="heart" size={24} color="#fff" />
          <Text style={styles.likeText}>Like</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  themeToggle: {
    position: 'absolute',
    top: 50,
    right: 20,
    padding: SPACING.sm,
  },

  card: {
    borderRadius: RADII.md,
    alignItems: 'center',

    // iOS shadow
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },

    // Android shadow
    elevation: 6,
  },

  name: {
    fontFamily: FONTS.bold,
    fontSize: 24,
    marginTop: SPACING.md,
  },

  role: {
    fontFamily: FONTS.regular,
    fontSize: 16,
    marginTop: SPACING.sm,
    opacity: 0.7,
  },

  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    borderRadius: 50,
    marginTop: SPACING.md,
  },

  likeText: {
    color: '#fff',
    fontFamily: FONTS.bold,
    fontSize: 16,
    marginLeft: SPACING.sm,
  },
});




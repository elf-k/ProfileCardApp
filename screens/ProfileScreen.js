
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  useWindowDimensions,
  FlatList,
  Animated,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADII, FONTS } from '../theme';


const PROFILES = [
  {
    id: '1',
    name: 'Elif K.',
    role: 'Mobile Developer',
    location: 'Istanbul, Türkiye',
    bio: 'Passionate about mobile development and clean UI design.',
  },
  {
    id: '2',
    name: 'Ahmet Yılmaz',
    role: 'Frontend Dev',
    location: 'Ankara, Türkiye',
    bio: 'React & React Native lover. Coffee first, then code.',
  },
  {
    id: '3',
    name: 'Zeynep A.',
    role: 'UI/UX Designer',
    location: 'Izmir, Türkiye',
    bio: 'Design systems, accessibility and pretty micro-interactions.',
  },
];

function ProfileCard({ item, theme }) {
  const currentTheme = COLORS[theme];
  const { width } = useWindowDimensions();
  const isLargeScreen = width > 500;

  
  const [liked, setLiked] = useState(false);
  const [following, setFollowing] = useState(false);
  const [expanded, setExpanded] = useState(false);

  
  const scaleAnim = useRef(new Animated.Value(1)).current; // press feedback
  const expandAnim = useRef(new Animated.Value(0)).current; // 0 = collapsed, 1 = expanded

  useEffect(() => {
    Animated.timing(expandAnim, {
      toValue: expanded ? 1 : 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [expanded, expandAnim]);

  const onPressInCard = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.995,
      useNativeDriver: true,
      friction: 8,
    }).start();
  };
  const onPressOutCard = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      friction: 8,
    }).start();
  };

  
  const expandOpacity = expandAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });
  const expandScale = expandAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.98, 1],
  });

  return (
    <Animated.View
      style={[
        styles.cardWrapper,
        {
          transform: [{ scale: scaleAnim }],
          width: isLargeScreen ? '60%' : '90%',
        },
      ]}
    >
      <Animated.View
        style={[
          styles.card,
          {
            backgroundColor: currentTheme.card,
            padding: isLargeScreen ? SPACING.xl : SPACING.lg,
            shadowColor: currentTheme.cardShadow || '#000',
            // border color subtle in dark mode
            borderWidth: Platform.OS === 'web' ? 1 : 0,
            borderColor: theme === 'dark' ? 'rgba(255,255,255,0.03)' : 'transparent',
          },
        ]}
      >
        
        <Pressable
          onPress={() => setExpanded(!expanded)}
          onPressIn={onPressInCard}
          onPressOut={onPressOutCard}
          style={{ width: '100%', alignItems: 'center' }}
        >
          <Ionicons
            name="person-circle-outline"
            size={isLargeScreen ? 100 : 80}
            color={currentTheme.text}
          />
          <Text style={[styles.name, { color: currentTheme.text }]}>{item.name}</Text>
          <Text style={[styles.role, { color: currentTheme.text }]}>{item.role}</Text>
        </Pressable>

        
        <Animated.View
          style={{
            opacity: expandOpacity,
            transform: [{ scale: expandScale }],
            marginTop: SPACING.md,
            alignItems: 'center',
            width: '100%',
          }}
          pointerEvents={expanded ? 'auto' : 'none'}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="location-outline" size={16} color={currentTheme.text} />
            <Text style={[styles.location, { color: currentTheme.text }]}>
              {item.location}
            </Text>
          </View>

          <Text style={[styles.bio, { color: currentTheme.text }]}>{item.bio}</Text>
        </Animated.View>

        
        <View style={styles.buttonsRow}>
          {/* Like */}
          <Pressable
            android_ripple={{ color: '#00000010' }}
            style={({ pressed }) => [
              styles.likeButton,
              {
                backgroundColor: pressed ? '#e63946' : liked ? '#e63946' : '#ff6b6b',
                opacity: pressed ? 0.9 : 1,
              },
            ]}
            onPress={() => {
              setLiked(!liked);
              console.log(`${item.name} - Profile Liked!`);
            }}
          >
            <Ionicons name="heart" size={20} color="#fff" />
            <Text style={styles.likeText}>{liked ? 'Liked' : 'Like'}</Text>
          </Pressable>

         
          <Pressable
            android_ripple={{ color: '#00000010' }}
            style={({ pressed }) => [
              styles.followButton,
              {
                backgroundColor: following ? '#1d3557' : '#457b9d',
                opacity: pressed ? 0.85 : 1,
              },
            ]}
            onPress={() => setFollowing(!following)}
          >
            <Ionicons
              name={following ? 'checkmark' : 'person-add'}
              size={20}
              color="#fff"
            />
            <Text style={styles.followText}>
              {following ? 'Following' : 'Follow'}
            </Text>
          </Pressable>
        </View>

        
        <Text
          style={{
            marginTop: SPACING.sm,
            color: currentTheme.text,
            opacity: 0.6,
            fontFamily: FONTS.regular,
            fontSize: 12,
          }}
        >
          {expanded ? 'Tap to collapse ↑' : 'Tap to expand ↓'}
        </Text>
      </Animated.View>
    </Animated.View>
  );
}

export default function ProfileScreen() {
  const [theme, setTheme] = useState('light');
  const currentTheme = COLORS[theme];
  const { width } = useWindowDimensions();
  const isLargeScreen = width > 500;

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.bg, paddingTop: isLargeScreen ? 40 : 20 }]}>
      
      <Pressable onPress={toggleTheme} style={styles.themeToggle}>
        <Ionicons name={theme === 'light' ? 'moon' : 'sunny'} size={26} color={currentTheme.text} />
      </Pressable>

     
      <Text style={[styles.headerTitle, { color: currentTheme.text }]}>Profiles</Text>

      
      <FlatList
        data={PROFILES}
        keyExtractor={(p) => p.id}
        renderItem={({ item }) => <ProfileCard item={item} theme={theme} />}
        contentContainerStyle={{
          alignItems: 'center',
          paddingBottom: 60,
          paddingTop: SPACING.md,
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  themeToggle: {
    position: 'absolute',
    top: 14,
    right: 16,
    zIndex: 20,
    padding: SPACING.sm,
  },

  headerTitle: {
    fontFamily: FONTS.bold,
    fontSize: 28,
    textAlign: 'center',
    marginTop: 18,
  },

  cardWrapper: {
    marginTop: SPACING.md,
    marginBottom: SPACING.md,
    alignItems: 'center',
  },

  card: {
    borderRadius: RADII.md,
    alignItems: 'center',
    // shadow (iOS)
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    // elevation (Android)
    elevation: 6,
  },

  name: {
    fontFamily: FONTS.bold,
    fontSize: 20,
    marginTop: SPACING.md / 2,
  },

  role: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    marginTop: SPACING.sm / 2,
    opacity: 0.85,
  },

  location: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    marginLeft: 6,
  },

  bio: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    marginTop: 8,
    opacity: 0.9,
    textAlign: 'center',
    paddingHorizontal: 6,
  },

  buttonsRow: {
    flexDirection: 'row',
    marginTop: SPACING.md,
    width: '100%',
    justifyContent: 'space-around',
  },

  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    borderRadius: 50,
  },

  likeText: {
    color: '#fff',
    fontFamily: FONTS.bold,
    fontSize: 14,
    marginLeft: SPACING.sm,
  },

  followButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    borderRadius: 50,
  },

  followText: {
    color: '#fff',
    fontFamily: FONTS.bold,
    fontSize: 14,
    marginLeft: SPACING.sm,
  },
});





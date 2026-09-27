import React from 'react';
import { StyleSheet, View, TextInput, Text, Platform } from 'react-native';
import { COLORS } from '../constants/colors';
import { RADIUS, SPACING, FONT_SIZE } from '../constants/layout';

/**
 * SearchBar
 *
 * Controlled text input for searching drinks/shops. Kept controlled
 * (value + onChangeText passed in from the parent) rather than holding
 * its own state, so a parent screen can clear it, prefill it, or react
 * to every keystroke (e.g. live-filtering the menu grid).
 *
 * Props:
 * - value (string, required)
 * - onChangeText (function, required)
 * - placeholder (string, optional)   Defaults to a BrewGo-specific hint.
 * - onSubmit (function, optional)    Fires on the keyboard's "search" action.
 */
export default function SearchBar({
  value,
  onChangeText,
  placeholder = 'Search drinks or shops...',
  onSubmit,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>🔍</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={COLORS.muted}
        returnKeyType="search"
        onSubmitEditing={onSubmit}
        // Android draws its own underline on TextInput by default;
        // removing it keeps the pill shape consistent with iOS.
        underlineColorAndroid="transparent"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.pill,
    paddingHorizontal: SPACING.md,
    height: 44,
  },
  icon: {
    fontSize: FONT_SIZE.md,
    marginRight: SPACING.sm,
  },
  input: {
    flex: 1,
    fontSize: FONT_SIZE.sm,
    color: COLORS.ink,
    // iOS and Android give TextInput different default vertical padding;
    // pinning it to 0 keeps the pill's height identical on both platforms.
    paddingVertical: Platform.select({ ios: 0, android: 0 }),
  },
});

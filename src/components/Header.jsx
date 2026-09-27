import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { COLORS } from '../constants/colors';
import { SPACING, FONT_SIZE, RADIUS } from '../constants/layout';

/**
 * Header
 *
 * App-level header shown at the top of the Home screen: greeting (acts as
 * the "logo" slot for this screen) plus a profile shortcut. A separate,
 * simpler variant with a back button is used on Item Detail / Checkout
 * (see the `showBack` prop) so this one component covers both cases
 * instead of maintaining two near-duplicate headers.
 *
 * Props:
 * - title (string, required)         Main heading, e.g. "Good morning, Alex".
 * - subtitle (string, optional)      Secondary line, e.g. shop name + distance.
 * - onProfilePress (function, opt.)  Tapping the avatar circle.
 * - onBackPress (function, opt.)     Tapping the back chevron.
 * - showBack (bool, optional)        Renders a back button instead of the avatar.
 */
export default function Header({ title, subtitle, onProfilePress, onBackPress, showBack = false }) {
  return (
    <View style={styles.container}>
      {showBack ? (
        <TouchableOpacity style={styles.iconCircle} onPress={onBackPress} hitSlop={8}>
          <Text style={styles.backGlyph}>‹</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.textBlock}>
          <Text style={styles.title}>{title}</Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>
      )}

      {showBack ? (
        <Text style={styles.titleCentered}>{title}</Text>
      ) : (
        <TouchableOpacity style={styles.avatar} onPress={onProfilePress} hitSlop={8}>
          <Text style={styles.avatarGlyph}>👤</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.md,
    // Platform.select: Android needs an explicit top inset because it has
    // no safe-area concept baked into plain Views the way iOS does;
    // StatusBar.currentHeight is undefined on iOS, so this only adds
    // padding where it's actually needed.
    paddingTop: Platform.select({
      ios: SPACING.md,
      android: (StatusBar.currentHeight || 0) + SPACING.md,
    }),
  },
  textBlock: {
    flexShrink: 1,
  },
  title: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '700',
    color: COLORS.ink,
  },
  titleCentered: {
    flex: 1,
    textAlign: 'center',
    fontSize: FONT_SIZE.lg,
    fontWeight: '700',
    color: COLORS.ink,
  },
  subtitle: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.muted,
    marginTop: 2,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.cardAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarGlyph: {
    fontSize: FONT_SIZE.md,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backGlyph: {
    fontSize: FONT_SIZE.lg,
    color: COLORS.ink,
  },
});

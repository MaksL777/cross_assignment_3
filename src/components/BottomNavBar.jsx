import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform, useWindowDimensions } from 'react-native';
import { COLORS } from '../constants/colors';
import { RADIUS, SPACING, FONT_SIZE, BREAKPOINT_TABLET } from '../constants/layout';

const TABS = [
  { key: 'home', label: 'Home', glyph: '🏠' },
  { key: 'menu', label: 'Menu', glyph: '▦' },
  { key: 'orders', label: 'Orders', glyph: '🛍' },
  { key: 'profile', label: 'Profile', glyph: '👤' },
];

/**
 * BottomNavBar
 *
 * Primary app navigation. On a phone-width screen this renders as a
 * fixed bottom bar; on a tablet-width screen (>= BREAKPOINT_TABLET) it
 * switches to a left-side rail instead — mirroring the "large screen
 * variant" layout from the cross_assignment_2 Figma design, where the
 * same 4 destinations move from the bottom to a side rail rather than
 * being redesigned. `useWindowDimensions` (not the static `Dimensions`
 * API) is used so the switch also happens live on device rotation,
 * without needing an event listener + manual re-render.
 *
 * Props:
 * - activeTab (string, required)      One of TABS[].key.
 * - onTabPress (function, required)   Called with the pressed tab's key.
 */
export default function BottomNavBar({ activeTab, onTabPress }) {
  const { width } = useWindowDimensions();
  const isWide = width >= BREAKPOINT_TABLET;

  return (
    <View style={isWide ? styles.rail : styles.bar}>
      {TABS.map((tab) => {
        const active = tab.key === activeTab;
        return (
          <TouchableOpacity
            key={tab.key}
            style={[
              isWide ? styles.railItem : styles.barItem,
              active && (isWide ? styles.railItemActive : null),
            ]}
            onPress={() => onTabPress(tab.key)}
          >
            <Text style={[styles.glyph, active && styles.glyphActive]}>{tab.glyph}</Text>
            <Text style={[styles.label, active && styles.labelActive]}>{tab.label}</Text>
            {active && !isWide ? <View style={styles.dot} /> : null}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    marginHorizontal: SPACING.lg,
    paddingTop: SPACING.sm,
    // Platform.select: iOS phones with a home indicator need extra bottom
    // padding so the bar doesn't sit under the gesture area; Android's
    // gesture bar is thinner and handled by the OS, so it needs less.
    paddingBottom: Platform.select({ ios: SPACING.md, android: SPACING.sm }),
  },
  barItem: {
    flex: 1,
    alignItems: 'center',
  },
  rail: {
    width: 76,
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    paddingVertical: SPACING.lg,
    alignItems: 'center',
  },
  railItem: {
    alignItems: 'center',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.sm,
    borderRadius: RADIUS.md,
    width: '86%',
    marginBottom: SPACING.md,
  },
  railItemActive: {
    backgroundColor: COLORS.cardAlt,
  },
  glyph: {
    fontSize: FONT_SIZE.lg,
    color: COLORS.muted,
    marginBottom: 2,
  },
  glyphActive: {
    color: COLORS.brown,
  },
  label: {
    fontSize: 11,
    color: COLORS.muted,
  },
  labelActive: {
    color: COLORS.brown,
    fontWeight: '700',
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.brown,
    marginTop: 3,
  },
});

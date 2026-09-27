import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants/colors';
import { RADIUS, SPACING, FONT_SIZE } from '../constants/layout';

/**
 * QuantityStepper
 *
 * Minus / value / plus control, used for cart quantity and for
 * customization counts (e.g. "extra shots"). Bounds checking (min/max)
 * lives here so every screen that uses it gets the same guard for free
 * instead of re-implementing it at each call site.
 *
 * Props:
 * - value (number, required)
 * - onChange (function, required)   Called with the new value.
 * - min (number, optional)          Defaults to 0.
 * - max (number, optional)          Defaults to 99.
 */
export default function QuantityStepper({ value, onChange, min = 0, max = 99 }) {
  const decrease = () => onChange(Math.max(min, value - 1));
  const increase = () => onChange(Math.min(max, value + 1));

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={decrease}
        disabled={value <= min}
      >
        <Text style={[styles.glyph, value <= min && styles.glyphDisabled]}>−</Text>
      </TouchableOpacity>

      <Text style={styles.value}>{value}</Text>

      <TouchableOpacity
        style={[styles.button, styles.buttonFilled]}
        onPress={increase}
        disabled={value >= max}
      >
        <Text style={[styles.glyph, styles.glyphFilled]}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    width: 28,
    height: 28,
    borderRadius: RADIUS.pill,
    borderWidth: 1,
    borderColor: COLORS.line,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonFilled: {
    backgroundColor: COLORS.brown,
    borderColor: COLORS.brown,
  },
  value: {
    minWidth: 28,
    textAlign: 'center',
    marginHorizontal: SPACING.sm,
    fontSize: FONT_SIZE.sm,
    fontWeight: '700',
    color: COLORS.ink,
  },
  glyph: {
    fontSize: FONT_SIZE.md,
    color: COLORS.ink,
    lineHeight: FONT_SIZE.md,
  },
  glyphFilled: {
    color: COLORS.white,
  },
  glyphDisabled: {
    color: COLORS.line,
  },
});

import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Platform } from 'react-native';
import { COLORS } from '../constants/colors';
import { RADIUS, SPACING, FONT_SIZE } from '../constants/layout';

/**
 * ProductCard
 *
 * Represents one menu item: photo, name, price, rating and a quick
 * add-to-cart button. Used both in the 2-column Home/Menu grid and could
 * be reused at full width in a list — width is controlled entirely by
 * the parent (via the `style` prop), the card never assumes a fixed size,
 * which is what lets the same component serve a 2-column phone grid and
 * a 3-column tablet grid without any internal changes.
 *
 * Props:
 * - name (string, required)
 * - price (number, required)          Numeric price; formatting happens here
 *                                      so callers never hand-format currency strings.
 * - imageUrl (string, optional)       Remote image URL. Falls back to a plain
 *                                      caramel placeholder block when omitted
 *                                      (keeps the component usable before real
 *                                      product photography exists).
 * - rating (number, optional)         0–5 rating, rendered as stars.
 * - onAddPress (function, optional)   Called when the add (+) button is tapped.
 * - onPress (function, optional)      Called when the card itself is tapped
 *                                      (e.g. navigate to item detail).
 * - style (object, optional)          Layout overrides from the parent (width, margins).
 */
export default function ProductCard({
  name,
  price,
  imageUrl,
  rating = 0,
  onAddPress,
  onPress,
  style,
}) {
  return (
    <TouchableOpacity
      style={[styles.card, style]}
      activeOpacity={0.85}
      onPress={onPress}
      disabled={!onPress}
    >
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />
      ) : (
        <View style={styles.imagePlaceholder}>
          <Text style={styles.imagePlaceholderGlyph}>☕</Text>
        </View>
      )}

      <Text style={styles.name} numberOfLines={1}>
        {name}
      </Text>

      <View style={styles.row}>
        <Text style={styles.price}>${price.toFixed(2)}</Text>
        {rating > 0 && <Stars rating={rating} />}
      </View>

      <TouchableOpacity
        style={styles.addButton}
        onPress={onAddPress}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <Text style={styles.addButtonGlyph}>+</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

/** Small internal helper — renders up to 5 stars, filled up to `rating`. */
function Stars({ rating }) {
  const full = Math.round(rating);
  return (
    <Text style={styles.stars}>
      {'★'.repeat(full)}
      {'☆'.repeat(5 - full)}
    </Text>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.md,
    padding: SPACING.sm,
    // Cards sit in a grid with wrapping, so margin (not width) is defined
    // here; the parent list decides actual width via `style`.
    marginBottom: SPACING.md,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 3,
      },
      android: { elevation: 1 },
    }),
  },
  image: {
    width: '100%',
    aspectRatio: 1.4,
    borderRadius: RADIUS.sm,
    marginBottom: SPACING.sm,
  },
  imagePlaceholder: {
    width: '100%',
    aspectRatio: 1.4,
    borderRadius: RADIUS.sm,
    marginBottom: SPACING.sm,
    backgroundColor: COLORS.caramel,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagePlaceholderGlyph: {
    fontSize: FONT_SIZE.xl,
  },
  name: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '700',
    color: COLORS.ink,
    marginBottom: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.muted,
  },
  stars: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.caramel,
  },
  addButton: {
    position: 'absolute',
    right: SPACING.sm,
    bottom: SPACING.sm,
    width: 28,
    height: 28,
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.brown,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonGlyph: {
    color: COLORS.white,
    fontSize: FONT_SIZE.md,
    fontWeight: '700',
    lineHeight: FONT_SIZE.md,
  },
});

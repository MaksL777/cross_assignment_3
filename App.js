import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, View, FlatList, useWindowDimensions } from 'react-native';

import Header from './src/components/Header';
import SearchBar from './src/components/SearchBar';
import CategoryList from './src/components/CategoryList';
import ProductCard from './src/components/ProductCard';
import CustomButton from './src/components/CustomButton';
import QuantityStepper from './src/components/QuantityStepper';
import BottomNavBar from './src/components/BottomNavBar';

import { COLORS } from './src/constants/colors';
import { SPACING, BREAKPOINT_TABLET } from './src/constants/layout';

const CATEGORIES = ['All', 'Coffee', 'Tea', 'Cold Brew', 'Pastry'];

// Static placeholder data — in the real app this would come from an API,
// but the components themselves don't care where it comes from since
// everything is passed in as props.
const PRODUCTS = [
  { id: '1', name: 'Caramel Oat Latte', price: 4.75, rating: 5 },
  { id: '2', name: 'Cold Brew', price: 3.95, rating: 4 },
  { id: '3', name: 'Cappuccino', price: 3.75, rating: 4 },
  { id: '4', name: 'Croissant', price: 2.5, rating: 5 },
  { id: '5', name: 'Flat White', price: 4.1, rating: 4 },
  { id: '6', name: 'Chai Latte', price: 4.25, rating: 3 },
];

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('home');
  const [qty, setQty] = useState(1);

  // Responsiveness (task 3): useWindowDimensions re-renders this screen
  // automatically on rotation/resize, unlike the static Dimensions.get()
  // snapshot. Column count — and therefore card width — is derived from
  // the *current* width every render, so portrait vs landscape and
  // phone vs tablet all "just work" without separate layout code paths.
  const { width } = useWindowDimensions();
  const isWide = width >= BREAKPOINT_TABLET;
  const numColumns = isWide ? 3 : 2;
  const gridPadding = SPACING.lg;
  const gridGap = SPACING.md;
  const cardWidth = (width - gridPadding * 2 - gridGap * (numColumns - 1)) / numColumns;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={isWide ? styles.rowLayout : styles.columnLayout}>
        {isWide && (
          <BottomNavBar activeTab={activeTab} onTabPress={setActiveTab} />
        )}

        <View style={styles.content}>
          <Header
            title="Good morning, Alex"
            subtitle="Riverside Roasters · 0.3 mi"
            onProfilePress={() => setActiveTab('profile')}
          />

          <View style={styles.section}>
            <SearchBar value={search} onChangeText={setSearch} />
          </View>

          {/* No horizontal padding on this wrapper — CategoryList applies
              its own via contentContainerStyle so its chips can scroll
              flush to the screen edge. */}
          <View style={styles.sectionNoPadding}>
            <CategoryList
              categories={CATEGORIES}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </View>

          {/* Small standalone example of CustomButton + QuantityStepper,
              matching the "Add to cart" row from the Item Detail screen. */}
          <View style={[styles.section, styles.demoRow]}>
            <QuantityStepper value={qty} onChange={setQty} min={1} />
            <CustomButton
              title={`Add to cart — $${(4.75 * qty).toFixed(2)}`}
              icon="🛒"
              onPress={() => {}}
              style={styles.demoButton}
            />
          </View>

          {/* key={numColumns} forces FlatList to re-lay-out its internal
              grid when the column count changes (e.g. rotating the
              device) — FlatList does not support changing numColumns on
              the fly otherwise. */}
          <FlatList
            key={numColumns}
            data={PRODUCTS.filter(
              (p) => selectedCategory === 'All' || selectedCategory === 'Coffee'
            )}
            keyExtractor={(item) => item.id}
            numColumns={numColumns}
            contentContainerStyle={styles.grid}
            columnWrapperStyle={numColumns > 1 ? { gap: gridGap } : undefined}
            renderItem={({ item }) => (
              <ProductCard
                name={item.name}
                price={item.price}
                rating={item.rating}
                style={{ width: cardWidth }}
                onAddPress={() => {}}
              />
            )}
          />
        </View>
      </View>

      {!isWide && <BottomNavBar activeTab={activeTab} onTabPress={setActiveTab} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  columnLayout: {
    flex: 1,
  },
  rowLayout: {
    flex: 1,
    flexDirection: 'row',
  },
  content: {
    flex: 1,
  },
  section: {
    marginBottom: SPACING.lg,
    paddingHorizontal: SPACING.lg,
  },
  sectionNoPadding: {
    marginBottom: SPACING.lg,
  },
  demoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  demoButton: {
    flexShrink: 1,
    marginLeft: SPACING.md,
  },
  grid: {
    paddingHorizontal: SPACING.lg,
  },
});

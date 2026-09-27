# BrewGo — React Native components (cross_assignment_3)

Seven reusable UI components implementing the BrewGo design from
`cross_assignment_2`, plus a demo `App.js` that wires them together into
a working (if data-mocked) Home screen.

## Components

| Component | File | What it is |
|---|---|---|
| `CustomButton` | `src/components/CustomButton.jsx` | Primary/outline button with an optional leading icon glyph (e.g. "Add to cart 🛒"). |
| `ProductCard` | `src/components/ProductCard.jsx` | Menu item card: image (or placeholder), name, price, star rating, add button. |
| `Header` | `src/components/Header.jsx` | Top bar — greeting + avatar on Home, or back button + centered title on detail screens. |
| `SearchBar` | `src/components/SearchBar.jsx` | Controlled search input with a hint placeholder and search glyph. |
| `CategoryList` | `src/components/CategoryList.jsx` | Horizontally-scrolling filter chips (`FlatList horizontal`). |
| `QuantityStepper` | `src/components/QuantityStepper.jsx` | −/value/+ control with min/max bounds, used for cart quantity and drink customization. |
| `BottomNavBar` | `src/components/BottomNavBar.jsx` | 4-tab navigation; becomes a left side rail on wide screens (see Responsiveness). |

Shared constants live in `src/constants/colors.js` and
`src/constants/layout.js` so no component hardcodes a hex color or a
magic spacing number directly.

## Design reference

`assets/screenshots/` contains the high-fidelity Figma screens from
`cross_assignment_2` that these components implement — `hifi_01_home.png`,
`hifi_02_menu.png`, `hifi_03_item_detail.png`, `hifi_04_checkout.png`,
and the large-screen variant `hifi_05_tablet_home.png`.

**Note on screenshots:** this project was written in an environment
without a mobile simulator, so the images above are the Figma design
reference the components were built to match, not on-device captures.
Before submitting, run the app with `npx expo start` (see below), open
it in Expo Go or a simulator, and add real screenshots of the rendered
`App.js` screen alongside these — that's what the mentor will want to
see next to the code.

## Running it

```bash
npm install
npx expo start
```

Then press `i` (iOS simulator), `a` (Android emulator), or scan the QR
code with Expo Go on a physical device.

## Styling approach (task 2)

- Every style is defined with `StyleSheet.create()` — no inline style
  objects.
- Layout is Flexbox throughout (`flexDirection`, `justifyContent`,
  `alignItems`, `gap`); nothing uses absolute positioning except the
  small "+" badge on `ProductCard`, which is intentionally pinned to a
  corner.
- `Platform.select()` is used wherever iOS and Android need genuinely
  different values, not just for the sake of using it:
  - `CustomButton` / `ProductCard`: `shadow*` props on iOS vs.
    `elevation` on Android (iOS ignores `elevation`; Android ignores
    `shadow*` on most Views).
  - `Header`: extra top padding on Android using `StatusBar.currentHeight`,
    since Android has no automatic safe-area inset the way iOS does.
  - `BottomNavBar`: slightly larger bottom padding on iOS to clear the
    home-indicator gesture area.

## Adaptivity (task 3)

- `BottomNavBar` and `App.js` both use **`useWindowDimensions`** (not the
  static `Dimensions.get('window')`) specifically so that rotating the
  device or resizing the window (web/tablet split-screen) triggers a
  re-render with the new width — no manual event listeners needed.
- `App.js` derives `numColumns` (2 on phones, 3 at ≥600px width) and each
  card's pixel width from the *current* window width every render, so
  the product grid reflows correctly in both portrait and landscape.
- At the same ≥600px breakpoint, `BottomNavBar` switches from a bottom
  bar to a left-side rail — the same 4 destinations and icons, just
  repositioned — matching the tablet variant from the Figma design
  instead of being a separate, redesigned component.
- `key={numColumns}` is passed to the `FlatList` in `App.js` because
  React Native's `FlatList` does not support changing `numColumns` on an
  already-mounted list; remounting it on column-count change is the
  documented workaround.

## Architecture (task 4)

- One component per file, each exported as a default export.
- All dynamic data (title, price, image, callbacks) is passed via props —
  no component reads global/mock data directly, which is what lets the
  same `ProductCard` render six different products in `App.js`.
- No magic numbers: colors come from `COLORS`, spacing/radius/font sizes
  from `SPACING` / `RADIUS` / `FONT_SIZE` / `BREAKPOINT_TABLET` in
  `src/constants/`.
- Non-obvious decisions are called out with inline comments at the
  point they matter (see `Platform.select` blocks and the `FlatList`
  `key` prop above) rather than only in this README.

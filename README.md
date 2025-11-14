## Andricas – Event Discovery App (Work in Progress)

This repo is a **work-in-progress mobile app** built with **React Native + TypeScript** where I experiment with product-oriented features and real-world app architecture.

The current version already includes:

- **Event feed (HomeScreen)** with:
  - Search by **title or city** using memoized derived data (`useMemo`)
  - Client-side **filtering** via a dedicated `Filters` component and selector (`selectFilteredEvents`)
  - **FlatList** with proper keying, empty state, and pull-to-refresh (`RefreshControl`)
- **Event details flow**
  - `EventDetailsScreen` showing full event information
  - Typed navigation with `@react-navigation/native-stack` and `HomeStackParamList`
- **Create & manage events**
  - `CreateEventScreen` wired to Redux via `eventsSlice`
  - Mock data layer (`mockEvents`) to simulate a backend while iterating on UX and state shape
- **Authentication & profiles**
  - `LoginScreen` / `RegisterScreen` set up with **Firebase Authentication**
  - `ProfileScreen` accessible from the Home screen, prepared for user-specific data
- **State management & architecture**
  - Centralized store (`redux/store`) with typed `RootState` and `AppDispatch`
  - Feature-based slices (e.g. `eventsSlice`) and selectors for separation of concerns
  - Config / navigation / screens separated under `src/` for scalable structure

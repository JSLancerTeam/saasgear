import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '@/features/rootReducer';

const store = configureStore({
  reducer: rootReducer,
});

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('../features/rootReducer', () => {
    const newRootReducer = rootReducer;
    store.replaceReducer(newRootReducer);
  });
}

export default store;

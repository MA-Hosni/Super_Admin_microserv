import { configureStore } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import rootReducer from './reducer/index';
import { persistStore } from 'redux-persist';
import { TypedUseSelectorHook } from 'react-redux';

const persistConfig = {
    key: 'root',
    storage : storage,

};

const persistedReducer = persistReducer<any, any>(persistConfig, rootReducer);

// Automatically adds the thunk middleware and the Redux DevTools extension
const store = configureStore({
    reducer: persistedReducer,
    
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
        devTools: true,
        //redux thunk
        
        
});

const persistore = persistStore(store);

export { store, persistore };
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
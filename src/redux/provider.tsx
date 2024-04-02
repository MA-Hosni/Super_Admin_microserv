'use client'

import { store, persistore } from "../redux/store";


import { Provider as ReduxProvider, useDispatch, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";





const StoreProvider = ({ children }: { children: React.ReactNode }) => { 
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistore}>
   
        {children}



      </PersistGate>
    </ReduxProvider>

  )
}

export default StoreProvider
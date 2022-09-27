/**
 * 自定义管理状态hook
 */
import React from 'react';
import storeOther from './storeOther';

const StoreContext = React.createContext({
  storeOther: new storeOther(),
});

export const useStores = () => React.useContext(StoreContext);

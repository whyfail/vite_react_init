import { create } from 'zustand';

const useStoreSystem = create(set => ({
  systemMenuFull: true,
  setSystemMenuFull: val => set(() => ({ systemMenuFull: val })),
}));

export default useStoreSystem;

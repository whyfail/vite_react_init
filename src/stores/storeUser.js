import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const useStoreUser = create(
  devtools(
    persist(
      set => ({
        userNumber: 0,
        userInfo: {
          name: '小磊同学',
          age: 18,
        },
        setUserNumber: val => set(() => ({ userNumber: val })),
      }),
      { name: 'user-storage' }, // localStorage key
    ),
    { name: 'UserStore' }, // DevTools 中显示的名称
  ),
);

export default useStoreUser;

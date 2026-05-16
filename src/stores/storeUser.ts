import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface UserInfo {
  name: string
  age: number
}

export interface UserStore {
  userNumber: number
  userInfo: UserInfo
  setUserNumber: (val: number) => void
}

const useStoreUser = create<UserStore>()(
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

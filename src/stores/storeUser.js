import { create } from 'zustand';

const useStoreUser = create(set => ({
  userNumber: 0,
  userInfo: {
    name: '小磊同学',
    age: 18,
  },
  setUserNumber: val => set(() => ({ userNumber: val })),
}));

export default useStoreUser;

import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set) => ({
      user: null, // 전체 유저 객체 저장
      userId: null,
      nickname: null,
      level: null,

      // 저장 메서드
      setUser: (userData) =>
        set({
          user: userData,
          userId: userData.memberId,
          nickname: userData.nickname,
          level: userData.level,
        }),

      // 초기화 메서드
      clearUser: () =>
        set({
          user: null,
          userId: null,
          nickname: null,
          level: null,
        }),
    }),
    {
      name: "user-storage", // localStorage key
    }
  )
);

export default useUserStore;

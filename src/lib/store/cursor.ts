import { create } from "zustand";

interface CursorStore {
  isHoveringCanvas: boolean;
  setHoveringCanvas: (hovering: boolean) => void;
}

export const useCursorStore = create<CursorStore>((set) => ({
  isHoveringCanvas: false,
  setHoveringCanvas: (hovering) => set({ isHoveringCanvas: hovering }),
}));

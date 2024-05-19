import { create } from "zustand";

interface ITypeChoiceProps {
  selectedChoice: string | null;
  selectedTimeId: number[] | null;
  setSelectedTimeId: (value: number[] | null) => void;
  setSelectedChoice: (value: string | null) => void;
  fineshedSchedule: boolean;
  setFineshedSchedule: (value: boolean) => void;
  confirmBox: boolean;
  setConfirmBox: (value: boolean) => void;
  isConfirmed: boolean;
  setConfirmed: (value: boolean) => void;
}
// Defina o store usando o Zustand
const useChoiceStore = create<ITypeChoiceProps>((set) => ({
  selectedTimeId: null,
  selectedChoice: null,
  fineshedSchedule: false,
  confirmBox: false,
  isConfirmed: false,
  setConfirmed: (value: boolean) => set({ isConfirmed: value }),
  setConfirmBox: (value: boolean) => set({ confirmBox: value }),
  setFineshedSchedule: (value: boolean) => set({ fineshedSchedule: value }),
  setSelectedTimeId: (value: number[] | null) => set({ selectedTimeId: value }),
  setSelectedChoice: (value: string | null) => set({ selectedChoice: value }),
}));

export default useChoiceStore;


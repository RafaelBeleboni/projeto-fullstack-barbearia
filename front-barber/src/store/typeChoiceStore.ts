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
  selectedTime: string;
  setSelectedTime: (value: string) => void;
  selectedDay: Date | null;
  setSelectedDay: (value: Date | null) => void;
}
// Defina o store usando o Zustand
const useChoiceStore = create<ITypeChoiceProps>((set) => ({
  selectedTimeId: null,
  selectedChoice: null,
  fineshedSchedule: false,
  confirmBox: false,
  isConfirmed: false,
  selectedTime: "",
  selectedDay: null,
  setSelectedDay: (value: Date | null) => set({ selectedDay: value }),
  setSelectedTime: (value: string) => set({ selectedTime: value }),
  setConfirmed: (value: boolean) => set({ isConfirmed: value }),
  setConfirmBox: (value: boolean) => set({ confirmBox: value }),
  setFineshedSchedule: (value: boolean) => set({ fineshedSchedule: value }),
  setSelectedTimeId: (value: number[] | null) => set({ selectedTimeId: value }),
  setSelectedChoice: (value: string | null) => set({ selectedChoice: value }),
}));

export default useChoiceStore;


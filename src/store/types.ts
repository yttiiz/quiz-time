import { NavbarItemType } from "@/components/types";

export type SetterType<T extends unknown = string> = (value: T) => void;

export type HeaderAppStateType = {
  items: NavbarItemType[];
  setItems: SetterType<NavbarItemType[]>;
};
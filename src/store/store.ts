import { create, UseBoundStore, StoreApi } from "zustand";
import { HeaderAppStateType, UserDataAppStateType } from "./mod";
import { NavbarItemType } from "@/components/types";

export const useHeaderStore = create<HeaderAppStateType>((set) => ({
	items: [],
	setItems: (items: NavbarItemType[]) => set({ items }),
}));

export const useUserDataForm = create<UserDataAppStateType>((set) => ({
	email: "",
	setEmail: (email: string) => set({ email }),
	password: "",
	setPassword: (password: string) => set({ password }),
}));

/**
 * Returns a `login` store of elements according to the given arguments.
 * @param args key of `LoginAppState`
 */
export const store = <T>(
	hook: UseBoundStore<StoreApi<T>>,
	...args: (keyof T)[]
) => {
	const store = [];
	for (const arg of args) {
		store.push(hook((state) => state[arg]));
	}
	return store;
};
import { create, UseBoundStore, StoreApi } from "zustand";
import {
	DisplayDialogFieldAppStateType,
	HeaderAppStateType,
	UserDataAppStateType,
	UserDetailsAppStateType,
} from "./mod";
import { ItemType } from "@/components/mod";
import { UserType } from "@/services/mod";

export const useHeaderStore = create<HeaderAppStateType>((set) => ({
	items: [],
	setItems: (items: ItemType[]) => set({ items }),
}));

export const useUserDataStore = create<UserDataAppStateType>((set) => ({
	firstname: "",
	setFirstname: (firstname: string) => set({ firstname }),
}));

export const useUserDetailsStore = create<UserDetailsAppStateType>((set) => ({
	user: {} as UserType,
	setUser: (user: UserType) => set({ user }),
}));

export const useDialogFieldDisplayStore =
	create<DisplayDialogFieldAppStateType>((set) => ({
		isFieldDisplay: true,
		setIsFieldDisplay: (isFieldDisplay: boolean) => set({ isFieldDisplay }),
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
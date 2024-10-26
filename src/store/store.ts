import { create, UseBoundStore, StoreApi } from "zustand";
import {
	DisplayDialogFieldAppStateType,
	HeaderAppStateType,
	UserDetailsAppStateType,
	UserSessionAppStateType,
} from "./mod";
import { ItemType } from "@/components/mod";
import { UserType } from "@/services/mod";
import { Session } from "next-auth";

export const useHeaderStore = create<HeaderAppStateType>((set) => ({
	items: [],
	setItems: (items: ItemType[]) => set({ items }),
}));

export const useUserSession = create<UserSessionAppStateType>((set) => ({
	session: null,
	setSession: (session: Session) => set({ session }),
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
import { ItemType } from "@/components/mod";
import { UserType } from "@/services/mod";

export type SetterType<T extends unknown = string> = (value: T) => void;

export type HeaderAppStateType = {
	items: ItemType[];
	setItems: SetterType<ItemType[]>;
};

export type UserDataAppStateType = {
	firstname: string;
	setFirstname: SetterType<string>;
};

export type UserDetailsAppStateType = {
	user: UserType;
	setUser: SetterType<UserType>;
}

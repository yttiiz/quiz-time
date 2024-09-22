import { ItemType } from "@/components/mod";

export type SetterType<T extends unknown = string> = (value: T) => void;

export type HeaderAppStateType = {
	items: ItemType[];
	setItems: SetterType<ItemType[]>;
};

export type UserDataAppStateType = {
	firstname: string;
	setFirstname: SetterType<string>;
};

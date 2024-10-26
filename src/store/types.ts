import { ItemType } from "@/components/mod";
import { UserType } from "@/services/mod";
import { Session } from "next-auth";

export type SetterType<T extends unknown = string> = (value: T) => void;

export type HeaderAppStateType = {
	items: ItemType[];
	setItems: SetterType<ItemType[]>;
};

export type UserDetailsAppStateType = {
	user: UserType;
	setUser: SetterType<UserType>;
};

export type DisplayDialogFieldAppStateType = {
	isFieldDisplay: boolean;
	setIsFieldDisplay: SetterType<boolean>;
};

export type UserSessionAppStateType = {
	session: Session | null;
	setSession: SetterType<Session>;
}
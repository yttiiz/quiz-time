"use client";

import { InputPropsType } from "../mod";

export const Input = ({
	value,
	type,
	label,
	name,
	required = false,
	leadingIcon,
	trailingIcon,
	feedbackMessage,
	onClickPasswordButton,
	onInput,
}: InputPropsType) => {
	return (
		<div className="grid gap-4">
			<label>
				{required ? `${label} *` : label}
				<div>
					{leadingIcon ? leadingIcon : null}
					<input
						type={type}
						value={value}
						name={name}
						onInput={onInput}
					/>
					{trailingIcon ? (
						name?.includes("password") ? (
							<button
								type="button"
								onClick={onClickPasswordButton}
							>
								{trailingIcon}
							</button>
						) : (
							trailingIcon
						)
					) : null}
				</div>
			</label>
			<span className="text-[#ff0000]">
				{feedbackMessage ? feedbackMessage : ""}
			</span>
		</div>
	);
};

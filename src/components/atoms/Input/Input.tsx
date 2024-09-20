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
	onClickPasswordButton,
	onInput,
}: InputPropsType) => {
	return (
		<div>
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
						name === "password" ? (
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
		</div>
	);
};

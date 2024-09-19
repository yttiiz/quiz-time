import { InputPropsType } from "../mod";

export const Input = ({
	value,
	type,
	label,
	name,
	required,
	leadingIcon,
	trailingIcon,
	onInput,
}: InputPropsType) => {
	return (
		<div>
			<label>
				{required ? `${label}*` : label}
				<div>
					{leadingIcon ? leadingIcon : null}
					<input
						type={type}
						value={value}
						name={name}
						onInput={onInput}
          />
          {trailingIcon ? trailingIcon : null}
				</div>
			</label>
		</div>
	);
};

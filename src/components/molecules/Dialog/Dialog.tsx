export const Dialog = ({
	header,
	main,
	footer,
}: {
	header: Record<string, string>;
	main: Record<string, string>;
	footer?: Record<string, string>;
}) => {
	return (
		<dialog>
			<header>{header.title}</header>
			<div>{main.textContent}</div>
			<footer>Footer</footer>
		</dialog>
	);
};

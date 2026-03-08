import "./Button.css";

export default function Button({ label, onClick, small, color }: { label: string, onClick?: () => void, small?: boolean, color?: string }) {
  return (
	<button className={"blob-button" + (small ? " blob-button-small" : "")} onClick={onClick} style={{ backgroundColor: color }}>
	  {label}
	</button>
  );
}
import { Link } from "@remix-run/react";

export default function Index() {
	return (
		<div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
			<h1>Cars Service Example App</h1>

			<nav>
				<Link to="/list">List</Link>{" "}
				<Link to="/details">Details</Link>{" "}
				<Link to="/settings">Settings</Link>
			</nav>
		</div>
	);
}

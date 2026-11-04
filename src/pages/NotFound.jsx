import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main className="container">
      <h1>404</h1>
      <h2>Page not found</h2>
      <Link to="/">Back to Home</Link>
    </main>
  );
}

export default NotFound;
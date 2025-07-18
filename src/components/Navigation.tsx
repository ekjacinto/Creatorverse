import { Link } from "react-router";

export default function Navigation() {
  return (
    <div className="navigation-header">
      <h1>CREATORVERSE</h1>
      <div id="nav-buttons">
        <Link to="/">
          <button>VIEW ALL CREATORS</button>
        </Link>
        <Link to="/add">
          <button>ADD A CREATOR</button>
        </Link>
      </div>
    </div>
  );
}

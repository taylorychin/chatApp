import { Link } from "react-router-dom";
import * as userService from '../../utilities/users-service';
import "./NavBar.css";

// Not destructuring props this time
export default function NavBar(props) {
  function handleLogOut() {
    userService.logOut();
    props.setUser(null);
  }

  return (
    <nav>
      <Link className="nav-link" to="/channels">Channel List</Link>
      &nbsp; | &nbsp;
      <Link className="nav-link" to="/channels/new">New Channel</Link>
      &nbsp;&nbsp;<span className="nav-span">Welcome, {props.user.name}</span>
      &nbsp;&nbsp;<Link className="nav-link" onClick={handleLogOut} to="">Log Out</Link>
    </nav>
  );
}
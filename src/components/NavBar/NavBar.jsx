import { Link } from "react-router-dom";
import * as userService from '../../utilities/users-service';

// Not destructuring props this time
export default function NavBar(props) {
  function handleLogOut() {
    userService.logOut();
    props.setUser(null);
  }

  return (
    <nav>
      <Link to="/channels">Channel List</Link>
      &nbsp; | &nbsp;
      <Link to="/channels/new">New Channel</Link>
      &nbsp;&nbsp;<span>Welcome, {props.user.name}</span>
      &nbsp;&nbsp;<Link onClick={handleLogOut} to="">Log Out</Link>
    </nav>
  );
}
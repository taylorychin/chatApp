import { Link } from "react-router-dom";
import * as userService from "../../utilities/users-service"

export default function NavBar(props) {

    function handleLogOut() {
        userService.LogOut();
        props.setUser(null);
    }

    return (
        <nav>
            <Link to="/orders/new"> New Order </Link>
            &nbsp; | &nbsp;
            <Link to="/orders"> Order History </Link>
            &nbsp; | &nbsp;
            <span>Welcome,</span>
            &nbsp; | &nbsp;
            <Link onClick={handleLogOut} to=""> Logout </Link>
        </nav>
    );
}

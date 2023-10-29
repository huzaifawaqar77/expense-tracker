import { Link } from "react-router-dom";
import Styles from "./Navbar.module.css";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";

const Navbar = () => {
  const { logout, isPending } = useLogout();
  const { user } = useAuthContext();

  return (
    <div className={Styles.navigation}>
      <nav>
        <h1>Expense Tracker</h1>

        {!user && (
          <>
            <Link className={Styles.login} to="/login">
              Login
            </Link>
            <Link className={Styles.signup} to="/signup">
              Signup
            </Link>
          </>
        )}

        {user && (
          <>
            <p style={{ marginLeft: "auto" }}>Hello! {user.displayName}</p>
            <button disabled={isPending} onClick={logout} className="btn">
              {isPending ? "Logging out..." : "Logout"}
            </button>
          </>
        )}
      </nav>
    </div>
  );
};

export default Navbar;

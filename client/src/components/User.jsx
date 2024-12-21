import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/userSlice";
import styles from "./User.module.css";

function User() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleClick() {
    dispatch(logout());
    navigate("/");
  }

  return (
    <div className={styles.user}>
      <img src={user.avatar} alt={user.userName} />
      <span>Welcome, {user.userName}</span>
      <button onClick={handleClick}>Logout</button>
    </div>
  );
}

export default User;

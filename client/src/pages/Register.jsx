import PageNav from "../components/PageNav";
import styles from "./Login.module.css";
import Button from "../components/Button";
import { Link } from "react-router-dom";

function Register() {
  const handleSubmit = (e) => {};
  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">User Name</label>
          <input type="text" id="userName" placeholder="User Name" />
        </div>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input type="email" id="email" placeholder="Email" />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Password" />
        </div>
        <p className={styles.text}>
          Already have an accaunt?
          <Link className={styles.link} to="/login">
            Login
          </Link>
        </p>
        <div>
          <Button type={"primary"}>Register</Button>
        </div>
      </form>
    </main>
  );
}

export default Register;

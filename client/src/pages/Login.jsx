import axios from "axios";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../components/Button";
import PageNav from "../components/PageNav";
import styles from "./Login.module.css";

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const userData = {
        email: formData.get("email"),
        password: formData.get("password"),
      };

      const response = await axios.post("/api/users/login", userData);
      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem("token", response.data.data);
        setTimeout(navigate("/app", { replace: true }), 2000);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/app");
    }
  }, [navigate]);

  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input type="email" id="email" name="email" placeholder="Email" />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
          />
        </div>
        <p className={styles.text}>
          Don&apos;t have accaunt?
          <Link className={styles.link} to="/register">
            Register
          </Link>
        </p>

        <div>
          <Button type={"primary"}>Login</Button>
        </div>
      </form>
      <ToastContainer />
    </main>
  );
}

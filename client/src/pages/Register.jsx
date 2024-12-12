import PageNav from "../components/PageNav";
import styles from "./Login.module.css";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

function Register() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const userData = {
        userName: formData.get("userName"),
        email: formData.get("email"),
        password: formData.get("password"),
      };
      const response = await axios.post("/api/users/register", userData);

      if (response.data.success) {
        console.log(response.data.data);
        e.target.reset();
        toast.success(response.data.message);
        setTimeout(() => navigate("/login"), 2000);
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
          <label htmlFor="email">User Name</label>
          <input
            type="text"
            name="userName"
            id="userName"
            placeholder="User Name"
          />
        </div>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input type="email" name="email" id="email" placeholder="Email" />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
          />
        </div>
        <p className={styles.text}>
          Already have an accaunt?
          <Link className={styles.link} to="/login">
            Login
          </Link>
        </p>
        <div>
          <Button type={"primary"}>Register</Button>
          <ToastContainer />
        </div>
      </form>
    </main>
  );
}

export default Register;

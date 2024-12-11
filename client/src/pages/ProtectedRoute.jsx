import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../contexts/FakeAuthContext";

function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { setUser, user } = useAuth();

  useEffect(() => {
    const validateToken = async () => {
      try {
        const response = await axios.post(
          "/api/users/get-user-by-id",
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          setUser(response.data.data);
          setLoading(false);
        } else {
          setLoading(false);
          localStorage.removeItem("token");
          toast.error(response.data.message);
          setTimeout(navigate("/login"), 1500);
        }
      } catch (error) {
        localStorage.removeItem("token");
        toast.error(error.message);
        setLoading(false);
        setTimeout(navigate("/login"), 1500);
      }
    };

    if (localStorage.getItem("token")) {
      validateToken();
    } else {
      setTimeout(navigate("/login"), 1500);
    }
  }, [navigate]);

  return <div>{loading ? <div>Loading...</div> : <>{children}</>}</div>;
}

export default ProtectedRoute;

import { useEffect } from "react";
import { FaGripLines } from "react-icons/fa";
import { FaGripLinesVertical } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { setIsSidebarOpen } from "../redux/sidebarSlice";
import AppNav from "./AppNav";
import Logo from "./Logo";
import styles from "./Sidebar.module.css";
import CityList from "./CityList";

function Sidebar() {
  const { isSideBarOpen } = useSelector((state) => state.sidebar);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        dispatch(setIsSidebarOpen(true));
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dispatch]);

  return (
    <div
      className={styles.sidebar}
      style={{ height: isSideBarOpen ? "100dvh" : "8rem" }}
    >
      <Logo className={"position"} />
      {isSideBarOpen && (
        <>
          <AppNav />

          {location.pathname !== "/app/form" ? <Outlet /> : <CityList />}
        </>
      )}
      <footer className={styles.footer}>
        <p className={styles.copyright}>
          &copy; Copyright {new Date().getFullYear()} by WorldWise Inc.
        </p>
      </footer>
      <div className={styles.devider}>
        <FaGripLines
          className={styles.doubleLine}
          onClick={() => {
            navigate("cities");
            dispatch(setIsSidebarOpen(!isSideBarOpen));
          }}
        />
      </div>
      <div className={styles.deviderVertical}>
        <FaGripLinesVertical className={styles.doubleLine} />
      </div>
    </div>
  );
}

export default Sidebar;

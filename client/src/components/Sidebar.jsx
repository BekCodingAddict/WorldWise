import { useEffect, useRef } from "react";
import { FaGripLines } from "react-icons/fa";
import { FaGripLinesVertical } from "react-icons/fa6";
import { Outlet } from "react-router-dom";
import { useCities } from "../contexts/CityContext";
import AppNav from "./AppNav";
import Logo from "./Logo";
import styles from "./Sidebar.module.css";

function Sidebar() {
  const { showMap, setShowMap } = useCities();

  const resizeableRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) setShowMap(true);
      else setShowMap(false);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setShowMap]);

  return (
    <div
      className={styles.sidebar}
      ref={resizeableRef}
      style={{ height: showMap ? "100dvh" : "8rem" }}
    >
      <Logo className={"position"} />
      {showMap && (
        <>
          <AppNav />
          <Outlet />
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
          onClick={() => setShowMap((isOpen) => !isOpen)}
        />
      </div>
      <div className={styles.deviderVertical}>
        <FaGripLinesVertical className={styles.doubleLine} />
      </div>
    </div>
  );
}

export default Sidebar;

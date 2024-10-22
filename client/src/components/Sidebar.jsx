import styles from "./Sidebar.module.css";
import Logo from "./Logo";
import AppNav from "./AppNav";
import { Outlet } from "react-router-dom";
import { FaGripLines } from "react-icons/fa";
import { useState } from "react";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [height, setHeight] = useState(540); // Initial height of the window
  const [isDragging, setIsDragging] = useState(false);

  // Function to start dragging when the button is clicked
  const startDragging = () => {
    setIsDragging(true);
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", stopDragging);
  };

  // Function to update the height based on mouse movement
  const onMouseMove = (e) => {
    if (isDragging) {
      const newHeight = window.innerHeight - e.clientY;
      setHeight(newHeight > 100 ? newHeight : 100); // Minimum height set to 100px
    }
  };

  // Function to stop dragging when the mouse button is released
  const stopDragging = () => {
    setIsDragging(false);
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", stopDragging);
  };

  return (
    <div className={styles.sidebar}>
      <Logo className={"position"} style={{ height: `${height}px` }} />
      <AppNav />
      <Outlet />

      <footer className={styles.footer}>
        <p className={styles.copyright}>
          &copy; Copyright {new Date().getFullYear()} by WorldWise Inc.
        </p>
      </footer>
      <div className={styles.devider}>
        <FaGripLines className={styles.doubleLine} onDrag={startDragging} />
      </div>
    </div>
  );
}

export default Sidebar;

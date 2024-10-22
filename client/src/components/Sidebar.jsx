import styles from "./Sidebar.module.css";
import Logo from "./Logo";
import AppNav from "./AppNav";
import { Outlet } from "react-router-dom";
import { FaGripLines } from "react-icons/fa";
import { useRef, useState } from "react";
import { FaGripLinesVertical } from "react-icons/fa6";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dimension, setDimension] = useState({ width: 640, height: 540 });

  const resizeableRef = useRef(null);
  const isResizeing = useRef(false);

  const startResize = (e) => {
    e.preventDefault();

    isResizeing.current = true;
    const startX = e.type === "mousedown" ? e.clientX : e.touches[0].clientX;
    const startY = e.type === "mousedown" ? e.clientY : e.touches[0].clientY;

    const { width, height } = resizeableRef.current.getBoundingClientRect();

    const handleMouseMove = (e) => {
      if (isResizeing.current) {
        const currentY =
          e.type === "mousemove" ? e.clientY : e.touches[0].clientY;
        const currentX =
          e.type === "mousemove" ? e.clientX : e.touches[0].clientX;
        const newWidth = width + (currentX - startX);
        const newHeight = height + (currentY - startY);

        setDimension({
          width: newWidth > 100 ? newWidth : 100, // minimum size
          height: newHeight > 100 ? newHeight : 100, // minimum size
        });
      }
    };

    const stopResize = () => {
      isResizeing.current = false;
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", stopResize);
      document.removeEventListener("touchmove", handleMouseMove); // Remove touch listeners
      document.removeEventListener("touchend", stopResize); // Remove touch listeners
    };

    // Attach mouse move and mouse up listeners
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", stopResize);
    document.addEventListener("touchmove", handleMouseMove); // Add touch listeners
    document.addEventListener("touchend", stopResize); // Add touch listeners
  };
  return (
    <div
      className={styles.sidebar}
      ref={resizeableRef}
      style={{
        height: `${
          window.innerWidth > 1024 ? window.innerHeight : dimension.height
        }px`,
        width: `${
          window.innerWidth < 1024 ? window.innerWidth : dimension.width
        }px`,
      }}
    >
      <Logo className={"position"} />
      <AppNav />
      <Outlet />

      <footer className={styles.footer}>
        <p className={styles.copyright}>
          &copy; Copyright {new Date().getFullYear()} by WorldWise Inc.
        </p>
      </footer>
      <div className={styles.devider}>
        <FaGripLines
          className={styles.doubleLine}
          onMouseDown={startResize}
          onTouchStart={startResize}
        />
      </div>
      <div className={styles.deviderVertical}>
        <FaGripLinesVertical
          className={styles.doubleLine}
          onMouseDown={startResize}
          onTouchStart={startResize}
        />
      </div>
    </div>
  );
}

export default Sidebar;

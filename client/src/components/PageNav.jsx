import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";
import Logo from "./Logo";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa6";

function PageNav() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className={styles.nav}>
      <Logo />

      {isOpen ? (
        <PageNavMobile setIsOpen={setIsOpen} isOpen={isOpen} />
      ) : (
        <GiHamburgerMenu
          className={styles.menu}
          onClick={() => setIsOpen(!isOpen)}
        />
      )}
      <ul>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/Product">Product</NavLink>
        </li>
        <li>
          <NavLink to="/login" className={styles.ctaLink}>
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

function PageNavMobile({ setIsOpen, isOpen }) {
  return (
    <div className={`${styles.mobileNavContainer} ${isOpen ? "open" : ""}`}>
      <FaArrowRight
        className={styles.mobileBackBtn}
        onClick={() => setIsOpen((show) => !show)}
      />
      <nav className={styles.mobileNav}>
        <ul>
          <li>
            <NavLink to="/pricing">Pricing</NavLink>
          </li>
          <li>
            <NavLink to="/Product">Product</NavLink>
          </li>
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default PageNav;

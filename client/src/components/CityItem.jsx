import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDeleteCity } from "../hooks/useDeleteCity";
import styles from "./CityItem.module.css";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

function CityItem({ city }) {
  const { cityName, emoji, date, _id, position } = city;
  const { currentCity } = useSelector((state) => state.currentCity);
  const { deleteCity } = useDeleteCity();

  const handleClick = (e) => {
    e.preventDefault();
    if (confirm("Are you sure about delete this city?")) deleteCity(_id);
  };

  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          _id === currentCity._id ? styles["cityItem--active"] : ""
        }`}
        to={`${_id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn} onClick={handleClick}>
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;

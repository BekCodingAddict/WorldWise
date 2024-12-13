import { Link } from "react-router-dom";
import { useCities } from "../contexts/CityContext";
import styles from "./CityItem.module.css";
import { useDeleteCity } from "../hooks/useDeleteCity";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

function CityItem({ city }) {
  const { cityName, emoji, date, _id, position } = city;
  const { currentCity, deleteCity } = useCities();
  const { deleteCity: deleteCityAPI } = useDeleteCity();

  const handleClick = (e) => {
    e.preventDefault();
    deleteCity(_id);
    deleteCityAPI(_id);
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

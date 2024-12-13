import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import { useCities } from "../contexts/CityContext";
import { useCities2 } from "../hooks/useCities";

function CityList() {
  // const { cities, isLoading } = useCities();
  const { data, isLoading } = useCities2();
  const { cities } = data;

  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message="Add your frist city by clicking on a city on the map!" />
    );
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem
          city={city}
          key={`${city.position.lat}+${city.position.lng}`}
        />
      ))}
    </ul>
  );
}

export default CityList;

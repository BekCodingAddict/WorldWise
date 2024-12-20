// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Message from "../components/Message";
import Spinner from "../components/Spinner";

import { useAddCity } from "../hooks/useAddCity";
import { useUrlPosition } from "../hooks/useUrlPosition";
import BackButton from "./BackButton";
import Button from "./Button";
import styles from "./Form.module.css";
import { useNavigate } from "react-router-dom";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [lat, lng] = useUrlPosition();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [isLoadingGeoCoding, setIsLoadingGeoCoding] = useState(false);
  const [emoji, setEmoji] = useState("");
  const [geoCodingError, setGeoCodingError] = useState("");
  const { addCity, isAdding } = useAddCity();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!lat && !lng) return;
      async function fetchCityData() {
        try {
          setIsLoadingGeoCoding(true);
          setGeoCodingError("");
          const response = await axios.post("/api/users/reverse-geocode", {
            lat,
            lng,
          });
          const data = response.data.data;

          if (!data.address.country_code)
            throw new Error(
              "That does not seem to be a city. Click somewhere else!"
            );

          setCityName(data.address.city || "");
          setCountry(data.address.country);
          setEmoji(convertToEmoji(data.address.country_code));
        } catch (error) {
          setGeoCodingError(
            "That does not seem to be a city. Click somewhere else!"
          );
        } finally {
          setIsLoadingGeoCoding(false);
        }
      }
      fetchCityData();
    },
    [lat, lng]
  );

  if (isLoadingGeoCoding) return <Spinner />;

  if (!lat && !lng)
    return <Message message={"Start by clicking somewhere on the map!"} />;

  if (geoCodingError) return <Message message={geoCodingError} />;

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (!cityName || !date) return;
      const newCity = {
        cityName,
        country,
        emoji,
        date,
        notes,
        position: { lat, lng },
      };
      addCity(newCity);
    } catch (error) {
      toast.error(error.message);
    }
  }
  return (
    <form
      className={`${styles.form} ${isAdding ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
      </div>
      <DatePicker
        id="date"
        onChange={(date) => setDate(date)}
        selected={date}
        dateFormat={"dd/MM/yyyy"}
      />
      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <Button type={"back"} onClick={() => navigate("/app")}>
          Cencel
        </Button>
      </div>
    </form>
  );
}

export default Form;

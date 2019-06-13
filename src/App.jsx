import React, { useState, useEffect } from "react";
import "./App.css";
import { geolocated } from "react-geolocated";
import axios from "axios";


function App(props) {
  const [search, setSearch] = useState("");
  const [lang, setLang] = useState();
  const [weather, setWeather] = useState([]);
  const [news, setNews] = useState([]);

  // Make a request for a user with a given ID
  useEffect(() => {
    if (!props.isGeolocationAvailable) {
      const arr = [];
      arr.push({
        name: "Temp.",
        temp: "not available"
      });
      setWeather(arr);
    } else if (!props.isGeolocationEnabled) {
      console.log();
      const arr = [];
      arr.push({
        name: "Temp.",
        temp: "not available"
      });
      setWeather(arr);

    } else if (props.coords) {
      const latitude = props.coords.latitude;
      const longitude = props.coords.longitude;

      axios({
        method: "get",
        url: `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=b353d73227bebb0a8d9dc9769ab746ca`
      }).then(function(response) {
        const arr = [];
        arr.push({
          name: response.data.name,
          temp: Math.round(response.data.main.temp - 275.15)
        });
        setWeather(arr);
      });
    }
  });

  const onSearch = () => {
    axios({
      method: "get",
      url: `https://gnews.io/api/v2/?q=${search}&token=d06742a4ab30fabef32faa13f28cd198&lang=${lang}`
    }).then(function(response) {
      setNews(response.data.articles);
      });
  };

  return (
    <div>
      <div className="container-fluid body2">
        <div className="row align-items-center justify-content-end">
          <div className="col-12 col-md-1">
            <div className="imge">
              <img
                src="https://clipartix.com/wp-content/uploads/2016/05/Weather-clipart-2.png"
                class="card-img-top"
                alt="WEATHER CONDITION"
              />
            </div>
          </div>
          <div className="col-12 col-md-1">
            <div className="row">
              <h3 className="weather">{weather.map(Item => Item.name)} </h3>
            </div>
            <div className="row justify-content-center">
              <p>
                {weather.map(Item => Item.temp)}
                <sup>°C</sup>
              </p>
            </div>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-6 text-center">
            <h1>
              THE<span className="span">-KNOW-</span>QUAD
            </h1>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-6 text-center">
            <p className="paragraph">(power of thumb)</p>
          </div>
        </div>
        <div className="row justify-content-center mb-4">
          <div className="col-8 text-center">
            <input
              className="txtbox"
              type="text"
              size="45"
              placeholder="search news"
              onChange={event => {
                setSearch(event.target.value);
              }}
            />
          </div>
        </div>
        <div className="row justify-content-center mb-5">
          <div className="col-12 col-md-2">
            <input
              type="radio"
              name="language"
              value="en"
              onClick={event => {
                setLang(event.target.value);
              }}
            />
            ENGLISH
          </div>
          <div className="col-12 col-md-2">
            <input
              type="radio"
              name="language"
              value="hi"
              onClick={event => {
                setLang(event.target.value);
              }}
            />
            HINDI
          </div>
          <div className=" col-12 col-md-2">
            <input
              type="radio"
              name="language"
              value="ml"
              onClick={event => {
                setLang(event.target.value);
              }}
            />
            MALAYALAM
          </div>
        </div>
        <div className="row justify-content-center">
          <button className="btn" onClick={onSearch}>
            SEARCH
          </button>
        </div>
      </div>
      <div className="container body">
        <div className="row">
          {news.map(item => (
            <div className="col-12 col-md-6">
              <div class="card card1 m-1">
                <img
                  className="card-img-top  imge2"
                  src={item.image}
                  
                  alt="news image"
                />
                {item.source}
                <div class="card-body">
                  <a href={item.link}>
                    {" "}
                    <h5 class="card-title">{item.title}</h5>{" "}
                  </a>
                  <p class="card-text">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false
  },
  userDecisionTimeout: 5000
})(App);


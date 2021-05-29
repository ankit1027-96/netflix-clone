import React, { useEffect, useState } from "react";
import requests from "./requests";
import axios from "./axios";
import "./css/banner.css";

const Banner = () => {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchTrending);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
    }
    fetchData();
  }, []);
  console.log(movie);

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundPosition: "center center",
      }}
    >
      <div className="bannerContent">
        <h1 className="bannerTitle">
          {movie.title || movie.name || movie.original_name}
        </h1>
        <div className="bannerButtons">
          <button className="bannerButton btnOne">Play</button>
          <button className="bannerButton btnTwo">My List</button>
        </div>
        <h1 className="bannerDescription">{truncate(movie.overview, 120)}</h1>
      </div>
      <div className="bannerFade" />
    </header>
  );
};

export default Banner;

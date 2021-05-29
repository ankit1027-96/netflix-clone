import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import axios from "./axios";
import movieTrailer from "movie-trailer";

import "./css/Row.css";

const base_url = "https://image.tmdb.org/t/p/original/";

const Row = ({ title, fetchURL, largeRow }) => {
  const [movies, setMovies] = useState([]);
  const [movieUrl, setMovieUrl] = useState("");

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchURL);
      // console.log(request);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchURL]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    if (movieUrl) {
      setMovieUrl("");
    } else {
      movieTrailer(movie?.name || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setMovieUrl(urlParams.get("v"));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="rows">
      <h2 className="rowTitle">{title}</h2>
      <div className="posters ">
        {movies.map((movie) => (
          <img
            onClick={() => handleClick(movie)}
            className={`poster ${largeRow && "posterLarge"}`}
            key={movie.id}
            src={`${base_url}${
              largeRow ? movie.poster_path : movie.backdrop_path
            } `}
            alt={movie.original_name}
          />
        ))}
      </div>
      {movieUrl && <YouTube videoId={movieUrl} opts={opts} />}
    </div>
  );
};

export default Row;

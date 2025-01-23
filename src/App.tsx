import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./App.css";
import poster from "./The Batman.jpeg";

const App = () => {
  const [movie, setMovie] = useState([]);
  const [filteredMovie, setFilteredMovie] = useState([]);

  const search = useRef();

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc",
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMmM0ZmM4YTZjMzdkNjllZDliNWQxODI1OGYyNjE5MSIsIm5iZiI6MTczNzIxNDY1MS4yODQ5OTk4LCJzdWIiOiI2NzhiY2FiYmRiY2ZmMzNhOWM2NGY1NWQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.GeljvbWs8UZEuuYH7iEpqmIMJMFhyguhGjJzK_RGREU",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setMovie(data.results);
        setFilteredMovie(data.results);
      });
  }, []);

  const searchmovie = () => {
    const newmovie = movie.filter((item) =>
      item.title.toLowerCase().includes(search.current.value.toLowerCase())
    );
    setFilteredMovie(newmovie);
    console.log(movie);
  };

  return (
    <>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=star"
        />
      </head>
      <div className="body">
        <h1>Movie Finder</h1>
        <div className="search-bar">
          <input type="text" placeholder="Search for a movie" ref={search} />
          <button onClick={searchmovie}>Search</button>
        </div>
        <div className="movies">
          {search.current &&
          search.current.value !== "" &&
          filteredMovie.lenght !== 0 ? (
            filteredMovie.map((item) => (
              <div class="movie" key={item.id}>
                <div className="movie-informations">
                  <img
                    src={"https://image.tmdb.org/t/p/w500/" + item.poster_path}
                    alt=""
                  />
                  <h2>{item.title}</h2>
                  <h4>{item.release_date}</h4>
                  <h4>IMDB:{item.vote_average}</h4>
                  <h4>Orginal Language: {item.original_language
                  }</h4>
                  
                </div>
              </div>
            ))
          ) : (
            <h3>No movie found</h3>
          )}
        </div>
      </div>
    </>
  );
};

export default App;

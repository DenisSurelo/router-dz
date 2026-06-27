import { useParams, Link, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieDetails } from "../api";

const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";

function Movie() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    getMovieDetails(movieId).then(setMovie);
  }, [movieId]);

  if (!movie) return <p>Loading...</p>;

  return (
    <div>
      <h2>{movie.title} ({movie.release_date?.slice(0, 4)})</h2>
      <img
        src={movie.poster_path ? `${IMG_BASE_URL}${movie.poster_path}` : "https://via.placeholder.com/200x300"}
        alt={movie.title}
      />
      <p>User Score: {Math.round(movie.vote_average * 10)}%</p>
      <p>{movie.overview}</p>
      <Link to="info">More info</Link>
      <Outlet />
    </div>
  );
}

export default Movie;

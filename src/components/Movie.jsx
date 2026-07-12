import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieDetails } from "../api";

const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";

function Movie() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    getMovieDetails(movieId).then(setMovie);
  }, [movieId]);

  if (!movie) return <p>Loading...</p>;

  const handleGoBack = () => {
    const params = new URLSearchParams(location.search);
    const query = params.get("query");
    navigate(query ? `/movies?query=${query}` : "/movies");
  };

  return (
    <div>
      <button onClick={handleGoBack}>Go Back</button>
      <h2>{movie.title}</h2>
      <img
        src={movie.poster_path ? `${IMG_BASE_URL}${movie.poster_path}` : "https://via.placeholder.com/200x300"}
        alt={movie.title}
      />
      <p>{movie.overview}</p>
    </div>
  );
}

export default Movie;

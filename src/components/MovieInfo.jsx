import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieCredits, getMovieReviews } from "../api";

const IMG_BASE_URL = "https://image.tmdb.org/t/p/w200";

function MovieInfo() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getMovieCredits(movieId).then(data => setCast(data.cast));
    getMovieReviews(movieId).then(data => setReviews(data.results));
  }, [movieId]);

  return (
    <div>
      <h3>Cast</h3>
      <ul>
        {cast.map(actor => (
          <li key={actor.id}>
            <img
              src={actor.profile_path ? `${IMG_BASE_URL}${actor.profile_path}` : "https://via.placeholder.com/150"}
              alt={actor.name}
            />
            {actor.name}
          </li>
        ))}
      </ul>

      <h3>Reviews</h3>
      <ul>
        {reviews.map(review => (
          <li key={review.id}>{review.content}</li>
        ))}
      </ul>
    </div>
  );
}

export default MovieInfo;

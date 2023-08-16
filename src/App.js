import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {

  const [movies, setMovies] = useState([]);
  const [loadingData, setLoadingData] = useState(false);
  const fatchMoviesHandler = async () => {
    setLoadingData(true);
    try {
      const response = await fetch('https://swapi.dev/api/films')
      const data = await response.json();

      const transformedMovies = data.results.map(movieData => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date
        }
      })
      setMovies(transformedMovies)
    }

    catch (error) {
      alert(error)
    }
    setLoadingData(false)
  }

  return (
    <React.Fragment>
      <section>

        <button onClick={fatchMoviesHandler}>Fetch Movies</button>
      </section>

      <section>
        { loadingData && <div className='loader'>
          <h3>Loading</h3>
        </div>}
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;

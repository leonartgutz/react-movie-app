/* eslint-disable react/no-access-state-in-setstate */
import React, { Component } from 'react';
import { InputLabel, Select, FormControl } from '@material-ui/core';
import api from '../../services/api';

class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      pg: 1,
      type: 'now_playing',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    this.getResults(this.state.pg, this.state.type);
  }

  async getResults(pg, type) {
    const result = await api.get(`/movie/${type}?language=en-US&page=${pg}`);
    this.setState({ movies: result.data.results });
  }

  async handleChange(e) {
    this.getResults(this.state.pg, e.target.value);
  }

  render() {
    return (
      <>
        <FormControl variant="outlined" className="search__select--margin">
          <InputLabel htmlFor="outlined-age-native-simple">Category</InputLabel>
          <Select native label="Category" onChange={this.handleChange}>
            <option value="now_playing">now_playing</option>
            <option value="popular">popular</option>
            <option value="top_rated">top_rated</option>
            <option value="upcoming">upcoming</option>
          </Select>
        </FormControl>

        {this.state.movies.map((movie) => (
          <div key={movie.id} className="card">
            <figure>
              <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title} />
            </figure>

            <div className="card__details">

              <h2>{movie.title}</h2>
              <p>Release date: {movie.release_date} | Popularity: {movie.popularity}</p>

              <p>{movie.overview}</p>
            </div>
          </div>
        ))}
      </>
    );
  }
}

export default Movies;

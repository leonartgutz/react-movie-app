/* eslint-disable react/no-access-state-in-setstate */
import React, { Component } from 'react';
import { InputLabel, Select, FormControl } from '@material-ui/core';
import api from '../../services/api';

class Tv extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shows: [],
      pg: 1,
      type: 'airing_today',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    this.getResults(this.state.pg, this.state.type);
  }

  async getResults(pg, type) {
    const result = await api.get(`/tv/${type}?language=en-US&page=${pg}`);
    this.setState({ shows: result.data.results });
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
            <option value="airing_today">airing_today</option>
            <option value="on_the_air">on_the_air</option>
            <option value="top_rated">top_rated</option>
            <option value="popular">popular</option>
          </Select>
        </FormControl>

        {this.state.shows.map((show) => (
          <div key={show.id} className="card">
            <figure>
              <img src={`https://image.tmdb.org/t/p/original${show.poster_path}`} alt={show.name} />
            </figure>

            <div className="card__details">

              <h2>{show.name}</h2>
              <p>Release date: undefined | Popularity: {show.popularity}</p>

              <p>{show.overview}</p>
            </div>
          </div>
        ))}
      </>
    );
  }
}

export default Tv;

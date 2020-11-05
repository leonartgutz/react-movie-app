/* eslint-disable react/no-access-state-in-setstate */
import React, { Component } from 'react';
import { InputLabel, Select, FormControl } from '@material-ui/core';
import SiteWrapper from '../../components/SiteWrapper';
import api from '../../services/api';

class Tv extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shows: [],
    };

    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    const result = await api.get('/tv/airing_today?api_key=5879e3f1372f127febbcff25791a647c&language=en-US&page=1');
    this.setState({ shows: result.data.results });
  }

  async handleChange(e) {
    const result = await api.get(`/tv/${e.target.value}?api_key=5879e3f1372f127febbcff25791a647c&language=en-US&page=1`);
    this.setState({ shows: result.data.results });
  }

  render() {
    return (
      <SiteWrapper pageValue={2}>

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
      </SiteWrapper>
    );
  }
}

export default Tv;

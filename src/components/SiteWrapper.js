import {
  TextField, InputLabel, Select, FormControl, Button, Paper, Tab, Tabs,
} from '@material-ui/core';
import React, { Component } from 'react';
import Movies from '../pages/Movies';
import Search from '../pages/Search';
import Tv from '../pages/Tv';
import api from '../services/api';

class SiteWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'movies',
      searchResults: [],
      searchFound: 'Please enter a search',
      pageNumber: 0,
      select: 'multi',
      query: '',
      pg: 1,
    };

    this.changePage = this.changePage.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getResults = this.getResults.bind(this);
  }

  async getResults(type, query, pg) {
    const result = await api.get(`/search/${type}?language=en-US&page=${pg}&include_adult=false&query=${query}`);
    if (result.data.total_results > 0) {
      this.setState(() => ({ searchResults: result.data.results, searchFound: '' }));
    } else {
      this.setState(() => ({ searchResults: [], searchFound: 'Sorry, there were no results' }));
    }
  }

  changePage(e, newValue) {
    this.setState({ pageNumber: newValue });

    switch (newValue) {
      case 1:
        this.setState({ page: 'search' });
        break;
      case 2:
        this.setState({ page: 'tv' });
        break;
      default:
        this.setState({ page: 'movies' });
        break;
    }
  }

  handleSearch(e) {
    this.setState({ query: e.target.value });
    this.changePage(e, 1);
  }

  handleSelect(e) {
    this.setState({ select: e.target.value });
  }

  async handleSubmit(e) {
    e.preventDefault();
    this.changePage(e, 1);

    if (this.state.query !== '') {
      this.getResults(this.state.select, this.state.query, this.state.pg);
    } else {
      this.setState(() => ({ searchFound: 'Please enter a search' }));
    }
  }

  render() {
    return (
      <div className="container">
        <div className="container__inner">

          <h1>React Movies App</h1>

          <section className="search">
            <form onSubmit={this.handleSubmit}>
              <TextField id="outlined-basic" label="Search" variant="outlined" className="search__text-field" onChange={this.handleSearch} />
              <FormControl variant="outlined" className="search__select">
                <InputLabel htmlFor="outlined-age-native-simple">Search Type</InputLabel>
                <Select native abel="Search Type" onChange={this.handleSelect}>
                  <option value="multi">multi</option>
                  <option value="movies">movies</option>
                  <option value="tv">tv shows</option>
                </Select>
              </FormControl>
              <Button variant="contained" color="primary" type="submit">
                Search
              </Button>
            </form>
          </section>

          <section className="content">
            <Paper className="content__tab">
              <Tabs
                value={this.state.pageNumber}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                onChange={this.changePage}
              >
                <Tab label="Movies" className="content__tab-btn" />
                <Tab label="Search" className="content__tab-btn" />
                <Tab label="TV Shows" className="content__tab-btn" />
              </Tabs>
            </Paper>

            <div className="content__inner">
              {this.state.page === 'movies' ? (<Movies />) : ''}
              {this.state.page === 'search' ? (<Search searchResult={this.state.searchResults} found={this.state.searchFound} />) : ''}
              {this.state.page === 'tv' ? (<Tv />) : ''}
            </div>

          </section>

        </div>
      </div>
    );
  }
}

export default SiteWrapper;

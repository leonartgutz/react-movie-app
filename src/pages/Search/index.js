import React, { Component } from 'react';
// import api from '../../services/api';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
    };
  }

  componentDidMount() {
    this.setState({ results: this.props.searchResult, found: this.props.found });
  }

  componentDidUpdate(prevProps) {
    if (this.props.searchResult !== prevProps.searchResult) {
      this.setState({ results: this.props.searchResult });
    }

    if (this.props.found !== prevProps.found) {
      this.setState({ found: this.props.found });
    }
  }

  render() {
    return (
      <>
        {this.state.results.length > 0 ? (
          this.state.results.map((result) => (
            <div key={result.id} className="card">
              {result.poster_path !== undefined ? (
                <figure>
                  <img src={`https://image.tmdb.org/t/p/original${result.poster_path}`} alt={result.title} />
                </figure>
              ) : ''}

              <div className="card__details">

                <h2>{result.title !== undefined ? result.title : result.name}</h2>
                <p>Release date: {result.release_date} | Popularity: {result.popularity}</p>

                <p>{result.overview}</p>
              </div>
            </div>
          ))
        ) : (
          <h3>{this.state.found}</h3>
        )}
      </>
    );
  }
}

export default Search;

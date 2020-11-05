import {
  TextField, InputLabel, Select, FormControl, Button, Paper, Tab, Tabs,
} from '@material-ui/core';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class SiteWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };

    this.changePage = this.changePage.bind(this);
  }

  changePage(e, newValue) {
    const { history } = this.props;

    switch (newValue) {
      case 0:
        history.push('/');
        break;
      case 1:
        history.push('/search');
        break;
      case 2:
        history.push('/tv');
        break;
      default:
        history.push('/');
        break;
    }
  }

  render() {
    return (
      <div className="container">
        <div className="container__inner">

          <h1>React Movies App</h1>

          <section className="search">
            <form>
              <TextField id="outlined-basic" label="Search" variant="outlined" className="search__text-field" />
              <FormControl variant="outlined" className="search__select">
                <InputLabel htmlFor="outlined-age-native-simple">Age</InputLabel>
                <Select
                  native
                  label="Age"
                  inputProps={{
                    name: 'age',
                    id: 'outlined-age-native-simple',
                  }}
                >
                  <option aria-label="None" value="" />
                  <option value={10}>Ten</option>
                  <option value={20}>Twenty</option>
                  <option value={30}>Thirty</option>
                </Select>
              </FormControl>
              <Button variant="contained" color="primary">
                Search
              </Button>
            </form>
          </section>

          <section className="content">
            <Paper className="content__tab">
              <Tabs
                value={this.props.pageValue}
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
              {this.props.children}
            </div>

          </section>

        </div>
      </div>
    );
  }
}

export default withRouter(SiteWrapper);

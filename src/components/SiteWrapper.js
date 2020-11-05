import {
  TextField, InputLabel, Select, FormControl, Button,
} from '@material-ui/core';
import React, { Component } from 'react';

class SiteWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    return (
      <div className="container">
        <div className="container__inner">

          <h1>React Movies App</h1>

          <section className="search">
            <form>
              <TextField id="outlined-basic" label="Search" variant="outlined" />
              <FormControl variant="outlined">
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
                Primary
              </Button>
            </form>
          </section>

          <section className="menu">

            {this.props.children}
          </section>

        </div>
      </div>
    );
  }
}

export default SiteWrapper;

import React from 'react';
import api from '../api'
import PackageList from "./PackageList";

class PackageBrowser extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      packages: []
    };
  }

  componentDidMount() {
    api.get('/packages').then(
      result => {
        const packages = result.packages;
        this.setState({ packages });
      }
    )
  }

  render() {
    return (
      <div className="PackageBrowser">
        <h1>Package Browser</h1>
        <PackageList packages={this.state.packages}/>
      </div>
    )
  }
}

export default PackageBrowser;

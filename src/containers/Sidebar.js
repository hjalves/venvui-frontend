import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Sidebar extends Component {

  handler = (action) => (e) => {
    e.preventDefault();
    return this.props.setNavigation(action);
  };

  render() {
    return (
      <div className="Sidebar">
        <div className="nav">
          <div className="logo"><Link to="/">ＶＥＮＶＵＩ</Link></div>
        </div>

        <div className="nav">
          <ul>
            <li className="title">Projects</li>
            <li><Link to="/projects">Browse</Link></li>
            <li><Link to="/new-project">Create</Link></li>
          </ul>
        </div>

        <div className="nav">
          <ul>
            <li className="title">Deployments</li>
            <li><a href="#deployment-jobs" onClick={this.handler("deploymentJobs")}>Jobs (0)</a></li>
          </ul>
        </div>

        <div className="nav">
          <ul>
            <li className="title">Packages</li>
            <li><a href="#browse-packages" onClick={this.handler("browsePackages")}>Browse</a></li>
            <li><a href="#upload-package" onClick={this.handler("uploadPackage")}>Upload</a></li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Sidebar;

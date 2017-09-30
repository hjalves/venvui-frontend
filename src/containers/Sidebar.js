import React from 'react';
import { Link } from 'react-router-dom'

const Sidebar = () => (
  <div className="Sidebar">
    <div className="nav">
      <div className="logo"><Link to="/">VENVUI</Link></div>
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
        <li><Link to="/deployments">Jobs</Link></li>
      </ul>
    </div>

    <div className="nav">
      <ul>
        <li className="title">Packages</li>
        <li><Link to="/packages">Browse</Link></li>
        <li><Link to="/upload-package">Upload</Link></li>
      </ul>
    </div>
  </div>
);

export default Sidebar;


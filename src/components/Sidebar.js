import React from 'react';
import { Link, NavLink } from 'react-router-dom'

const Sidebar = () => (
  <div className="Sidebar">
    <div className="nav">
      <div className="logo"><Link to="/">VENVUI</Link></div>
    </div>

    <div className="nav">
      <ul>
        <li className="title">Projects</li>
        <li><NavLink exact to="/projects">Browse</NavLink></li>
        <li><NavLink exact to="/new-project">Create</NavLink></li>
      </ul>
    </div>

    <div className="nav">
      <ul>
        <li className="title">Deployments</li>
        <li><NavLink exact to="/deployments">Jobs</NavLink></li>
      </ul>
    </div>

    <div className="nav">
      <ul>
        <li className="title">Packages</li>
        <li><NavLink exact to="/packages">Browse</NavLink></li>
        <li><NavLink exact to="/upload-package">Upload</NavLink></li>
      </ul>
    </div>
  </div>
);

export default Sidebar;


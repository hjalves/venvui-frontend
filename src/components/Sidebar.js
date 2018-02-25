import React from 'react';
import { Link, NavLink } from 'react-router-dom'

const Sidebar = () => (
  <div className="Sidebar">
    {/*<div className="nav">*/}
      {/*<div className="logo"><Link to="/">VENVUI</Link></div>*/}
    {/*</div>*/}

    <div className="nav">
      <ul>
        <li className="title">Venvui</li>
        <li><NavLink exact to="/">Overview</NavLink></li>
        <li><NavLink exact to="/projects">Projects</NavLink></li>
        <li><NavLink exact to="/new-project">New Project</NavLink></li>
        <li><NavLink exact to="/deployments">Deployments</NavLink></li>
        <li><NavLink exact to="/packages">Packages</NavLink></li>
        <li><NavLink exact to="/upload-package">Upload package</NavLink></li>
        <li><NavLink exact to="/services">Services</NavLink></li>
      </ul>
    </div>

    <div className="nav">
      <ul>
        <li className="title">About</li>
        <li><a href="https://github.com/hjalves/venvui" target="_blank">GitHub</a></li>
      </ul>
    </div>

  </div>
);

export default Sidebar;


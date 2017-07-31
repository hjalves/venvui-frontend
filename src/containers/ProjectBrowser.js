import React, { Component } from 'react';
import ProjectList from '../components/ProjectList'
import api from '../api'

class ProjectBrowser extends Component {

  constructor(props) {
    super(props);
    console.log("Created new ProjectBrowser");
    this.state = {
      projects: []
    };
  }

  componentDidMount() {
    api.get('/projects').then(
      result => {
        this.setState({
          projects: result.projects
        });
      }
    );
  }

  render() {
    return (
      <div className="ProjectBrowser">
        <h1>Project Browser</h1>
        <ProjectList projects={this.state.projects}/>
      </div>
    )
  }
}

export default ProjectBrowser;

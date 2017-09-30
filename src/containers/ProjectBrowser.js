import React from 'react';
import ProjectList from '../components/ProjectList'
import api from '../api'

class ProjectBrowser extends React.Component {

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
        const projects = result.projects;
        this.setState({ projects });
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

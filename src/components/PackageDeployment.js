import React from 'react';
import api from '../api';

class PackageDeployment extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      projects: null,
      selectedProject: undefined
    }
  }

  componentDidMount() {
    api.get('/projects').then(
      result => {
        const projects = result.projects;
        const selectedProject = projects.length > 0 ? projects[0].key : undefined;
        this.setState({ projects, selectedProject });
      }
    )
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.startDeployment(this.state.selectedProject);
  };

  handleChangeProject = (event) => {
    this.setState({selectedProject: event.target.value})
  };

  render() {
    const hasProjects = this.state.projects && this.state.projects.length > 0;
    let projectOptions = <option>(Fetching projects...)</option>;
    if (this.state.projects && this.state.projects.length === 0)
      projectOptions = <option>(No projects)</option>;
    if (this.state.projects) {
      projectOptions = this.state.projects.map((project) =>
        <option key={project.key} value={project.key}>{project.key}: {project.name}</option>
      )
    }

    return (
      <div className="edit-form">
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="package-filename">Package</label>
          <input id="package-filename" type="text" name="key" value={this.props.pkg}
                 disabled/>
          <label htmlFor="project-key">Project</label>
          <select id="project-key" disabled={!hasProjects}
                  value={this.state.selectedProject} onChange={this.handleChangeProject}>
            {projectOptions}
          </select>
          <button type="submit">Start Deployment</button>
        </form>
      </div>
    )
  }

}

export default PackageDeployment;

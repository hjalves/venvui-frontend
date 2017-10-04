import React from 'react';
import api from '../api';
import ServicesList from "./ServicesList";
import ConfigsList from "./ConfigsList";

class ProjectDetails extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      project: null,
      services: null,
      configs: null
    }
  }

  componentDidMount() {
    api.get('/projects/' + this.props.match.params.key).then(
      result => {
        this.setState({ project: result });
        this.getSystemdServices();
        this.getConfigFiles();
      }
    )
  }

  getSystemdServices() {
    api.get('/projects/' + this.props.match.params.key + '/services').then(
      result => {
        this.setState({ services: result.services });
      }
    )
  }

  getConfigFiles() {
    api.get('/projects/' + this.props.match.params.key + '/configs').then(
      result => {
        this.setState({ configs: result.configs });
      }
    )
  }

  handleSystemdCommand = (name, command) => {
    api.post(`/projects/${this.props.match.params.key}/services/${name}/${command}`).then(
      result => {
        this.getSystemdServices();
      }
    )
  };

  handleConfigInstall = (name) => {
    api.post(`/projects/${this.props.match.params.key}/configs/${name}/install`);
  };

  render() {
    let details = null;
    if (this.state.project)
      details = <ProjectInfo project={this.state.project}/>;
    let services = null;
    if (this.state.services)
      services = <ServicesList services={this.state.services} handleCommand={this.handleSystemdCommand}/>;
    let configs = null;
    if (this.state.configs)
      configs = <ConfigsList configs={this.state.configs} handleInstall={this.handleConfigInstall}/>;

    return (
      <div className="ProjectDetails">
        <h1>Project Details</h1>
        {details}
        <h2>systemd Services</h2>
        {services}
        <h2>Config Files</h2>
        {configs}
      </div>
    )
  }
}

const ProjectInfo = ({project}) =>
  <div className="content-box details">
    <div className="content-title">
      {project.name}
    </div>
    <div className="content-description">
      {project.key}
    </div>
    <hr/>
    <dl>
      <dt>Key</dt>
      <dd>{project.key}</dd>
      <dt>Name</dt>
      <dd>{project.name}</dd>
      <dt>Created At</dt>
      <dd>{project.created_at}</dd>
      <dt>Full Path</dt>
      <dd>{project.fullpath}</dd>
    </dl>
  </div>;


export default ProjectDetails;

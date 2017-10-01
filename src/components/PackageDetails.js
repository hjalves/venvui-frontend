import React from 'react';
import { Redirect } from 'react-router-dom';
import api from '../api';
import PackageDeployment from './PackageDeployment';

class PackageDetails extends React.Component {

  constructor(props) {
    super(props);
    this.filename = props.match.params.filename;
    this.state = {
      package: null,
      choosingProject: false,
      deploymentKey: null
    }
  }

  componentDidMount() {
    api.get('/packages/' + this.filename).then(
      result => {
        this.setState({ package: result });
      }
    )
  }

  handleDeploy = (event) => {
    console.log("Handle deploy");
    event.preventDefault();
    this.setState({ choosingProject: true });
  };

  handleCancel = (event) => {
    event.preventDefault();
    this.setState({ choosingProject: false });
  };

  startDeployment = (projectKey) => {
    console.log("Start deployment! project: %s, package: %s", projectKey, this.filename);
    this.setState({ choosingProject: false });
    api.post(`/projects/${projectKey}/deployments`, {filename: this.filename}).then(
      result => {
        this.setState({ deploymentKey: result.key });
      }
    )
  };

  render() {
    if (this.state.deploymentKey)
      return <Redirect push to={'/deployments/' + this.state.deploymentKey} />;

    const defaultButtons = [
      <button key="1" className="abutton abutton-green" onClick={this.handleDeploy}>Deploy</button>,
      <button key="2" className="abutton abutton-red" onClick={this.handleDelete}>Delete</button>
    ];
    const deployButtons = [
      <button key="1" className="abutton abutton-red" onClick={this.handleCancel}>Cancel</button>
    ];

    let content = null;
    if (this.state.choosingProject)
      content = <PackageDeployment pkg={this.state.package.filename}
                                   startDeployment={this.startDeployment}/>;
    else if (this.state.package)
      content = <PackageInfo pkg={this.state.package} />;

    return (
      <div className="PackageDetails">
        <h1>Package Details</h1>
        <div className="content-box">
          {content}
          <div className="buttons">
            {this.state.choosingProject ? deployButtons : defaultButtons}
          </div>
        </div>
      </div>
    )
  }

}

const PackageInfo = ({pkg}) =>
  <div className="details">
    <div className="content-title">
      <span>{(pkg.metadata && pkg.metadata.name) || pkg.filename}</span>
      {' '}
      <span>{pkg.metadata && pkg.metadata.version}</span>
    </div>
    <div className="content-description">
      {pkg.metadata ? pkg.filename : ''}
    </div>
    <hr/>
    <dl>
      <dt>Filename</dt>
      <dd>{pkg.filename}</dd>
      <dt>Type</dt>
      <dd>{pkg.type}</dd>
      <dt>Size</dt>
      <dd>{pkg.size}</dd>
      <dt>Modified</dt>
      <dd>{pkg.modified}</dd>
      <dt>Name</dt>
      <dd>{(pkg.metadata && pkg.metadata.name) || '-'}</dd>
      <dt>Version</dt>
      <dd>{(pkg.metadata && pkg.metadata.version) || '-'}</dd>
      <dt>Author</dt>
      <dd>{(pkg.metadata && pkg.metadata.author) || '-'}</dd>
      <dt>Author E-mail</dt>
      <dd>{(pkg.metadata && pkg.metadata.author_email) || '-'}</dd>
      <dt>Homepage</dt>
      <dd>{(pkg.metadata && pkg.metadata.home_page) || '-'}</dd>
      <dt>License</dt>
      <dd>{(pkg.metadata && pkg.metadata.license) || '-'}</dd>
    </dl>
  </div>;


export default PackageDetails;

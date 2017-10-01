import React from 'react';
import api from '../api';

class DeploymentDetails extends React.Component {
  constructor(props) {
    super(props);
    this.deploymentKey = props.match.params.key;
    this.state = { deployment: null }
  }

  componentDidMount() {
    api.get('/deployments/' + this.deploymentKey).then(
      result => {
        this.setState({ deployment: result });
      }
    )
  }

  render() {
    let content = null;
    if (this.state.deployment)
      content = <DeploymentInfo deployment={this.state.deployment} />;

    return (
      <div className="DeploymentDetails">
        <h1>Deployment Details</h1>
        <div className="content-box">
          {content}
        </div>
      </div>
    )
  }
}

const DeploymentInfo = ({deployment}) =>
  <div className="details">
    <div className="content-title">
      {deployment.key}
    </div>
    <hr/>
    <dl>
      <dt>Key</dt>
      <dd>{deployment.key}</dd>
      <dt>Project</dt>
      <dd>{deployment.project_key}</dd>
      <dt>Venv</dt>
      <dd>{deployment.venv_name}</dd>
      <dt>Package</dt>
      <dd>{deployment.package_filename}</dd>
      <dt>State</dt>
      <dd>{deployment.state}</dd>
    </dl>
  </div>;



export default DeploymentDetails;

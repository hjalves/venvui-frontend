import React from 'react';
import api from '../api';
import DeploymentConsole from './DeploymentConsole'

class DeploymentDetails extends React.Component {

  constructor(props) {
    super(props);
    this.deploymentKey = props.match.params.key;
    this.state = {
      deployment: null,
      logContents: [],
    };
    this.eventReader = null;
  }

  componentDidMount() {
    api.get('/deployments/' + this.deploymentKey).then(
      result => {
        this.setState({ deployment: result });
        this.getDeploymentLog();
      }
    )
  }

  componentWillUnmount() {
    if (this.eventReader) {
      this.eventReader.cancel();
      this.eventReader = null;
    }
  }

  setupEventReader(reader) {
    this.eventReader = reader;
    const readElement = (result) => {
      if (result.done)
        return;
      const event = result.value;
      if (event.event === 'state_changed')
        this.setState(state => ({deployment: {...state.deployment, state: event.state}}));
      // if (event.event === 'command_started' || event.event === 'command_finished' || event.event === 'command_output')
      this.setState(state => ({ logContents: state.logContents.concat(event) }));
      this.eventReader.read().then(readElement);
    };
    this.eventReader.read().then(readElement);
  }

  getDeploymentLog() {
    api.getStream('/deployments/' + this.deploymentKey + '/log').then((stream) => {
      const reader = stream.getReader();
      this.setupEventReader(reader);
    });
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
        <h2>Command Output</h2>
        <div className="content-box">
          <DeploymentConsole contents={this.state.logContents}/>
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
      <dt>Created At</dt>
      <dd>{deployment.created_at}</dd>
      <dt>Started At</dt>
      <dd>{deployment.started_at || '-'}</dd>
      <dt>Stopped At</dt>
      <dd>{deployment.stopped_at || '-'}</dd>
    </dl>
  </div>;


export default DeploymentDetails;

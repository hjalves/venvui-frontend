import React from 'react';
import api from '../api';
import DeploymentList from "./DeploymentList";

class DeploymentBrowser extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      deployments: []
    };
  }

  componentDidMount() {
    api.get('/deployments').then(
      result => {
        const deployments = result.deployments;
        this.setState({ deployments });
      }
    )
  }

  render() {
    return (
      <div className="DeploymentBrowser">
        <h1>Deployment Jobs</h1>
        <DeploymentList deployments={this.state.deployments}/>
      </div>
    )
  }
}

export default DeploymentBrowser;

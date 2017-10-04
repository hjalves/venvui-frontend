import React from 'react';

class DeploymentConsole extends React.Component {

  render() {
    return (
      <code className="DeploymentConsole">
        {this.props.contents.map((element, index) =>
          <div key={index}>{JSON.stringify(element)}</div>)}
      </code>
    )
  }

}

export default DeploymentConsole;


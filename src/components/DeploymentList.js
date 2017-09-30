import React from 'react';

const DeploymentList = ({deployments}) => {
  const deploymentRows = deployments.map((deployment) =>
    <tr key={deployment.key}>
      <td>{deployment.key}</td>
      <td>{deployment.package_filename}</td>
      <td>{deployment.state}</td>
    </tr>
  );

  return (
    <div className="content-box">
      <table>
        <thead>
        <tr>
          <th>Key</th>
          <th>Package</th>
          <th>State</th>
        </tr>
        </thead>
        <tbody>
        {deploymentRows}
        </tbody>
      </table>
    </div>
  );
};

export default DeploymentList;

import React from 'react';
import { Link } from 'react-router-dom';

const DeploymentList = ({deployments}) => {
  const deploymentRows = deployments.map((deployment) =>
    <tr key={deployment.key}>
      <td><Link to={"/deployments/" + deployment.key}>{deployment.key}</Link></td>
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

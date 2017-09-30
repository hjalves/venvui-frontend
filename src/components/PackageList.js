import React from 'react';
import { Link } from 'react-router-dom';

const PackageList = ({packages}) => {
  const packageRows = packages.map((pkg) =>
    <tr key={pkg.filename}>
      <td><Link to={"/packages/" + pkg.filename}>{pkg.filename}</Link></td>
      <td>{pkg.type}</td>
      <td>{pkg.metadata && pkg.metadata.name}</td>
      <td>{pkg.metadata && pkg.metadata.version}</td>
    </tr>
  );

  return (
    <div className="content-box">
      <table>
        <thead>
        <tr>
          <th>Filename</th>
          <th>Type</th>
          <th>Name</th>
          <th>Version</th>
        </tr>
        </thead>
        <tbody>
        {packageRows}
        </tbody>
      </table>
    </div>
  );
};

export default PackageList;

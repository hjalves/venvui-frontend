import React from 'react';

const ServicesList = ({services, handleCommand}) => {

  const handleClick = (name, startup) => {
    return (e) => {
      e.preventDefault();
      handleCommand(name, startup);
    }
  };

  const servicesRows = services.map((svc) =>
    <tr key={svc.name}>
      <td>{svc.name}</td>
      <td><a href="" onClick={handleClick(svc.name, svc.startup === 'enabled' ? 'disable' : 'enable')}>{svc.startup}</a></td>
      <td><a href="" onClick={handleClick(svc.name, svc.status === 'active' ? 'stop' : 'start')}>{svc.status}</a></td>
    </tr>
  );

  return (
    <div className="content-box">
      <table>
        <thead>
        <tr>
          <th>Name</th>
          <th>Auto-start</th>
          <th>Status</th>
        </tr>
        </thead>
        <tbody>
        {servicesRows}
        </tbody>
      </table>
    </div>
  );

};

export default ServicesList;
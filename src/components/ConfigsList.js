import React from 'react';

const ConfigsList = ({configs, handleInstall}) => {

  const handleClick = (name) => {
    return (e) => {
      e.preventDefault();
      handleInstall(name);
    }
  };

  const configsRows = configs.map((cfg) =>
    <tr key={cfg.name}>
      <td>{cfg.name}</td>
      <td>{cfg.template}</td>
      <td><a href="" onClick={handleClick(cfg.name)}>[install]</a></td>
    </tr>
  );

  return (
    <div className="content-box">
      <table>
        <thead>
        <tr>
          <th>Name</th>
          <th>Template</th>
          <th>Status</th>
        </tr>
        </thead>
        <tbody>
        {configsRows}
        </tbody>
      </table>
    </div>
  );

};

export default ConfigsList;
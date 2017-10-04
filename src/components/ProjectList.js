import React from 'react';
import { Link } from 'react-router-dom';

const ProjectList = ({projects}) => {
  const projectRows = projects.map((project) =>
    <tr key={project.key}>
      <td><Link to={"/projects/" + project.key}>{project.key}</Link></td>
      <td>{project.name}</td>
    </tr>
  );

  return (
    <div className="content-box">
      <table>
        <thead>
        <tr>
          <th>Key</th>
          <th>Name</th>
        </tr>
        </thead>
        <tbody>
        {projectRows}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectList;

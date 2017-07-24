import React, { Component } from 'react';


class ProjectBrowser extends Component {

  constructor(props) {
    super(props);
    console.log("Created new ProjectBrowser");
  }

  render() {
    const projects = this.props.projects.map((project) =>
      <tr key={project.key}>
        <td>{project.key}</td>
        <td>{project.name}</td>
      </tr>
    );

    return (
      <div className="ProjectBrowser">
        <h1>Project Browser</h1>
        <div className="content-box">
          <div className="ProjectList">
            <table>
              <thead>
              <tr>
                <th>Key</th>
                <th>Name</th>
              </tr>
              </thead>
              <tbody>
              {projects}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

export default ProjectBrowser;

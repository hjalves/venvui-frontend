import React from 'react';
import { Redirect } from 'react-router-dom';
import api from '../api'

class ProjectCreator extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      key: "",
      name: "",
      createdProjectKey: null
    };
  }

  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({[name]: value});
  };

  handleSubmit = (event) => {
    // Create project
    event.preventDefault();
    console.log(this.state);
    api.post('/projects', {key: this.state.key, name: this.state.name}).then(
      result => {
        this.setState({ createdProjectKey: result.key});
      }
    )
  };

  render() {
    if (this.state.createdProjectKey)
      return <Redirect push to={'/projects/' + this.state.createdProjectKey} />;

    return (
      <div className="ProjectCreator">
        <h1>New Project</h1>
        <div className="content-box">
          <div className="edit-form">
            <form id="new-project-form" onSubmit={this.handleSubmit}>
              <label htmlFor="project-key">Key</label>
              <input id="project-key" type="text" name="key" value={this.state.key}
                     onChange={this.handleChange} required/>
              <label htmlFor="project-name">Name</label>
              <input id="project-name" type="text" name="name" value={this.state.name}
                     onChange={this.handleChange} required/>
              <button type="submit">Create</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default ProjectCreator;

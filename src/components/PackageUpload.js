import React from 'react';
import { Redirect } from 'react-router-dom';
import api from '../api'


class PackageUpload extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      files: null,
      saved: null
    };
  }

  handleChange = (event) => {
    this.setState({ files: event.target.files })
  };

  handleSubmit = (event) => {
    // Upload file
    event.preventDefault();
    const formData = new FormData(event.target);
    api.postFile('/packages', formData).then(result => {
      this.setState( {saved: result.saved} )
    });
  };

  render() {
    if (this.state.saved && this.state.saved.length === 1)
      return <Redirect push to={'/packages/' + this.state.saved[0].filename} />;
    if (this.state.saved && this.state.saved.length >= 2)
      return <Redirect push to="/packages" />;

    return (
      <div className="PackageUpload">
        <h1>Upload package</h1>
        <div className="content-box">
          <div className="edit-form">
            <form id="new-project-form" onSubmit={this.handleSubmit}>
              <label htmlFor="package-file">File</label>
              <input id="package-file" type="file" name="file"
                     onChange={this.handleChange} required multiple/>
              <button type="submit">Upload</button>
            </form>
          </div>
        </div>
      </div>
    )
  }

}

export default PackageUpload;
import React from 'react';
import api from '../api'

class PackageDetails extends React.Component {

  constructor(props) {
    super(props);
    this.filename = props.match.params.filename;
    this.state = {
      package: null
    }
  }

  componentDidMount() {
    api.get('/packages/' + this.filename).then(
      result => {
        this.setState({ package: result });
      }
    )
  }

  render() {

    let content = null;
    if (this.state.package) {
      content = <PackageInfo pkg={this.state.package}/>;
    }

    return (
      <div className="PackageDetails">
        <h1>Package Details</h1>
        {content}
      </div>
    )
  }

}

const PackageInfo = ({pkg}) =>
  <div className="content-box details">
    <div className="content-title">
      <span>{pkg.metadata && pkg.metadata.name || pkg.filename}</span>
      {' '}
      <span>{pkg.metadata && pkg.metadata.version}</span>
    </div>
    <div className="content-description">
      {pkg.metadata ? pkg.filename : ''}
    </div>
    <hr/>
    <dl>
      <dt>Filename</dt>
      <dd>{pkg.filename}</dd>
      <dt>Type</dt>
      <dd>{pkg.type}</dd>
      <dt>Modified</dt>
      <dd>{pkg.modified}</dd>
      <dt>Name</dt>
      <dd>{pkg.metadata && pkg.metadata.name || '-'}</dd>
      <dt>Version</dt>
      <dd>{pkg.metadata && pkg.metadata.version || '-'}</dd>
      <dt>Author</dt>
      <dd>{pkg.metadata && pkg.metadata.author || '-'}</dd>
      <dt>Author E-mail</dt>
      <dd>{pkg.metadata && pkg.metadata.author_email || '-'}</dd>
      <dt>Homepage</dt>
      <dd>{pkg.metadata && pkg.metadata.home_page || '-'}</dd>
      <dt>License</dt>
      <dd>{pkg.metadata && pkg.metadata.license || '-'}</dd>
    </dl>
  </div>;


export default PackageDetails;

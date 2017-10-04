import React from 'react';
import { Route, Switch } from 'react-router-dom'
import Sidebar from './Sidebar'
import Home from './Home'
import ProjectBrowser from './ProjectBrowser'
import ProjectDetails from './ProjectDetails'
import PackageBrowser from './PackageBrowser'
import DeploymentBrowser from './DeploymentBrowser'
import PackageDetails from './PackageDetails'
import DeploymentDetails from './DeploymentDetails'


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentNavigation: "home",
      projects: []
    };
  }

  render() {
    return (
      <div>
        <Sidebar />
        <main className="content" id="main-content">
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/projects' component={ProjectBrowser}/>
            <Route exact path='/projects/:key' component={ProjectDetails}/>
            <Route exact path='/packages' component={PackageBrowser}/>
            <Route exact path='/packages/:filename' component={PackageDetails}/>
            <Route exact path='/deployments' component={DeploymentBrowser}/>
            <Route exact path='/deployments/:key' component={DeploymentDetails}/>
          </Switch>
        </main>
      </div>
    )
  }
}

export default App;

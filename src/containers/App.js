import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom'
import Sidebar from './Sidebar'
import Home from './Home'
import RestClient from '../utils/RestClient'
import ProjectBrowser from './ProjectBrowser'






const mapStateToProps = state => {
  return {
    projects: state.projects
  }
};

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentNavigation: "home",
      projects: []
    };
  }

  // Operations

  navigation = (action) => {
    const navFunc = this[action];
    if (navFunc !== undefined) {
      navFunc();
    } else {
      console.log("Unknown navigation action: " + action);
    }
  };

  listProjects = () => {
    this.api.get('/projects').then(
      result => {
        this.setState({
          projects: result.projects,
          currentNavigation: "listProjects"
        });
      }
    );
  };

  render() {
    // const renderContent = nav => {
    //   console.log("Render navigation: %s", nav);
    //   switch (nav) {
    //     case "listProjects":
    //       return <ProjectBrowser projects={this.state.projects}/>;
    //     default:
    //       console.log("navigation not implemented:", nav);
    //   }
    // };
    //
    // return (
    //   <div className="App">
    //     <Sidebar setNavigation={this.navigation}/>
    //     <div className="content" id="main-content">
    //       {renderContent(this.state.currentNavigation)}
    //     </div>
    //   </div>
    // );

    // return (
    //   <div>
    //     <div className="Sidebar">
    //       <div className="nav">
    //         <div className="logo">ＶＥＮＶＵＩ</div>
    //       </div>
    //
    //       <div className="nav">
    //         <ul>
    //           <li className="title">Projects</li>
    //           <li><Link to="/list-projects">Browse</Link></li>
    //           <li><Link to="/create-project">Create</Link></li>
    //         </ul>
    //       </div>
    //
    //     </div>
    //
    //     <Route exact path="/" component={ProjectBrowser}/>
    //   </div>
    // )
    return (
      <div>
        <Sidebar />
        <main className="content" id="main-content">
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/projects' component={ProjectBrowser}/>
          </Switch>
        </main>
      </div>
    )
  }
}

export default App;

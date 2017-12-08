import React, { Component } from 'react'
import {Layout,Sidebar,Content,SidebarList,SidebarListItem} from './Styles'
import Home from './Home'
import Playground from './Playground'
import './App.css'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'



export default class extends Component {
  render() {
    return (
      <Router>
        <Layout>
          <Sidebar>
            <ul className="sidebar">
              <li><Link to="/home">Home</Link></li>
              <li><Link to="/playground">Playground</Link></li>
            </ul>
          </Sidebar>
          <Content>
            <Route path="/home" component={Home}/>
            <Route path="/playground" component={Playground}/>
          </Content>
        </Layout>
      </Router>
    )
  }
}
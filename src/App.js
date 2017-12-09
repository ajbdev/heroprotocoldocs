import React, { Component } from 'react'
import {Layout,Sidebar,Content,SideTitle} from './Styles'
import Home from './Home'
import Playground from './Playground'
import logo from './logo.svg'
import Document from './Document'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import { TableOfContents } from './TableOfContents'

export default class extends Component {
  render() {
    return (
      <Router>
        <Layout>
        <link href="https://fonts.googleapis.com/css?family=Arvo:400,700|Lato:400,400i,700" rel="stylesheet" />
        <Sidebar>
          <SideTitle>
            Heroes of the Storm
            <img src={logo} />
            <div>Protocol Documentation</div>
          </SideTitle>
          <TableOfContents />
          <ul className="sidebar">
            <li><Link to="/playground">Playground</Link></li>
          </ul>
        </Sidebar>
        <Content>
          <Route path="/docs/:doc" component={Document} />
          <Route path="/home" component={Home}/>
          <Route path="/playground" component={Playground}/>
        </Content>
        </Layout>
      </Router>
    )
  }
}
import React, { Component } from 'react'
import {Layout,Sidebar,Content,SideTitle} from './Styles'
import Playground from './Playground'
import logo from './logo.svg'
import Document from './Document'
import {
  HashRouter as Router,
  Route,
  DefaultRoute,
  NavLink,
  Link
} from 'react-router-dom'
import Home from './Home'
import TableOfContents from './TableOfContents'

export default class extends Component {
  render() {
    return (
      <Router>
        <Layout>
        <Sidebar>
          <SideTitle>
            Heroes of the Storm
            <Link to="/"><img src={logo} /></Link>
            <div>Protocol Documentation</div>
          </SideTitle>
          <ul>
            <li><NavLink to="/">Introduction</NavLink></li>
            <TableOfContents LinkElement={NavLink} />
            <li><NavLink to="/playground">Playground</NavLink></li>
          </ul>
        </Sidebar>
        <Content>
          <Route path="/" exact component={Home} />
          <Route path="/docs/:doc" component={Document} />
          <Route path="/playground" component={Playground}/>
        </Content>
        </Layout>
      </Router>
    )
  }
}
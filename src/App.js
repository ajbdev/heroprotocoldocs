import React, { Component } from 'react'
import {Layout,Sidebar,Content,SideTitle} from './Styles'
import Playground from './Playground'
import logo from './logo.svg'
import replayContainer from './replay'
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
import heroprotocol, {MPQArchive} from 'heroprotocol'
import axios from 'axios'

export default class extends Component {
  constructor() {
    super()
    this.state = { replay: null }
    this.parts = [
        heroprotocol.ATTRIBUTES_EVENTS,
        heroprotocol.DETAILS,
        heroprotocol.GAME_EVENTS,
        heroprotocol.HEADER,
        heroprotocol.INITDATA,
        heroprotocol.MESSAGE_EVENTS,
        heroprotocol.TRACKER_EVENTS
    ]
  }

  componentDidMount() {
    replayContainer.onChange = (file) => {
      this.setState({ replay: file })
    }
    axios
        .get('Garden of Terror (122).StormReplay', {responseType: 'arraybuffer'})
        .then((resp) => {
            this.loadReplay(resp.data)
        }, (err) => {})
  }

  loadReplay(rawData) {
    const buffer = Buffer.from(rawData)
    const archive = new MPQArchive(buffer)

    const parts = this.parts
    const data = {}

    for (let p in parts) {
        try {
            data[parts[p]] = heroprotocol.get(parts[p], archive)
        } catch (ex) {
            console.log(ex)
        }
    }

    replayContainer.set(data)
  }

  handleUpload(evt) {
    const files = evt.target.files

    if (files.length === 0) {
        return
    }

    const reader = new FileReader();

    const loadReplay = this
        .loadReplay
        .bind(this)

    reader.onload = function (e) {
        const file = reader.result
        loadReplay(file)
    }

    reader.readAsArrayBuffer(files[0])
}

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
          <Route path="/docs/:doc" component={(props) => <Document match={props.match} replay={this.state.replay} />} />
          <Route path="/playground" component={() => <Playground upload={this.handleUpload.bind(this)} replay={this.state.replay} />}/>
        </Content>
        </Layout>
      </Router>
    )
  }
}
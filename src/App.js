import React, { Component } from 'react'
import heroprotocol, { MPQArchive } from 'heroprotocol'
import axios from 'axios'
import './App.css'
import JsonView from 'react-json-view'

class App extends Component {
  constructor() {
    super()

    this.state = { 
      replay: null,
      parts: [ 
        heroprotocol.ATTRIBUTES_EVENTS,
        heroprotocol.DETAILS,
        heroprotocol.GAME_EVENTS,
        heroprotocol.HEADER,
        heroprotocol.INITDATA,
        heroprotocol.MESSAGE_EVENTS,
        heroprotocol.TRACKER_EVENTS
      ]
    }
  }
  componentDidMount() {
    axios.get('Garden of Terror (122).StormReplay', { responseType: 'arraybuffer' }).then((resp) => {

      const buffer = Buffer.from(resp.data)
      const archive = new MPQArchive(buffer)

      const parts = this.state.parts
      const data = {}

      for (let p in parts) {
        try {
          data[parts[p]] = heroprotocol.get(parts[p], archive)
        } catch(ex) {
          console.log(ex)
        }
      }
      console.log(data)

      this.setState({ replay: data})
    }, (err) => {
      
    })
  }
  render() {
    return (
      <div className="App">
        <link href="https://fonts.googleapis.com/css?family=Inconsolata" rel="stylesheet" />
        {this.state.replay ? <JsonView src={this.state.replay} displayDataTypes={false} theme="hopscotch" collapsed={true} /> : null}
      </div>
    )
  }
}

export default App
import React, {Component} from 'react'
import heroprotocol, {MPQArchive} from 'heroprotocol'
import axios from 'axios'
import JsonView from 'react-json-view'
import Repl from './Repl'

import objectDepth from 'object-depth'
import objectSize from 'object-sizeof'
import {Button} from './Styles'
import {UploadReplay} from './UploadReplay'

export default class extends Component {
    constructor() {
        super()

        this.state = {
            replay: null,
            result: null,
            collapsed: true,
            code: this.getDefaultCode(),
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
    getDefaultCode() {
        return `function get(replay) {
  // Example usage (shows player names):
  // 
  // return replay['replay.details'].m_playerList.map((player) => player.m_name)

  return replay  
}
`
    }
    componentDidMount() {
        axios
            .get('Garden of Terror (122).StormReplay', {responseType: 'arraybuffer'})
            .then((resp) => {
                this.loadReplay(resp.data)
            }, (err) => {})
    }

    loadReplay(rawData) {
        const buffer = Buffer.from(rawData)
        const archive = new MPQArchive(buffer)

        const parts = this.state.parts
        const data = {}

        for (let p in parts) {
            try {
                data[parts[p]] = heroprotocol.get(parts[p], archive)
            } catch (ex) {
                console.log(ex)
            }
        }

        this.setState({
            replay: data
        }, () => {
            this.runCode()
        })
    }

    runCode() {
        if (!this.state.replay) {
            return
        }

        const code = `return ${this.state.code}`

        let result = this.state.result
        try {
            result = new Function('replay', code)()(this.state.replay)
        } catch (ex) {
            result = {
                error: ex.message
            }
        }

        let shouldCollapse = false

        if (objectSize(result) > 80000 || objectDepth(result) > 4) {
            shouldCollapse = true
        }

        this.setState({result: result, collapsed: shouldCollapse})

    }

    runKey() {
        return navigator
            .platform
            .match(/(Mac|iPhone|iPod|iPad)/i)
            ? 'CMD'
            : 'CTRL';
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
            <div>
                <Button
                    onClick={this
                    .runCode
                    .bind(this)}>▶ Run ({this.runKey()}+S)</Button>
                <UploadReplay
                    onChange={this
                    .handleUpload
                    .bind(this)}/>
                <Repl
                    code={this.state.code}
                    onChange={(code) => {
                    this.setState({code: code})
                }}
                    run={this
                    .runCode
                    .bind(this)}/> {this.state.result
                    ? <JsonView
                            src={this.state.result}
                            name={false}
                            displayDataTypes={false}
                            theme="hopscotch"
                            collapsed={this.state.collapsed}/>
                    : null}
            </div>
        )
    }
}
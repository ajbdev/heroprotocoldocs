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
            result: null,
            collapsed: true,
            code: this.getDefaultCode(),
        }
    }

    componentDidMount() {
        this.runCode()
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

    runCode() {
        if (!this.props.replay) {
            return
        }

        const code = `return ${this.state.code}`

        let result = this.state.result
        try {
            result = new Function('replay', code)()(this.props.replay)
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

    render() {
        return (
            <div>
                <Button
                    onClick={this
                    .runCode
                    .bind(this)}>▶ Run ({this.runKey()}+S)</Button>
                <UploadReplay
                    onChange={this.props.upload}/>
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
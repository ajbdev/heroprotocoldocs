import React, {Component} from 'react'
import docs from './docs'

export default class extends Component {
    render() {
        const Markdown = docs[this.props.match.params.doc]

        return (
            <Markdown replay={this.props.replay} />
        )
    }
}

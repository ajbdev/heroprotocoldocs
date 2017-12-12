import React, {Component} from 'react'
import docs from './docs'

export default class extends Component {
    render() {
        const markdown = docs[this.props.match.params.doc]


        return (
            <div dangerouslySetInnerHTML={{__html: markdown}} />
        )
    }
}

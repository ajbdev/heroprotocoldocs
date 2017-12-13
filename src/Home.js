import React, {Component} from 'react'
import docs from './docs'
import TableOfContents from './TableOfContents'
import {Link} from 'react-router-dom'

export default class extends Component {
    render() {
        return (
            <div>
                <h1>Heroes of the Storm Protocol Documentation</h1>
                
                This guide is meant for people of varying degrees of knowledge. If you are new to understanding Heroes of the Storm replays, <Link to="/docs/basics">the basics</Link> is a great place to learn about what StormReplay files are and how they work.
                <br /><br />
                If you understand the basics, you might want to jump into the details right away. 
                <ul>
                    <TableOfContents />
                </ul>
                This site also contains a javascript based replay decoder that you can use right in your browser (and upload your own replays to explore).{' '}
                <Link to="/playground">Take a look at the playground</Link> to run the decoder in your browser.

                <br /><br />
                <b>Note: </b> this site requires a modern browser to show the example replay data. This site has only been tested Chrome 63 and Firefox 57. If you can see this notice, it will probably work for you.

                <h2>Contributing to this documentation</h2>
                Fork this repo: and modify any of the markdown files in the <code>src/docs</code> folder.    
            </div>
        )
    }
}

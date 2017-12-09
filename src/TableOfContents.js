import React, {Component} from 'react'
import {Toc} from './Styles'
import { Route,  Link } from 'react-router-dom'
import introduction from './docs/introduction.md'

export class TableOfContents extends Component {
    render() {
        return (
            <div>
                <ul className="sidebar">
                    <li><Link to={{ pathname: '/docs/introduction', state: { markdown: 'whatever' } }} params={{ thingie: 'hi' }}>Introduction</Link></li>
                </ul>
            </div>
        )
    }
}

import React, {Component} from 'react'
import {Toc} from './Styles'
import { Route,  Link } from 'react-router-dom'
import docs from './docs'

function label(str) {
    return str.replace(/([A-Z]+)/g, " $1").replace(/([A-Z][a-z])/g, " $1").replace(/\b\w/g, l => l.toUpperCase())
}

export default function toc(props) {

    const LinkElement = props.LinkElement || Link

    return (Object.keys(docs).map((doc) => <li key={doc}><LinkElement to={{ pathname: `/docs/${doc}` }}>{label(doc)}</LinkElement></li>))
}
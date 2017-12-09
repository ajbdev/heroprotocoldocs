import React, {Component} from 'react'

export default class extends Component {
    render() {
        console.log(this.props)

        import doc from `./docs/${this.props.match.params.doc}.md`

        return (
            <div>
                Hello Intro
            </div>
        )
    }
}

import { render } from 'react-dom'
import * as React from 'react'

export module App {
    export function main() {

        type MyTagAttributes = { title?: string, text: string }

        const MyTag = ({ title, text }: MyTagAttributes) =>
            <div>
                <h1>{title || "Default title"}</h1>
                <div>{text}</div>
            </div>

        render(<MyTag title="yo" text="hello world" />, document.body)
    }
}

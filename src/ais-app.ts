import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('app')
export class TabContainer extends LitElement {

    @property({attribute: 'count'})
    count = 0;

    // static styles = css`
    //     host
    // `

    render () {
        return html`${this.count}`
    }
}
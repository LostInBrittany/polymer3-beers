import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

export class BeerNotFound extends PolymerElement {

  static get template() {
    return html`
      <div>Route not found: [[location.pathname]]</div>
    `;
  }

  static get properties() {
    return {
      location: {
        type: Object,
      },
    };
  }
}

customElements.define('beer-not-found', BeerNotFound);
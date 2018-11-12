// Import PolymerElement class and html helper definition
import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

// Define the element's class element
export class BeerListItem extends PolymerElement {

  static get template() {
    return html`
      <style>
        .beer {
          margin: 10px;
          padding: 10px;
          border: solid 1px black;
          border-radius: 10px;
          min-height: 50px;
        }
      </style>
      <div class="beer">
        <h2>[[name]]</h2>
        <p>[[description]]</p>
      </div>
    `;
  }

  static get properties() {
    return {
      name: {
        type: String,
      },
      description: {
        type: String,
      }
    }
  }

  // Element class can define custom element reactions
  connectedCallback() {
    super.connectedCallback();
    console.log('beer-list-item created!');
  }

  ready() {
    super.ready();
    console.log('beer-list-item is ready!');
  }
}

// Associate the new class with an element name
customElements.define('beer-list-item', BeerListItem);
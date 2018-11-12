// Import PolymerElement class and html helper definition
import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

import '@granite-elements/granite-bootstrap/granite-bootstrap.js';

// Define the element's class element
export class BeerListItem extends PolymerElement {

  static get template() {
    return html`
      <style include="granite-bootstrap"></style>
      <style>
        .beer {
          margin: 10px;
          padding: 10px;
          border: solid 1px black;
          border-radius: 10px;
          min-height: 150px;
        }
        .el-img {
          max-height: 100px;
        }
        .el-alcohol {
          clear:both;
        }
      </style>
      <div id="[[id]]" class="beer clearfix">
        <img class="float-right el-img" src="/data/beers/[[img]]">
        <h2 class="el-name">[[name]]</h2>
        <p class="el-description">[[description]]</p>
        <p class="float-right el-alcohol">Alcohol content: [[alcohol]]%</p>
      </div>
    `;
  }

  static get properties() {
    return {
      id: {
        type: String,
      },
      name: {
        type: String,
      },
      description: {
        type: String,
      },
      img: {
        type: String,
      },
      alcohol: {
        type: String,
      },
    }
  }
}

// Associate the new class with an element name
customElements.define('beer-list-item', BeerListItem);
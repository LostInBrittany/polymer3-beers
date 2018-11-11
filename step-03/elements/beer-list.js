import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

// Import template repeater
import '@polymer/polymer/lib/elements/dom-repeat.js';

import '@granite-elements/granite-bootstrap/granite-bootstrap';

import './beer-list-item.js';

export class BeerList extends PolymerElement {

  static get template() {
    return html`
      <style include="granite-bootstrap"></style>
      <div class="beers container">
        <template is="dom-repeat" items="{{beers}}">
          <beer-list-item name="{{item.name}}" description="{{item.description}}">
          </beer-list-item>
        </template>
      </div>

      <div class="container">Number of beers in list: [[beers.length]]</div>
    `;
  }

  static get properties() {
    return {
      beers: {
        type: Array,
      },
    }
  }

  constructor() {
    super();
    
    this.beers = [
      {
        alcohol: 8.5,
        name: "Affligem Tripel",
        description: "The king of the abbey beers. It is amber-gold and pours with a deep head and original aroma, delivering a complex, full bodied flavour. Pure enjoyment! Secondary fermentation in the bottle."
      },
      {
        alcohol: 9.2,
        name: "Rochefort 8",
        description: "A dry but rich flavoured beer with complex fruity and spicy flavours."
      },
      {
        alcohol: 7,
        name: "Chimay Rouge",
        description: "This Trappist beer possesses a beautiful coppery colour that makes it particularly attractive. Topped with a creamy head, it gives off a slight fruity apricot smell from the fermentation. The aroma felt in the mouth is a balance confirming the fruit nuances revealed to the sense of smell. This traditional Belgian beer is best savoured at cellar temperature "
      }
    ];
  }
}

customElements.define('beer-list', BeerList);
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
        <div class="row">
          <div class="col-md-3">
            <!--Sidebar content--> 
            <div class="form-group">
              <label for="search">Search</label>
              <input 
                  type="text" 
                  class="form-control" 
                  id="search"  
                  placeholder="Enter search"
                  on-input="_inputChange">
              <label for="sort">Sort by</label>
              <select 
                  id="sort" 
                  class="form-control"
                  on-change='_sortingChanged'>
                <template is="dom-repeat" items="[[criteria]]">
                  <option 
                      value="[[item.name]]">
                    [[item.label]]
                  </option>
                </template>
              </select>
              <label for="descending">Descending sort</label>
              <input 
                  id="descending" 
                  type="checkbox" 
                  on-change="_descendingChange">
            </div>
          </div>
          <div class="col-md-9">
            <div class="beers">
              <template 
                  id="beerList" is="dom-repeat" 
                  items="[[beers]]" filter="_beerFilter" sort="_beerSorter">
                <beer-list-item name="[[item.name]]" description="[[item.description]]">
                </beer-list-item>
              </template>
            </div>
            <div>Number of beers in list: [[currentBeers]]</div>
          </div>          
        </div>
      </div>
    `;
  }

  static get properties() {
    return {
      beers: {
        type: Array,
      },
      filterText: {
        type: String,
      },
      currentBeers: {
        type: String,
        computed: '_getCurrentBeers(beers, filterText)',
      },
      criterium: {
        type: String,
      },
      descendingSort: {
        type: Boolean,
      }
    }
  }

  _inputChange() {
    this.filterText = this.$.search.value;
    this.$.beerList.render();
  }

  _sortingChanged() {
    this.criterium = this.$.sort.selectedOptions[0].value;
    this.$.beerList.render();
  }

  _descendingChange() {
    this.descendingSort = this.$.descending.checked;
    this.$.beerList.render();
  }

  _beerFilter(item) {
      return item.name.match(new RegExp(this.filterText, 'i'));
  }

  _beerSorter(a, b) {
    var invert = 1;
    if (this.descendingSort) invert = -1;
    if ( a[this.criterium] === b[this.criterium] ) return 0;
    if ( a[this.criterium] < b[this.criterium] ) return -1*invert;
    if ( a[this.criterium] > b[this.criterium] ) return 1*invert;         
  }

  _getCurrentBeers() {
    return this.beers.filter((item) => item.name.match(new RegExp(this.filterText, 'i'))).length;
  }

  constructor() {
    super();
    this.beers = [
      {
        "alcohol": 6.8,
        "name": "Affligem Blond",
        "description": "Affligem Blonde, the classic clear blonde abbey ale, with a gentle roundness and 6.8% alcohol. Low on bitterness, it is eminently drinkable."
      },
      {
        "alcohol": 8.5,
        "name": "Affligem Tripel",
        "description": "The king of the abbey beers. It is amber-gold and pours with a deep head and original aroma, delivering a complex, full bodied flavour. Pure enjoyment! Secondary fermentation in the bottle."
      },
      {
        "alcohol": 9.2,
        "name": "Rochefort 8",
        "description": "A dry but rich flavoured beer with complex fruity and spicy flavours."
      },
      {
        "alcohol": 11.3,
        "name": "Rochefort 10",
        "description": "The top product from the Rochefort Trappist brewery. Dark colour, full and very impressive taste. Strong plum, raisin, and black currant palate, with ascending notes of vinousness and other complexities."
      },
      {
        "alcohol": 7,
        "name": "Chimay Rouge",
        "description": "This Trappist beer possesses a beautiful coppery colour that makes it particularly attractive. Topped with a creamy head, it gives off a slight fruity apricot smell from the fermentation. The aroma felt in the mouth is a balance confirming the fruit nuances revealed to the sense of smell. This traditional Belgian beer is best savoured at cellar temperature "
      }
    ];

    this.criteria = [
      { name: "name", label: "Alphabetical"},
      { name: "alcohol", label: "Alcohol content" }
    ];

    this.criterium = this.criteria[0].name;
  }
}

customElements.define('beer-list', BeerList);
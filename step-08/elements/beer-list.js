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
              <label for="sort" class="mt-3">Sort by</label>
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
              <label for="descending" class="mt-3">Descending sort</label>
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
                <beer-list-item 
                    id="[[item.id]]"
                    name="[[item.name]]" 
                    description="[[item.description]]"
                    img="[[item.img]]"
                    alcohol="[[item.alcohol]]">
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

  async _getData() {
    try {
      const response = await fetch('/data/beers/beers.json');
      this.beers = await response.json();
    }
    catch (err) {
      console.log('fetch failed', err);
    }
  }

  constructor() {
    super();
    this.beers = [];

    this.criteria = [
      { name: "name", label: "Alphabetical"},
      { name: "alcohol", label: "Alcohol content" }
    ];

    this.criterium = this.criteria[0].name;

    this._getData();
  }
}

customElements.define('beer-list', BeerList);
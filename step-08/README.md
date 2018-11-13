# ![](/img/logo-25px.png) Polymer Beers - Polymer tutorial - Step 08

Now we are going to have two different "pages" (or *views*) in our Polymer Beers application, one for the beer list and another for a single beer detail.

## Beer detail component

We are going to create a `beer-detail` component that calls to a *beer details* service (or in these case, a set of *beer details* JSON files) to recover and show more information on the chosen beer.


Let's  begin by creating the element:

```js
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

import '@granite-elements/granite-bootstrap/granite-bootstrap';

export class BeerDetail extends PolymerElement {

  static get template() {
    return html`
      <style include="granite-bootstrap"></style>
    `;
  }

  static get properties() {
    return {
    };
  }
}

customElements.define('beer-detail', BeerDetail);
```

The template includes a `beer` object whose attributes found in the detailed JSON file for each beer.

```js
  static get properties() {
    return {
      id: {
        type: String,
      },
      beer: {
        type: Object,
      }
    };
  }
```

Using a *fetch* we will call the file according to the beer `id`.


We begin by placing an observer on `id`. The observer will detect changes on `id` and call a function that does
the fetching:

```js


  static get properties() {
    return {
      id: {
        type: String,
        observer: '_onIdChange',
      },
      beer: {
        type: Object,
      },
    };
  }

  async _onIdChange() {
    const url = `/data/beers/details/${this.id}.json`;
    try {
      const response = await fetch(url);
      this.beer = await response.json();
    }
    catch (err) {
      console.log('fetch failed', err);
    }
  }
```

In the template we add some style:

```html
    <style>
      .beer {
        margin: 10px;
        padding: 10px;
        border: solid 1px black;
        border-radius: 10px;
        min-height: 150px;
      }
      .back {
        width: 50px;
        height: 50px;
      }
      .img {
        float: left;
        border: 1px solid black;
        margin-right: 3em;
        margin-bottom: 2em;
        background-color: white;
        padding: 2em;
        height: 400px;
        width: 400px;
      }
      .alcohol {
        clear:both;
      }

      ul.beer-thumbs {
        margin: 0;
        list-style: none;
      }

      ul.beer-thumbs li {
        border: 1px solid black;
        display: inline-block;
        margin: 1em;
        background-color: white;
      }

      ul.beer-thumbs img {
        height: 100px;
        width: 100px;
        padding: 1em;
      }

      ul.specs {
        clear: both;
        margin: 0;
        padding: 0;
        list-style: none;
      }

      ul.specs > li{
        display: inline-block;
        width: 200px;
        vertical-align: top;
      }

      ul.specs > li > span{
        font-weight: bold;
        font-size: 1.2em;
      }

      ul.specs dt {
        font-weight: bold;
      }

      h1 {
        border-bottom: 1px solid gray;
      }
    </style>
```

And then we show the beer information:

```html

    <div id="{{beer.id}}" class="beer clearfix">
      <a href="#/beers"><img class="pull-right back" src="../img/back.png"></a>
      <h1 class="name">{{beer.name}}</h1>
      <img class="pull-right img" src="../../data/{{mainImg}}">
      <p class="description">{{beer.description}}</p>

      <ul class="beer-thumbs">
        <li>
          <img src="../../data/{{beer.img}}" beer="{{beer.img}}" on-click="setImage">
        </li>
        <li>
          <img src="../../data/{{beer.label}}" beer="{{beer.label}}" on-click="setImage">
        </li>
      </ul>
      <ul class="specs">
        <li>
          <dl>
            <dt>Alcohol content</dt>
            <dd>{{beer.alcohol}}%</dd>
          </dl>
        </li>
        <li>
          <dl>
            <dt>Brewery</dt>
            <dd>{{beer.brewery}}</dd>
          </dl>
        </li>
        <li>
          <dl>
            <dt>Availability</dt>
            <dd>{{beer.availability}}</dd>
          </dl>
        </li>
        <li>
          <dl>
            <dt>Style</dt>
            <dd>{{beer.style}}</dd>
          </dl>
        </li>
        <li>
          <dl>
            <dt>Serving instructions</dt>
            <dd>{{beer.serving}}</dd>
          </dl>
        </li>
      </ul>
    </div>
```

Now we can add `beer-detail` in the routing options of `beer-main`:

```js

```
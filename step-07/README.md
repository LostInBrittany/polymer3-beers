# ![](/img/logo-25px.png) Polymer Beers - Polymer tutorial - Step 07

What if we wanted to show more details about a beer when we click on it? We can imagine opening another panel with the detailed information.

In Angular, Vue or React we would get this behaviour by using a router, and defining the routing conditions in the global application definition. How can we do it with web components?

Well, in the same way, we can use a router, like [`app-route`](https://www.webcomponents.org/element/@polymer/app-route), the official Polymer router web-components.

So we are going to use *app-route* to do the routing side of our app without having to change things in our elements.

## Creating a `beer-main` element

The first thing we are going to do is to create a main element that will do the routing and choose either to show the beer list or the detail on a beer.

Let's create `beer-main`:

```js

import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

export class BeerMain extends PolymerElement {

  static get template() {
    return html`
    `;
  }


  static get properties() {
    return {
    };
  }
}


customElements.define('beer-main', BeerMain);
```

Now we are going to add `app-route` to it. 

First of all, me need to install `app-route` using `npm`:

```shell
npm i @polymer/app-route
```

Then we need to import `app-route` and its companion `app-location` into `beer-main`:

```js
import '@polymer/app-route/app-route';
import '@polymer/app-route/app-location';
```

It's important to understand the role of these two elements...


## `<app-route>` and `<app-location>`

In order to use  *app-route* for your application route, you need to understand the two elements offered by this library:
`app-route` and `app-location`.


### `<app-route>`

`<app-route>` simply matches an input path against a specified pattern. The input path doesn't come necessarily from the URL, it's a  normal Polymer variable boun d to the  `<app-route>`'s `route` attribute. Here you have an example:

```
<app-route route="[[route]]" pattern="/test" active="[[active]]"></app-route>
```

If `route` variable matches `/test` pattern, `<app-route>` will set `active` to `true`, else `active` will be `false`.

`<app-route>` deals with hierarchical, slash separated paths. You give it a pattern, and it tells you when the input matches.

If the pattern contains any variables, like `/:page` then the extracts that portion of the matched URL and exposes it via the `data` object.


### `<app-location>`

`<app-route>` doesn’t know about the URL, it just knows about paths. While you’ll have many `<app-route>` elements in your app, there’s only one URL bar. The URL is global. So we’ve got an element whose single responsibility is connecting the URL to your app. We call this element `<app-location>`, and it exposes a route property suitable for binding into a `<app-route>`, like so:

```html
<app-location route="{{route}}"></app-location>
<app-route
    route="[[route]]"
    pattern="/:page"
    data="{{data}}"
    tail="{{tail}}">
</app-route>
```

> The `{{variable}}` notation indicates a *two-way data-binding*, i.e. the element detects a change in the attribute and changes the  JS property accordly. It's considered a dangerous practice permformance-wise, and you should avoid it in most cases.
> But in the case of `app-route` and `app-location`, having the two-way data-binding is the easiest way to implement the pattern.

For client-side applications, changing the URL is a risky business, you need a server side application serving the right content.
Helpfully, `<app-location>` provides the `use-hash-as-path` option, which will place the route path on the URL fragment
(the URL content beginning with the hash separator `#`).

In our example, we declare two routes, one for the beer list (URL fragment `#/beers`) and another for the individual beers
(URL fragments following the `#/beer/:id` schema):

```js
<app-location route="{{route}}" use-hash-as-path></app-location>


<app-route route="[[route]]" pattern="/beers" active="{{beerListActive}}"></app-route>
<app-route route="[[route]]" pattern="/beer/:id" data="{{beerId}}" active="{{beerIdActive}}"></app-route>
  static get template() {
    return html`
      <style include="granite-bootstrap"></style>

      <!--
        app-location binds with the URL and produces a route for  app-route
        elements to consume. Since this application needs to run without server
        cooperation we'll use the hash portion of the URL for our route paths.
      -->
      <app-location route="{{route}}" use-hash-as-path></app-location>

      <!--
        app-routes parse route paths based on the their \`pattern\`.
        Parameters are extracted into the \`data\` object. The rest of the path that
        comes after the \`pattern\` is put into the \`tail\` object, which can be
        passed to the \`route\` property of downstream app-routes.
      -->
      <app-route route="[[route]]" pattern="/beers" active="{{beerListActive}}"></app-route>
      <app-route route="[[route]]" pattern="/beer/:id" data="{{beerId}}" active="{{beerIdActive}}"></app-route>
    `;
  }
```

And you also need to add `route`, `beerListActive`, `beerIdActive` and `beerId` to the element properties:

```js
  static get properties() {
    return {
      beerListActive: {
        type: Boolean,
      },
      beerIdActive: {
        type: Boolean,
      },
      beerId: {
        tpe: String,
      },
      route: {
        type: Object,
      },
    };
  }
```

## Showing current choice

To keep the learning curve gentle, in the current step we are only showing messages informing use of what beer (if any) is currently selected.
Later in next step we will see how to show a different page when the beer detail is selected.

To show a label when a beer have been selected, we are going to use Polymer's [conditional templates](https://www.polymer-project.org/3.0/docs/devguide/templates#dom-if). Conditional templates (or `dom-if`) allow to conditionally
stamp elements into the DOM according to boolean properties.  The `dom-if` template stamps its contents into the DOM only when its `if` property becomes truthy.

In order to use it you need to import it, as usual.

```js
import '@polymer/polymer/lib/elements/dom-if.js';
```

We are also importing `granite-bootstrap` for Bootstrap support:

```js
import '@granite-elements/granite-bootstrap/granite-bootstrap.js';
```

We want to monitor the variables set by *app-route*, so we can define two blocks:

```html
<div class="container">
  <div class="alert alert-warning" role="alert">Variable `beerListActive` = {{beerListActive}}</div>
  <template is="dom-if" if="{{beerListActive}}">
    <div class="alert alert-success" role="alert">You have selected the main beer list (URL fragment = #/beers)</div>
  </template>
</div>

<div class="container">
  <div class="alert alert-warning" role="alert">Variable `beerIdActive` = {{beerIdActive}}</div>
  <template is="dom-if" if="{{beerIdActive}}">
    <div class="alert alert-success" role="alert">You have selected a beer: {{beerId.id}}</div>
  </template>
</div>
```



## Hyperlinking the beers

In order to get more details on a beer when we click on its name, we need to modify `beer-list-item` template, to put the beer name inside a `<a>` tag that will send us to the route corresponding to that beer.

```js
  static get template() {
    return html`
      <style include="granite-bootstrap"></style>
      <style>
      ...
      </style>
      <div id="[[id]]" class="beer clearfix">
        <img class="float-right el-img" src="/data/beers/[[img]]">
        <a href="#/beer/[[id]]"><h2 class="el-name">[[name]]</h2></a>
        <p class="el-description">[[description]]</p>
        <p class="float-right el-alcohol">Alcohol content: [[alcohol]]%</p>
      </div>
    `;
```


We want to monitor the variables set by `app-route`, so we can add two blocks to the template:

```html
  <div class="container">
    <div class="alert alert-warning" role="alert">Variable 'beerListActive' = {{beerListActive}}</div>
    <template is="dom-if" if="{{beerListActive}}">
      <div class="alert alert-success" role="alert">You have selected the main beer list (URL fragment = #/beers)</div>
    </template>
  </div>
  
  <div class="container">
    <div class="alert alert-warning" role="alert">Variable 'beerIdActive' = {{beerIdActive}}</div>
    <template is="dom-if" if="{{beerIdActive}}">
      <div class="alert alert-success" role="alert">You have selected a beer: {{beerId.id}}</div>
    </template>
  </div>
```


Let's see what happens here:

* when the router detects a `/beers` URL fragment, it sets the `beerListActive` to `true`. The first `dom-if` template then shows its content.

* when the router detects a `/beer/:id` URL fragment, it sets the `beerIdActive` to `true` and `beerId` to `{id: the_id_portion}` where `the_id_portion` is the part of the fragment after `/beer/`. The second `dom-if` template, that uses `beerIdActive` as condition, shows its content


We haven't any default routing. What if we want to detect an initial unsupported route and redirect the page to the main `#/beers` route? To do it, we use the `connectedCallback` livecycle method:



```js
  connectedCallback() {
    super.connectedCallback();

    if (!this.route.path) {
      this.route = { ... this.route, path: '/beers' }
    }
  }
```

> The `{...object, prop: value}` notation is the [spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) that generates a new object with the same properties than the original, and then add some new properties. The important part for us is that it's a new object, so Polymer know it must update the template, as it only watches the object reference, not its internal properties (for performance reasons).

Now we can modify `index.html` to use `beer-main` instead of `beer-list` as main element:

```html
<!doctype html>
<html lang="en">

  <head>
    <meta charset="utf-8">
    <title>Polymer Beer Gallery</title>
    <script type="module" src="./elements/beer-main.js"></script>
  </head>

  <body>
    <beer-main></beer-main>
  </body>
</html>
```

So if now we reload our page we see we are routed to `/components/polymer3-beers/#/beers` and we see thaty the router rightfully choose the route.


## Putting back the `beer-list`

So now we can modify `beer-main` to import `beer-list`:

```js
import './beer-list';
```

And use it in the right case:

```js
  static get template() {
    return html`
      <style include="granite-bootstrap"></style>
    
      <app-location route="{{route}}" use-hash-as-path></app-location>

      <app-route route="[[route]]" pattern="/beers" active="{{beerListActive}}"></app-route>
      <app-route route="[[route]]" pattern="/beer/:id" data="{{beerId}}" active="{{beerIdActive}}"></app-route>


      <template is="dom-if" if="{{beerListActive}}">
        <beer-list></beer-list>
      </template>
      
      <template is="dom-if" if="{{beerIdActive}}">
        <div class="container">
          <div class="alert alert-success" role="alert">You have selected a beer: {{beerId.id}}</div>
        </div>
      </template>
    `;
  }
```


## Hyperlinking the beers

In order to get more details on a beer when we click on its name, we need to modify the `beer-list-item` template to put the beer name inside a `<a>` tag that will send us to the route corresponding to that beer.


```js
  static get template() {
    return html`
      <style include="granite-bootstrap"></style>
      <style>
        ...
      </style>
      <div id="[[id]]" class="beer clearfix">
        <img class="float-right el-img" src="/data/beers/[[img]]">
        <a href="#/beer/[[id]]"><h2 class="el-name">[[name]]</h2></a>
        <p class="el-description">[[description]]</p>
        <p class="float-right el-alcohol">Alcohol content: [[alcohol]]%</p>
      </div>
    `;
  }
```


React Scroll Load Component
=================================

A dummy React component to implement continuous load on scroll for **modern browser**.

### Usage
```
var ScrollLoad = require('react-component-scrollload');
```
```html
<ScrollLoad className="via transferPropsTo" loadMore={this.loadMore} hasMore={!!this.state.meta.next} isLoading={this.state.loading} loader={<div className="loading"><img src="/img/loading.svg" /></div>}>
  {items}
</ScrollLoad>
```

`npm install react-component-scroll --save`

### Prop types
```javascript
propTypes: {
  hasMore: React.PropTypes.bool.isRequired, // if there is more to load
  loadMore: React.PropTypes.func.isRequired, // callback to load more
  isLoading: React.PropTypes.bool.isRequired, // indicate if a loading is ongoing
  threshold: React.PropTypes.number, // pixel threshold, default 1000
  loader: React.PropTypes.component, // displayed loader component, default React.DOM.div(null, 'Loading...')

  // disable pointer to improve scrolling perf
  disablePointer: React.PropTypes.number, // ms delay until disablePointerClass class is removed after last scroll event, default 0 (feature disabled)
  disablePointerClass: React.PropTypes.string // default class added to child wrapper div, default 'disable-pointer'
}
```

#### Scroll performance

A dummy way to improve scrolling performance.

Add to your css a `disable-pointer` definition, default name defined by `disablePointerClass`.

```css
.disable-pointer {
  pointer-events: none !important;
}
```

Add `disablePointer` prop with a delay in milliseconds.
```html
<ScrollLoad disablePointer={100}>...
```


### Licence

MIT

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
  loader: React.PropTypes.component // displayed loader component, default React.DOM.div(null, 'Loading...')
}
```

### Licence

MIT

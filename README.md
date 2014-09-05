React Continuous Scroll Component
=================================

A React component to implement continuous scrolling for **modern browser**.

### Usage
```javascript
<ContinuousScroll className="via transferPropsTo" loadMore={this.loadMore} hasMore={!!this.state.meta.next} loading={this.state.loading} loader={<div className="loading"><img src="/img/loading.svg" /></div>}>
  {items}
</ContinuousScroll>
```

`npm install react-continuous-scroll --save`

### Prop types
```javascript
propTypes: {
  hasMore: React.PropTypes.bool.isRequired, // if there is more to load
  loadMore: React.PropTypes.func.isRequired, // callback to load more
  loading: React.PropTypes.bool.isRequired, // indicate if a loading is ongoing
  threshold: React.PropTypes.number, // pixel threshold, default 1000
  loader: React.PropTypes.component // displayed loader component, default React.DOM.div(null, 'Loading...')
}
```

### Licence

MIT

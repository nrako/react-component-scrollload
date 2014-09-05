
/**
 * @jsx React.DOM
 */

var React = require('react');

var ContinuousScroll = React.createClass({
  propTypes: {
    hasMore: React.PropTypes.bool.isRequired,
    loadMore: React.PropTypes.func.isRequired,
    loading: React.PropTypes.bool.isRequired,
    threshold: React.PropTypes.number,
    loader: React.PropTypes.component
  },
  getDefaultProps: function () {
    return {
      threshold: 1000,
      loader: React.DOM.div(null, 'Loading...'),
    };
  },
  watching: false,
  onScroll: function () {
    if (!this.props.hasMore || this.props.loading)
      return;

    var el = this.getDOMNode();

    if (el.scrollTop + el.offsetHeight + this.props.threshold < el.scrollHeight)
      return;

    this.unwatch();
    this.props.loadMore();
  },
  componentDidMount: function () {
    this.watch();
  },
  componentDidUpdate: function () {
    this.watch();
    var el = this.getDOMNode();

    // when component update need to check if loaded children height are bigger than threshold else load more
    // About setTimeout: fluxxor enforce flux principle; dispatching an action during and action would trigger an error
    setTimeout(this.onScroll);
  },
  componentWillUnmount: function () {
    this.unwatch();
  },
  watch: function () {
    if (this.watching || !this.props.hasMore)
      return;

    this.getDOMNode().addEventListener('scroll', this.onScroll);
    window.addEventListener('resize', this.onScroll);

    this.watching = true;
  },
  unwatch: function () {
    this.getDOMNode().removeEventListener('scroll', this.onScroll);
    window.removeEventListener('resize', this.onScroll);

    this.watching = false;
  },
  componentWillReceiveProps: function (nextProps) {
    if (!nextProps.hasMore)
      this.unwatch();
  },
  render: function() {

    return this.transferPropsTo(
      React.DOM.div({},
        React.DOM.div({ref: 'wrapper'},
          this.props.children
        ),
        this.props.loading && this.props.loader
      )
    );
  }

});

module.exports = ContinuousScroll;


/**
 * @jsx React.DOM
 */

var React = require('react');
var ReactDOM = require('react-dom');
var documentOffset = require('document-offset');

var ContinuousScroll = React.createClass({
  propTypes: {
    hasMore: React.PropTypes.bool.isRequired,
    loadMore: React.PropTypes.func.isRequired,
    isLoading: React.PropTypes.bool.isRequired,
    useDocument: React.PropTypes.bool,
    threshold: React.PropTypes.number,
    loader: React.PropTypes.element,
    disablePointer: React.PropTypes.number,
    disablePointerClass: React.PropTypes.string
  },
  getDefaultProps: function () {
    return {
      threshold: 1000,
      loader: React.createElement('div', null, 'Loading...'),
      disablePointer: 0,
      disablePointerClass: 'disable-pointer'
    };
  },
  disablePointerTimeout: null,
  onScroll: function () {
    if (!this.isMounted())
      return;

    if (this.props.disablePointer > 0)
      this.disablePointer();

    if (!this.props.hasMore || this.props.isLoading)
      return;

    var el = ReactDOM.findDOMNode(this);
    var currentScroll = this.props.useDocument ? document.body.scrollTop + documentOffset(el).top : el.scrollTop + el.offsetHeight;

    if(currentScroll + this.props.threshold < el.scrollHeight)
      return;

    this.props.loadMore();
  },
  disablePointer: function () {
    if (this.disablePointerTimeout === null)
      this.refs.wrapper.classList.add(this.props.disablePointerClass);

    clearTimeout(this.disablePointerTimeout);
    this.disablePointerTimeout = setTimeout(this.removeDisablePointerClass, this.props.disablePointer);
  },
  removeDisablePointerClass: function () {
    if (this.refs.wrapper)
      this.refs.wrapper.classList.remove(this.props.disablePointerClass);

    this.disablePointerTimeout = null;
  },
  componentDidMount: function () {
    this.listenScroll();

    // About setTimeout: fluxxor enforce flux principle; dispatching an action during and action would trigger an error
    setTimeout(this.onScroll);
  },
  componentDidUpdate: function () {
    // when component update need to check if loaded children height are bigger than threshold else load more
    // About setTimeout: fluxxor enforce flux principle; dispatching an action during and action would trigger an error
    setTimeout(this.onScroll);
  },
  componentWillUnmount: function () {
    this.unlistenScroll();
  },
  listenScroll: function () {
    var el = this.props.useDocument ? window : ReactDOM.findDOMNode(this);

    el.addEventListener('scroll', this.onScroll);
    window.addEventListener('resize', this.onScroll);
  },
  unlistenScroll: function () {
    var el = this.props.useDocument ? window : ReactDOM.findDOMNode(this);

    el.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('resize', this.onScroll);
  },
  componentWillReceiveProps: function (nextProps) {
    // if there is no need to listen on scroll anymore
    if (nextProps.hasMore)
      this.listenScroll();
    else if (this.props.disablePointer <= 0)
      this.unlistenScroll();
  },
  render: function() {
    return (
      React.createElement('div', this.props,
        React.createElement('div', {ref: 'wrapper'},
          this.props.children
        ),
        this.props.isLoading && this.props.loader
      )
    );
  }

});

module.exports = ContinuousScroll;

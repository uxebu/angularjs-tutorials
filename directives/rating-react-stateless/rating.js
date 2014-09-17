/** @jsx React.DOM */

var StarsComponent = React.createClass({

  _renderStars: function(numStars, currentValue, onStarClicked) {
    var stars = [];
    for (var i = 1; i <= numStars; i++) {
      var clickHandler = onStarClicked.bind(null, i);
      var className = i <= currentValue && 'filled';
      var star = <li class={className} onClick={clickHandler}>{'\u2605'}</li>;
      stars.push(star);
    }
    return stars;
  },

  render: function() {
    var props = this.props;
    var stars = this._renderStars(props.max, props.value, props.onRatingSelected);
    return <ul class="rating">{stars}</ul>;
  }
});


var RatingComponent = React.createClass({
  render: function() {
    var props = this.props;
    return (
      <div>
        Rating is {props.rating}<br/>
        Clickable Rating <br/>
        <StarsComponent
          value={props.rating} max="10"
          onRatingSelected={props.clickable.onRatingSelected}
        />
        <br />
        Readonly rating <br/>
        <StarsComponent
          value={props.rating} max="10"
          onRatingSelected={props.readonly.onRatingSelected}
        />
      </div>
    );
  }
});

function Controller(domNode) {
  this._domNode = domNode;
  this._init();
}
Controller.prototype = {

  _init: function() {
    var INITIAL_RATING_VALUE = 5;
    var clickable = {onRatingSelected: this._onClick.bind(this)};
    var readonly = {onRatingSelected: function() {}};
    this._component = React.renderComponent(
      <RatingComponent rating={INITIAL_RATING_VALUE} clickable={clickable} readonly={readonly} />,
      this._domNode
    );
  },

  _onClick: function(rating) {
    this._updateRating(rating);
  },

  _updateRating: function(rating) {
    var props = {rating: rating};
    this._component.setProps(props);
  }

};

new Controller(document.body);


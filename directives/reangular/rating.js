/** @jsx React.DOM */

var FundooRating = React.createClass({
  render: function() {
    var items = [];
    for (var i = 0; i < this.props.max; i++) {
      var className = i <= this.props.value ? 'filled' : '';
      var clickHandler = this.props.onRatingSelected ? this.props.onRatingSelected.bind(this.props, i) : null;
      items.push(
        <li class={className} onClick={clickHandler}>
          {'\u2605'}
        </li>
      );
    }
    return (
      <ul class="rating">
        {items}
      </ul>
    );
  }
});

var FundooDirectiveTutorial = React.createClass({
  getInitialState: function() {
    return {rating: 5};
  },
  handleRatingSelected: React.autoBind(function(rating) {
    this.setState({rating: rating});
    alert('Rating selected - ' + rating);
  }),
  render: function() {
    return (
      <div>
        Rating is {this.state.rating}<br/>
        Clickable Rating <br/>
        <FundooRating value={this.state.rating} max="10" onRatingSelected={this.handleRatingSelected} />
        <br />
        Readonly rating <br/>
        <FundooRating value={this.state.rating} max="10" />
      </div>
    );
  }
});

React.renderComponent(<FundooDirectiveTutorial />, document.body);
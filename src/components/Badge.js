import React from 'react';
// Set up store and load data.
export default class Badge extends React.Component {
  static displayName = 'Badge';
  static propTypes = {
    classes: React.PropTypes.object,
  };
  render() {
    const { classes } = this.props;
    return (
      <div className = {classes.badge}>
        <h3>pjkarlik.com</h3>
        <p>ui architect &amp; creative technologist</p>
      </div>
    );
  }
}

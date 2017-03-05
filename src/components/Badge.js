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
        <p>ui architect &amp;<br />creative technologist &nbsp;</p>
        <h3>pjk</h3>
      </div>
    );
  }
}

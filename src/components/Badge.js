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
        <span className = {classes.tagline}>
          ui architect<br />creative technologist
        </span>
        <h1 className = {classes.header}><span>p</span><span>j</span><span>k</span></h1>
      </div>
    );
  }
}

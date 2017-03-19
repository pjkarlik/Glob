import React from 'react';
import { resolve } from '../styles';

export default class ContentBlock extends React.Component {
  static displayName = 'ContentBlock';
  static propTypes = {
    classes: React.PropTypes.object,
    modifier: React.PropTypes.string,
    /** Modules Props **/
    sectionHeight: React.PropTypes.number,
    /** Redux Actions **/
    setSiteState: React.PropTypes.func,
  };

  /* eslint react/jsx-no-bind: 0 */
  render() {
    const { classes, sectionHeight, modifier } = this.props;
    const heightStyle = { height: sectionHeight };
    return (
      <div {...resolve(this.props, 'section', modifier)} style = {heightStyle}>
        <div {...resolve(this.props, 'content')}>
          <div className = {classes.threefour}>
            <p className = {classes.copy}>
              p5.js is a JavaScript library that is based off the Processing language, which itself is a language
              for coding complex interactions within the context of the visual arts. More about processing at&nbsp;
              <a href="http://p5js.org" target="_blank">{'http://p5js.org'}</a>
              <br /><br />
              This sketch is a visualization of dynamic data points produced by a simplex noise function.
              Simplex noise divides the space into dimensional triangles.
              Each simplex vertex is added back to the base coordinate and hashed into a pseudo-random gradient
              direction. Using time as a variable, we step though the animations evolving dataset.
              The colors are produced by running a sine and cosine formula for each point on this moving grid.
              <br /><br />
              I've also created and a React.js wrapper component that loads and executes the p5.js
              sketch inside it's lifecycle. This integration between the React state and the sketch allows us to
              dynamically change the display.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

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
    const { classes, sectionHeight modifier = 'base' } = this.props;
    const heightStyle = { height: sectionHeight };
    return (
      <div {...resolve(this.props, 'section', modifier)} style = {heightStyle}>
        <div {...resolve(this.props, 'content')}>
          <div className = {classes.threefour}>
            <p>
              p5.js is a JavaScript library that is based off the Processing language. Processing itself is a language
              for coding complex interactions within the context of the visual arts. More about processing at
              <a href="http://p5js.org" target="_blank">{'http://p5js.org'}</a>
              <br /><br />
              This sketch is a visualization of dynamic data points produced by a simplex noise. That is
              an n-dimensional noise function. Simplex noise divides the space into dimensional triangles.
              Each simplex vertex is added back to the base coordinate and hashed into a pseudo-random gradient
              direction. Read more about
              <a href="https://en.wikipedia.org/wiki/Simplex_noise" target="_blank">simplex noise</a>
              here..
              Using time as a variable, we step though the animations evolving dataset.
              The colors are produced by running a sine and cosine formula for each point on this moving grid.
              <br /><br />
              Using React.js and Redux I've also created and a wrapper component that loads and executes the p5.js
              sketch inside it's lifecycle. This let's us to cool things between unique running frameworks.
            </p>
          </div>
          <div {...resolve(this.props, 'onethird', 'right')}>
            <h4>Simplex Noise</h4>
            <p>
              The background you see above is a visualization of simplex noise. The function takes the vector points
              of the grid, and though a set of computations results in an ever changing data set. Each color is
              created by the application of sine/cosine waves based on that data set.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

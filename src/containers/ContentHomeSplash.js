import React from 'react';
import { resolve } from '../styles';

export default class ContentBlock extends React.Component {
  static displayName = 'ContentBlock';
  static propTypes = {
    classes: React.PropTypes.object,
    /** Modules Props **/
    sectionHeight: React.PropTypes.number,
    /** Redux Actions **/
    setSiteState: React.PropTypes.func,
  };

  /* eslint react/jsx-no-bind: 0 */
  render() {
    const { classes, sectionHeight } = this.props;
    const heightStyle = { height: sectionHeight / 2 };
    return (
      <div {...resolve(this.props, 'section', 'base')} style = {heightStyle}>
        <div {...resolve(this.props, 'content')}>
          <div className = {classes.threefour}>
            <h3>Hello,<br />Im Paul!</h3>
            <p>
              I am a User Interface Architect, Front-End Developer and Creative Technologist.
              <br/><br/>
              I create unique interfaces, mix art and technology and explore visual design in code. Current skills
              include HTML/CSS/LESS, JavaScript/ES6, React, Redux, Webpack, CSS Modules and Node.
              <br/><br/>
              ...also enjoys other languages and platforms such as Processing, Arduino and Raspberry Pi.
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

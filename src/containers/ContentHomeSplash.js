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
    const { classes, sectionHeight, modifier = 'splash' } = this.props;
    const heightStyle = { height: sectionHeight };
    return (
      <div {...resolve(this.props, 'section', modifier)} style = {heightStyle}>
        <div {...resolve(this.props, 'content')} style = {heightStyle}>
          <h3 className = {classes.headerrb}>
            <span>H</span><span>e</span><span>l</span><span>l</span><span>o</span><span>,</span>
            <br />
            <span>I</span><span>m</span><span> P</span><span>a</span><span>u</span><span>l</span><span>!</span>
          </h3>
          <p className = {classes.copy}>
            I am a User Interface Architect, Front-End Developer and Creative Technologist. I create unique
            interfaces, mix art and technology and explore visual design in code. Current skills
            include HTML/CSS/LESS, JavaScript/ES6, React, Redux, Webpack, CSS Modules, Processing, and Arduino.
            To see more examples of work checkout my&nbsp;
            <a href="https://codepen.io/pjkarlik" target="_blank">Codepen.io</a> &amp;&nbsp;
            <a href="https://github.com/pjkarlik" target="_blank">Github</a> page.
            <br/><br/>
            ...this is my ever changing experiment and interactive portfolio. The background is p5.js running in a
            React wrapper that allows communication between both frameworks. Scroll down to edit the waveform.
          </p>
        </div>
      </div>
    );
  }
}

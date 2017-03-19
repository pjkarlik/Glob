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
    const heightStyle = { height: sectionHeight };
    return (
      <div {...resolve(this.props, 'section', 'splash')} ref={(ref) => this.section3 = ref} style = {heightStyle}>
        <div {...resolve(this.props, 'content')} style = {heightStyle}>
          <h3 className = {classes.headerrb}>
            <span>C</span><span>o</span><span>n</span><span>t</span><span>a</span><span>c</span><span>t</span>
          </h3>
          <p className = {classes.copy}>
            Interested in seeing more of my development work, or just want to checking out some of my raw source code?
            Just click any of the links below to visit my other works, experiments, music and social media feeds.
          </p>
          <p className = {classes.signature}>
            Thanks for visiting!
            <br/>
            <b>Paul J Karlik</b>
          </p>
          <div className = {classes.iconButtons}>
            <a {...resolve(this.props, 'codebutton', 'github')}
              href="http://github.com/pjkarlik" target = "_blank"
            >github</a>
            <a {...resolve(this.props, 'codebutton', 'codepen')}
              href="http://codepen.io/pjkarlik" target = "_blank"
            >codepen</a>
            <a {...resolve(this.props, 'codebutton', 'twitter')}
              href="http://twitter.com/pjkarlik" target = "_blank"
            >twitter</a>
            <a {...resolve(this.props, 'codebutton', 'soundcloud')}
              href="http://soundcloud.com/pjkarlik" target = "_blank"
            >soundcloud</a>
            <a {...resolve(this.props, 'codebutton', 'google')}
              href="http://plus.google.com/u/0/+PaulKarlik" target = "_blank"
            >google</a>
          </div>
        </div>
      </div>
    );
  }
}

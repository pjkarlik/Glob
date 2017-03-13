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
      <div {...resolve(this.props, 'section', 'base')} ref={(ref) => this.section3 = ref} style = {heightStyle}>
        <div {...resolve(this.props, 'content')} style = {heightStyle}>
          <h3 className = {classes.headerrb}>
            <span>C</span><span>o</span><span>n</span><span>t</span><span>a</span><span>c</span><span>t</span>
          </h3>
          <p>Something listed here about contact and links to and from something.
          </p>
        </div>
      </div>
    );
  }
}

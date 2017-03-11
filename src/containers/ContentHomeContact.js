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
    const { sectionHeight } = this.props;
    const heightStyle = { height: sectionHeight };
    return (
      <div {...resolve(this.props, 'section', 'accent')} ref={(ref) => this.section3 = ref} style = {heightStyle}>
        <div {...resolve(this.props, 'content')} style = {heightStyle}>
          <h3></h3>
          <p>
          </p>
        </div>
      </div>
    );
  }
}

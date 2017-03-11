import React from 'react';
import { resolve } from '../styles';

export default class ContentBlock extends React.Component {
  static displayName = 'ContentBlock';
  static propTypes = {
    classes: React.PropTypes.object,
    children: React.PropTypes.node,
    modifier: React.PropTypes.string,
    /** Modules Props **/
    sectionHeight: React.PropTypes.number,
    /** Redux Actions **/
    setSiteState: React.PropTypes.func,
  };

  /* eslint react/jsx-no-bind: 0 */
  render() {
    const { sectionHeight, children, modifier = '' } = this.props;
    const heightStyle = { height: sectionHeight };
    return (
      <div {...resolve(this.props, 'section', modifier)} ref={(ref) => this.section3 = ref} style = {heightStyle}>
        <div {...resolve(this.props, 'content')} style = {heightStyle}>
          {children}
        </div>
      </div>
    );
  }
}

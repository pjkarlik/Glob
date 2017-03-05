import React from 'react';
import { withRouter } from 'react-router';
import { resolve } from '../styles';
import { connect } from 'react-redux';
import { setSiteState } from '../redux/modules/site';
import SketchWrapper from '../components/SketchWrapper';

import SiteStyles from '../styles/Site.less';

import sketch from '../sketches/Simplex_p5';
// import InfoHeader from '../components/InfoHeader';
// import { description } from '../sketches/Description';
// <InfoHeader
//   classes = {classes}
//   title = {'Processing p5.js'}
//   type = {'JavaScript'}
//   description = {description}
// />
class Home extends React.Component {
  static displayName = 'Home';
  static propTypes = {
    classes: React.PropTypes.object,
    /** Router Props **/
    router: React.PropTypes.shape({
      push: React.PropTypes.func.isRequired,
    }).isRequired,
    history: React.PropTypes.object,
    /** Modules Props **/
    isOpen: React.PropTypes.bool,
    /** Redux Actions **/
    setSiteState: React.PropTypes.func,
  };
  static defaultProps = {
    classes: SiteStyles,
  };
  /* eslint react/jsx-no-bind: 0 */
  render() {
    const { classes, isOpen } = this.props;
    const config = {
      shaderType: isOpen ? 'isClose' : 'isOpen',
    };

    return (
      <div {...resolve(this.props, 'container')} ref={(ref) => this.container = ref}>

      <SketchWrapper {...resolve(this.props, 'sketch')} config={config} sketch = { sketch } />
      </div>
    );
  }
}

export default connect((state) => {
  const stateObject = {
    isOpen: state.site.isOpen,
  };
  return stateObject;
}, { setSiteState })(withRouter(Home));

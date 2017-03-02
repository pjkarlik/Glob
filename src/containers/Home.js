import React from 'react';
import { withRouter } from 'react-router';
import { resolve } from '../styles';
import { connect } from 'react-redux';
import { setSiteState } from '../redux/modules/site';
import SketchWrapper from '../components/SketchWrapper';
import InfoHeader from '../components/InfoHeader';
import SiteStyles from '../styles/Site.less';

import sketch from '../sketches/Simplex_p5';

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
  componentDidMount() {
  }
  componentWillUnmount() {
  }
  /* eslint react/jsx-no-bind: 0 */
  render() {
    const { classes, isOpen } = this.props;
    const config = {
      shaderType: isOpen ? 'isClose' : 'isOpen',
    };
    const description = 'p5.js is a JavaScript library that ' +
    'is based off the Processing language. Processing itself is a language for coding complex interactions ' +
    'within the context of the visual arts. ' +
    '<br /><br />' +
    'More about processing at <a href=http://p5js.org target=_blank>http://p5js.org</a> ' +
    '<br /><br />' +
    'This sketch is a visualization of dynamic data points produced by a simplex noise function. ' +
    'Using time as a variable, we step though the animations evolving dataset. The colors are produced by running ' +
    'a sine and cosine formula for each point on this moving grid. <br />';
    return (
      <div {...resolve(this.props, 'container')} ref={(ref) => this.container = ref}>
        <InfoHeader
          classes = {classes}
          title = {'Processing p5.js'}
          type = {'JavaScript'}
          description = {description}
        />
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

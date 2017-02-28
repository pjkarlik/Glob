import React from 'react';
import { withRouter } from 'react-router';
import { resolve } from '../styles';
import SketchWrapper from '../components/SketchWrapper';
import InfoHeader from '../components/InfoHeader';
import SiteStyles from '../styles/Site.less';

import sketch from '../sketches/Simplex_p5';

class Home extends React.Component {
  static displayName = 'Home';
  static propTypes = {
    classes: React.PropTypes.object,
    router: React.PropTypes.shape({
      push: React.PropTypes.func.isRequired,
    }).isRequired,
    history: React.PropTypes.object,
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
    const { classes } = this.props;
    const description = 'p5.js is a JavaScript library that is based off the Processing language. Processing ' +
    'itself is a language for coding within the context of the visual arts and physical interactions. ' +
    'This sketch is a visualization of a dynamic data produced by a simplex noise function. Using time ' +
    'as a variable to step though the animation, as colors are produced by running a sine and cosine formula ' +
    'for each point on this moving grid. ';
    return (
      <div {...resolve(this.props, 'container')} ref={(ref) => this.container = ref}>
        <InfoHeader
          classes = {classes}
          title = {'Processing p5.js'}
          type = {'JavScript'}
          description = {description}
        />
      <SketchWrapper {...resolve(this.props, 'sketch')} sketch = { sketch } />
      </div>
    );
  }
}

export default withRouter(Home);

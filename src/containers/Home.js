import React from 'react';
import { withRouter } from 'react-router';
import { resolve } from '../styles';
import { connect } from 'react-redux';

import { setSiteState } from '../redux/modules/site';
import SketchWrapper from '../components/SketchWrapper';
import ContentSplash from './ContentHomeSplash';
import ContentGui from './ContentHomeGui';

import SiteStyles from '../styles/Site.less';

import sketch from '../sketches/Simplex_p5';

const Cap = (props) => {
  const { direction } = props;
  return (
    <div {...resolve(props, 'section', 'header', direction)}>
      <div {...resolve(props, 'logoThumb', direction)}>&nbsp;</div>
    </div>
  );
};
Cap.displayName = 'Cap';
Cap.propTypes = {
  direction: React.PropTypes.string,
};


class Home extends React.Component {
  static displayName = 'Home';
  static propTypes = {
    classes: React.PropTypes.object,
    ref: React.PropTypes.object,
    /** Router Props **/
    router: React.PropTypes.shape({
      push: React.PropTypes.func.isRequired,
    }).isRequired,
    history: React.PropTypes.object,
    /** Modules Props **/
    config: React.PropTypes.object,
    /** Redux Actions **/
    setSiteState: React.PropTypes.func,
  };

  static defaultProps = {
    classes: SiteStyles,
  };

  constructor(props) {
    super(props);
    this.state = {
      iteration: (40 + Math.random() * 30) / 10,
      strength: (25 + Math.random() * 15),
      speed: (5 + Math.random() * 15),
      waveSpeed: 100,
      tempZoom: -50,
      shaderType: 'splash',
      objectType: 'plane',
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.checkPosition);
    window.addEventListener('resize', this.setSizes);
    this.setSizes();
    this.checkPosition();
  }

  componentWillReceiveProps() {
  }

  setSizes = () => {
    this.setState({
      width: (document.documentElement.clientWidth, window.innerWidth || 0),
      height: (document.documentElement.clientHeight, window.innerHeight || 0),
    });
  }

  setOptions = (options) => {
    // console.log(options);
    this.setState({
      ...options,
    });
  }

  checkPosition = () => {
    const { height } = this.state;
    const top = document.body.scrollTop;
    // zone settings
    if (top < height) {
      this.setState({
        shaderType: 'splash',
        tempZoom: -50,
        background: [0, 0, 0],
      });
    }
    if (top > height && top < height * 2) {
      this.setState({
        shaderType: 'editor',
        tempZoom: -1550,
        background: [255, 255, 255],
      });
    }
    if (top > (height * 2) + 300) {
      this.setState({
        shaderType: 'outro',
        tempZoom: -500,
        background: [40, 90, 90],
      });
    }
  };

  /* eslint react/jsx-no-bind: 0 */
  render() {
    const { classes } = this.props;
    const config = {
      ...this.state,
    };
    const sectionHeight = { height: this.state.height };
    return (
      <div {...resolve(this.props, 'container')} ref={this.props.ref}>
        <SketchWrapper {...resolve(this.props, 'sketch')} config={config} sketch = { sketch } />

        <Cap direction = {'top'} classes = {classes} />

        <ContentSplash classes = {classes} sectionHeight = {this.state.height} />

        <Cap direction = {'bottom'} classes = {classes} />

        <ContentGui
          classes = {classes}
          sectionHeight = {this.state.height}
          config={config}
          setOptions={this.setOptions}
        />

        <Cap direction = {'top'} classes = {classes} />

        <div {...resolve(this.props, 'section', 'base')} style = {sectionHeight}>
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

        <Cap direction = {'bottom'} classes = {classes} />

        <div {...resolve(this.props, 'section', 'accent')} ref={(ref) => this.section3 = ref} style = {sectionHeight}>
          <div {...resolve(this.props, 'content')}>
            <h3></h3>
            <p>
            </p>
          </div>
          <br /><br /><br /><br /><br /><br /><br />
          <br /><br /><br /><br /><br /><br /><br />
          <br /><br /><br /><br /><br /><br /><br />
          <br /><br /><br /><br /><br /><br /><br />
        </div>

      </div>
    );
  }
}

export default connect((state) => {
  const stateObject = {
    config: state.site.config,
  };
  return stateObject;
}, { setSiteState })(withRouter(Home));

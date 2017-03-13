import React from 'react';
import { withRouter } from 'react-router';
import { resolve } from '../styles';
import { connect } from 'react-redux';

import { setSiteState } from '../redux/modules/site';
import SketchWrapper from '../components/SketchWrapper';
import Badge from '../components/Badge';
import BadgeStyle from '../components/Badge.less';
// start content...
import ContentSplash from './ContentHomeSplash';
import ContentGui from './ContentHomeGui';
// import ContentSketch from './ContentHomeSketch';
import ContentContact from './ContentHomeContact';
import ContentBlank from './ContentBlank';
// end content..
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
    style: React.PropTypes.object,
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
      waveSpeed: 10,
      tempZoom: -50,
      shaderType: 'splash',
      objectType: 'plane',
      height: 0,
      top: 0,
      scrollTop: 0,
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
        scrollTop: top,
      });
    } else if (top > height && top < (height * 1.5)) {
      this.setState({
        shaderType: 'editor',
        tempZoom: -1550,
        background: [225, 225, 225],
        scrollTop: top,
      });
    } else if (top > (height * 1.5)) {
      this.setState({
        shaderType: 'outro',
        tempZoom: -500,
        background: [40, 90, 90],
        scrollTop: top,
      });
    } else {
      this.setState({
        scrollTop: top,
      });
    }
  };

  /* eslint react/jsx-no-bind: 0 */
  render() {
    const { classes } = this.props;
    const config = {
      ...this.state,
    };
    // <Cap direction = {'bottom'} classes = {classes} />
    // <Cap direction = {'top'} classes = {classes} />
    const panel1Top = { top: `-${this.state.scrollTop}px` };
    const panel2Top = { top: `-${this.state.scrollTop / 2}px` };
    const panel3Top = { top: `-${this.state.scrollTop / 3}px` };

    return (
      <div {...resolve(this.props, 'container')} ref={(ref) => this.container = ref }>
        <div key="panel_0"
          ref={(ref) => this.panel0 = ref }
          {...resolve(this.props, 'panel', 'fixed')}
        >
          <SketchWrapper {...resolve(this.props, 'sketch')} config={config} sketch = { sketch } />
        </div>
        <div key="panel_1"
          ref={(ref) => this.panel1 = ref }
          {...resolve(this.props, 'panel', 'one')}
          style = {panel1Top}
        >
          <ContentBlank classes = {classes} sectionHeight = {this.state.height} />
          <Cap direction = {'top'} classes = {classes} />
          <ContentSplash classes = {classes} sectionHeight = {this.state.height} />
          <Cap direction = {'bottom'} classes = {classes} />
        </div>

        <div key="panel_2"
          ref={(ref) => this.panel2 = ref }
          {...resolve(this.props, 'panel', 'two')}
          style = {panel2Top}
        >
          <ContentBlank classes = {classes} sectionHeight = {this.state.height}>
            <Badge classes = {BadgeStyle} />
          </ContentBlank>
          <ContentBlank classes = {classes} sectionHeight = {this.state.height / 2} />
            <ContentGui
              classes = {classes}
              sectionHeight = {this.state.height}
              config={config}
              modifier = {'accent'}
              setOptions={this.setOptions}
            />
          <ContentBlank classes = {classes} sectionHeight = {this.state.height * 2} />
          <Cap direction = {'top'} classes = {classes} />
          <ContentContact classes = {classes} sectionHeight = {this.state.height} />
        </div>

        <div key="panel_3"
          ref={(ref) => this.panel3 = ref }
          {...resolve(this.props, 'panel', 'three')}
          style = {panel3Top}
        >
          <ContentBlank classes = {classes} sectionHeight = {this.state.height} />
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

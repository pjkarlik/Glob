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
import ContentSketch from './ContentHomeSketch';
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
    const rndTypes = ['plane', 'box', 'sphere'];
    const randomNumber = Math.round(Math.random() * (2 - 0) + 0);
    this.state = {
      iteration: (40 + Math.random() * 30) / 10,
      strength: (25 + Math.random() * 15),
      speed: (5 + Math.random() * 25),
      waveSpeed: 10,
      tempZoom: -75,
      shaderType: 'splash',
      objectType: rndTypes[randomNumber],
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
    const width = (document.documentElement.clientWidth, window.innerWidth || 0);
    const height = (document.documentElement.clientHeight, window.innerHeight || 0);

    this.setState({
      width,
      height,
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
    const top = (document.documentElement.scrollTop||document.body.scrollTop);
    let options = {};

    if (top < height / 2) {
      options = {
        shaderType: 'splash',
        tempZoom: -75,
        background: [0, 0, 0],
      };
    } else if (top > height / 2 && top < height) {
      options = {
        shaderType: 'editor',
        tempZoom: -50,
        background: [0, 0, 0],
      };
    } else if (top > height && top < (height * 1.5)) {
      options = {
        shaderType: 'editor',
        tempZoom: -1550,
        background: [225, 225, 225],
      };
    } else if (top > (height * 1.5)) {
      options = {
        shaderType: 'outro',
        tempZoom: -500,
        background: [40, 90, 90],
      };
    }

    this.setState({
      ...options,
      scrollTop: top,
    });
  };

  /* eslint react/jsx-no-bind: 0 */
  render() {
    const { classes } = this.props;
    const config = {
      ...this.state,
    };
    // <Cap direction = {'bottom'} classes = {classes} />
    // <Cap direction = {'top'} classes = {classes} />
    const panel1Top = { marginTop: `-${this.state.scrollTop}px` };
    const panel2Top = { marginTop: `-${this.state.scrollTop / 2}px` };
    const panel3Top = { marginTop: `-${this.state.scrollTop * 3}px` };

    return (
      <div
        {...resolve(this.props, 'container')}
        ref={(ref) => this.container = ref }
      >
        <div key="panel_0"
          ref={(ref) => this.panel0 = ref }
          {...resolve(this.props, 'panel', 'fixed')}
        > <ContentBlank classes = {classes} sectionHeight = {this.state.height * 3} />
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
          <ContentBlank classes = {classes} sectionHeight = {this.state.height * 9} />
          <ContentSketch
            modifier = {'highlight'}
            classes = {classes}
            sectionHeight = {this.state.height}
          />
          <ContentBlank classes = {classes} sectionHeight = {this.state.height / 2} />
          <ContentBlank classes = {classes} sectionHeight = {this.state.height}>
          <Badge classes = {BadgeStyle} />
          </ContentBlank>
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

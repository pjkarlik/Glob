import React from 'react';
import { withRouter } from 'react-router';
import { resolve } from '../styles';
import Mouse from '../components/Mouse';

import SiteStyles from '../styles/Site.less';

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
  constructor(props) {
    super(props);
    this.state = {
      mouse: {
        x: 0,
        y: 0,
        state: null,
      },
    };
  }
  componentDidMount() {
    this.mouseObject = new Mouse(this.container);
  }
  componentWillUnmount() {
    this.mouseObject = null;
  }
  // onClick = (path) => {
  //   const { router } = this.props;
  //   router.push(path);
  // }
  setMouseState = (config) => {
    this.setState({
      mouse: config,
    });
  }
  /* eslint react/jsx-no-bind: 0 */
  render() {
    return (
      <div {...resolve(this.props, 'container')} ref={(ref) => this.container = ref}>
      </div>
    );
  }
}

export default withRouter(Home);

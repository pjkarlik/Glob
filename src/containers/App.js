/* global process.env */
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '../redux/configureStore';

/* Other Components */
import Badge from '../components/Badge';
import BadgeStyles from '../components/Badge.less';
import AppStyles from './App.less';
// Set up store and load data.
const store = configureStore();
export default class App extends React.Component {
  static displayName = 'App';
  static propTypes = {
    children: React.PropTypes.node,
  };

  render() {
    return (
        <Provider store={store}>
          <div className = {AppStyles.container}>
            <Badge classes = {BadgeStyles} />
            {this.props.children}
          </div>
        </Provider>
    );
  }
}

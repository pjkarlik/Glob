require('console-polyfill');
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router, useRouterHistory } from 'react-router';
import { createHistory } from 'history';

const history = useRouterHistory(createHistory)({ basename: window.baseName || '/' });
/**
  Entry Point JavaScript
*/
require.ensure(['./routes'], (require) => {
  const routes = require('./routes').default;
  const prefetchRoutes = require('./routes').prefetchRoutes;
  render(
    <Router history={history} routes={routes} />,
    document.getElementById('react-mount'));
  prefetchRoutes();
});

const version = require('../package.json').version;
const description = require('../package.json').description;

const args = [
  `\n %c %c %c ${description} %c ver ${version} %c \n\n`,
  'background: #000; padding:5px 0;border-top-left-radius:10px;border-bottom-left-radius:10px;',
  'background: #51a7ff; padding:5px 0;',
  'color: #51a7ff; background: #000; padding:5px 0;',
  'color: #000; background: #51a7ff; padding:5px 0;',
  'background: #000; padding:5px 0;border-top-right-radius:10px;border-bottom-right-radius:10px;',
];
try {
  window.console.log.apply(console, args);
} catch (e) {
  window.console.log(`ReactUI ${version}`);
}

// requestAnimationFrame polyfill
const vendors = ['ms', 'moz', 'webkit', 'o'];
const af = 'AnimationFrame';
let lastTime = 0;

if ('performance' in window === false) {
  window.performance = {};
}
if (!Date.now) {
  Date.now = () => new Date().getTime();
}
if ('now' in window.performance === false) {
  let nowOffset = new Date();

  if (performance.timing && performance.timing.navigationStart) {
    nowOffset = performance.timing.navigationStart;
  }
  window.performance.now = () => Date.now() - nowOffset;
}
for (let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
  const vendor = vendors[x];
  window.requestAnimationFrame = window[`${vendor}Request${af}`];
  window.cancelAnimationFrame = window[`${vendor}Cancel${af}`] || window[`${vendor}CancelRequest${af}`];
}
if (!window.requestAnimationFrame) {
  window.requestAnimationFrame = callback => {
    const currTime = Date.now;
    const timeToCall = Math.max(0, 16 - (currTime - lastTime));
    const id = window.setTimeout(() => callback(currTime + timeToCall), timeToCall);

    lastTime = currTime + timeToCall;
    return id;
  };
}
if (!window.cancelAnimationFrame) {
  window.cancelAnimationFrame = id => clearTimeout(id);
}

import React from 'react';
import { render } from 'react-dom';
import 'sanitize.css/sanitize.css';
import 'bulma/css/bulma.min.css';

import App from './app';

render(<App />, document.querySelector('#app'));

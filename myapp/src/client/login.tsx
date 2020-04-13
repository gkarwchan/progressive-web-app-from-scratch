import React from 'react';

export const Login = () => (
  <div className="container">
    <div className="control has-icons-left has-icons-right has-addons">
      <input id="username" name="username"
        placeholder="Enter your email"
        type="text"
        className="input"
      />
    </div>
    <div className="control has-icons-left has-icons-right has-addons">
      <input id="password" name="password"
        placeholder="Enter your password"
        type="password"
        className="input"
      />
    </div>
    <div className="field is-grouped">
      <div className="control">
        <button className="button is-link" type="submit">Submit</button>
      </div>
      <div className="control">
        <button className="button is-text">Cancel</button>
      </div>
    </div>
  </div>
);

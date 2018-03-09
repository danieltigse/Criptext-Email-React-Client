import React from 'react';
import PropTypes from 'prop-types';
import FormItemWrapper from './FormItemWrapper';
import { closeLogin, minimizeLogin } from './../utils/electronInterface';
import './signup.css';

const SignUp = props => renderSignUp(props);

const renderSignUp = props => (
  <div>
    <div className="signup-title-bar">
      <span className="buttons">
        <span class="signup-close" onClick={ev => closeLogin()} />
        <span class="signup-minimize" onClick={ev => minimizeLogin()} />
      </span>
    </div>
    <div className="signup">
      {renderHeader(props)}
      {renderForm(props)}
    </div>
  </div>
);

const renderHeader = props => (
  <div className="header">
    <div className="button-section">
      <button className="back-button" onClick={ev => props.toggleSignUp(ev)}>
        <i className="icon-back" />
      </button>
    </div>
    <div className="criptext-logo">
      <div className="icon" />
    </div>
    <div className="header-clear" />
  </div>
);

const renderForm = props => (
  <div className="form">
    <div className="header">
      <p>Sign Up</p>
      <p>Create your Criptext account</p>
    </div>
    <div className="signup-form">
      <form autoComplete="off">
        {props.items.map((formItem, index) => {
          return (
            <FormItemWrapper
              key={index}
              formItem={formItem}
              onChange={props.onChangeField}
              validator={props.validator}
              hasError={props.errors[formItem.name]}
              onSetError={props.onSetError}
            />
          );
        })}
        <div className="button">
          <button
            className="create-button"
            onClick={ev => props.handleSubmit(ev)}
            disabled={props.disabled}
          >
            <span>Create account</span>
          </button>
        </div>
      </form>
    </div>
  </div>
);

renderHeader.propTypes = {
  toggleSignUp: PropTypes.func
};

renderForm.propTypes = {
  disabled: PropTypes.bool,
  handleSubmit: PropTypes.func,
  errors: PropTypes.object,
  items: PropTypes.array,
  onChangeField: PropTypes.func,
  onSetError: PropTypes.func,
  toggleSignUp: PropTypes.func,
  validator: PropTypes.func
};

export default SignUp;

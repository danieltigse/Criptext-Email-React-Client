import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProfileShortCut from './ProfileShortCut';
import { myAccount } from '../utils/electronInterface';
import { defineAccountVisibleParams } from '../utils/AccountUtils';

class ProfileShortCutWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHiddenMenuProfilePreview: true,
      hasUnreadsEmailsOtherAccounts: false
    };
  }

  render() {
    const { letters, avatarUrl } = defineAccountVisibleParams(
      myAccount,
      this.props.avatarTimestamp
    );
    return (
      <ProfileShortCut
        avatarUrl={avatarUrl}
        letters={letters}
        name={myAccount.name}
        emailAddress={myAccount.email}
        hasUnreadsEmailsOtherAccounts={this.state.hasUnreadsEmailsOtherAccounts}
        isHiddenMenuProfilePreview={this.state.isHiddenMenuProfilePreview}
        onClickAddAccount={this.handleClickAddAccount}
        onClickItemAccount={this.handleClickItemAccount}
        onClickSettings={this.handleClickSettings}
        onToggleMenuProfilePreview={this.handleToggleMenuProfilePreview}
        {...this.props}
      />
    );
  }

  handleClickSettings = () => {
    this.setState({
      isHiddenMenuProfilePreview: true
    });
    this.props.onClickSettings();
  };

  handleClickAddAccount = () => {
    this.setState({
      isHiddenMenuProfilePreview: true
    });
    this.props.openLogin();
  };

  handleToggleMenuProfilePreview = () => {
    this.setState({
      isHiddenMenuProfilePreview: !this.state.isHiddenMenuProfilePreview
    });
  };

  handleClickItemAccount = async account => {
    await this.props.onUpdateApp(account);
    this.handleToggleMenuProfilePreview();
  };
}

ProfileShortCutWrapper.propTypes = {
  avatarUrl: PropTypes.string,
  onClickSettings: PropTypes.func,
  avatarTimestamp: PropTypes.number,
  getLoggedAccounts: PropTypes.func,
  onUpdateApp: PropTypes.func,
  openLogin: PropTypes.func
};

export default ProfileShortCutWrapper;

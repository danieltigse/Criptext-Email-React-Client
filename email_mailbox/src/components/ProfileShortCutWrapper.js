import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProfileShortCut from './ProfileShortCut';
import { myAccount } from '../utils/electronInterface';

class ProfileShortCutWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHiddenMenuProfilePreview: true,
      hasUnreadsEmailsOtherAccounts: false
    };
    this.currentAccount = this.props.accounts[0];
    const { letters, avatarUrl } = defineAccountVisibleParams(
      this.currentAccount,
      this.props.avatarTimestamp
    );
    this.letters = letters;
    this.avatarUrl = avatarUrl;
  }

  render() {
    return (
      <ProfileShortCut
        avatarUrl={avatarUrl}
        letters={letters}
        name={myAccount.name}
        emailAddress={emailAddress}
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
    await this.props.onSelectAccount(account);
  };
}

ProfileShortCutWrapper.propTypes = {
  avatarUrl: PropTypes.string,
  onClickSettings: PropTypes.func,
  avatarTimestamp: PropTypes.string,
  getLoggedAccounts: PropTypes.func,
  onSelectAccount: PropTypes.func,
  openLogin: PropTypes.func
};

export default ProfileShortCutWrapper;

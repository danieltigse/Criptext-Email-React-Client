import React from 'react';
import PropTypes from 'prop-types';
import SearchBox from './SearchBox';
import ProfileShortCutWrapper from './ProfileShortCutWrapper';
import './headermain.scss';

const HeaderMain = props => (
  <div className="header-main">
    <SearchBox
      allLabels={props.allLabels}
      avatarTimestamp={props.avatarTimestamp}
      isHiddenMenuSearchHints={props.isHiddenMenuSearchHints}
      isHiddenMenuSearchOptions={props.isHiddenMenuSearchOptions}
      isLoadingSearch={props.isLoadingSearch}
      getSearchParams={props.getSearchParams}
      onClearSearchInput={props.onClearSearchInput}
      onClickSearch={props.onClickSearch}
      onSearchSelectThread={props.onSearchSelectThread}
      onToggleMenuSearchHints={props.onToggleMenuSearchHints}
      onToggleMenuSearchOptions={props.onToggleMenuSearchOptions}
      onTriggerSearch={props.onTriggerSearch}
      searchParams={props.searchParams}
      threads={props.threads}
      hints={props.hints}
    />
    <ProfileShortCutWrapper
      getLoggedAccounts={props.getLoggedAccounts}
      onSelectAccount={props.onSelectAccount}
      avatarTimestamp={props.avatarTimestamp}
      onClickSettings={props.onClickSection}
      openLogin={props.openLogin}
    />
  </div>
);

HeaderMain.propTypes = {
  allLabels: PropTypes.array,
  avatarTimestamp: PropTypes.number,
  getLoggedAccounts: PropTypes.func,
  getSearchParams: PropTypes.func,
  hints: PropTypes.object,
  isHiddenMenuSearchHints: PropTypes.bool,
  isHiddenMenuSearchOptions: PropTypes.bool,
  isLoadingSearch: PropTypes.bool,
  onClickSection: PropTypes.func,
  onClearSearchInput: PropTypes.func,
  onClickSearch: PropTypes.func,
  onSearchSelectThread: PropTypes.func,
  openLogin: PropTypes.func,
  onSelectAccount: PropTypes.func,
  onToggleMenuSearchHints: PropTypes.func,
  onToggleMenuSearchOptions: PropTypes.func,
  onTriggerSearch: PropTypes.func,
  searchParams: PropTypes.object,
  threads: PropTypes.object
};

export default HeaderMain;

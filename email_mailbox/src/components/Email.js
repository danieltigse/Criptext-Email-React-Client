import React from 'react';
import PropTypes from 'prop-types';
import FileWrapper from './FileWrapper';
import MenuHOC from './MenuHOC';
import PopupHOC from './PopupHOC';
import DialogPopup from './DialogPopup';
import EmailMoreInfo from './EmailMoreInfo';
import EmailActions from './EmailActions';
import EmailBlocked from './EmailBlocked';
import ButtonUnsend from './ButtonUnsendWrapper';
import AvatarImage from './AvatarImage';
import ButtonIcon from './ButtonIcon';
import { EmailStatus } from './../utils/const';
import string from '../lang';
import './email.scss';

const DeletePermanenltyPopup = PopupHOC(DialogPopup);
const PopOverEmailMoreInfo = MenuHOC(EmailMoreInfo);
const PopOverEmailActions = MenuHOC(EmailActions);
const PopOverEmailBlocked = MenuHOC(EmailBlocked);
const draftText = 'Draft';

const Email = props => (
  <div>
    {props.popupContent && (
      <DeletePermanenltyPopup
        popupPosition={{ left: '45%', top: '45%' }}
        {...props.popupContent}
        onRightButtonClick={props.handlePopupConfirm}
        onLeftButtonClick={props.dismissPopup}
        onTogglePopup={props.dismissPopup}
        theme={'dark'}
      />
    )}
    <div
      className={`cptx-email-container ${defineEmailState(
        props.displayEmail,
        props.staticOpen
      )} ${defineEmailType(props.isUnsend, props.isDraft, props.isEmpty)}`}
    >
      <div className="email-info" onClick={props.onToggleEmail}>
        <div className="email-info-letter">
          <AvatarImage
            color={props.color}
            avatarUrl={props.avatarUrl}
            borderUrl={props.borderUrl}
            letters={props.letters}
          />
        </div>
        <div className="email-info-content">
          <div className="email-info-content-line">
            <div className="email-info-content-from">
              {props.isDraft ? (
                <span>{draftText}</span>
              ) : (
                <span>{showContacts(props.email.from)}</span>
              )}
            </div>
            <div className="email-info-content-detail">
              {renderIcons(
                props.email.fileTokens,
                props.email.secure,
                props.onMouseEnterTooltip,
                props.onMouseLeaveTooltip,
                props.email.id
              )}
              <span className="email-info-content-detail-date">
                {props.date}
              </span>
            </div>
          </div>
          {isExpand(props.displayEmail, props.staticOpen)
            ? renderEmailInfoExpand(props)
            : renderEmailInfoCollapse(props.email.status, props.preview)}
        </div>
        <div className="email-info-blocked">
          <span>
            <svg
              className="image-blocked"
              data-name="Image blocked"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 40 40"
            >
              <path
                className="cls-1"
                d="M33.7,0H6.3A6.3,6.3,0,0,0,0,6.3V33.7A6.3,6.3,0,0,0,6.3,40H33.7A6.3,6.3,0,0,0,40,33.7V6.3A6.3,6.3,0,0,0,33.7,0ZM27,6.23a4,4,0,1,1-4,4A4,4,0,0,1,27,6.23Zm5.53,26H7.61a1.12,1.12,0,0,1-1.09-1.77L13.32,17a1.14,1.14,0,0,1,2.09-.19l6.84,8.93a1.67,1.67,0,0,0,2.59.16l1.67-1.69A1.6,1.6,0,0,1,29,24.4l4.33,6.19C34,31.48,33.62,32.21,32.52,32.21Z"
              />
            </svg>
          </span>
          Images blocked for your security.
          <span>
            <button
              className="email-info-button-show-images"
              onClick={ev => props.onTogglePopOverEmailBlocked(ev)}
            >
              Show images
              <PopOverEmailBlocked
                menuPosition={{ left: '285px', top: '100px' }}
                isHidden={props.isHiddenPopOverEmailBlocked}
                onToggleMenu={props.onTogglePopOverEmailBlocked}
              />
            </button>
          </span>
        </div>
      </div>
      <hr />
      <div className="email-body">
        <div disabled={props.hideView || props.isUnsend} className="email-text">
          <div dangerouslySetInnerHTML={{ __html: theMail(props.content) }} />
        </div>
        {!!props.files.length &&
          isExpand(props.displayEmail, props.staticOpen) && (
            <div
              disabled={props.hideView || props.isUnsend}
              className="email-files"
            >
              {props.files.map((file, index) => {
                return (
                  <FileWrapper key={index} file={file} email={props.email} />
                );
              })}
            </div>
          )}
      </div>
    </div>
    {props.staticOpen && (
      <div className="email-segment-controls">
        <div className="replay-button" onClick={() => props.onReplyLast()}>
          <i className="icon-replay" />
          <span>{string.mailbox.reply}</span>
        </div>
        <div className="replay-all-button" onClick={ev => props.onReplyAll(ev)}>
          <i className="icon-replay-all" />
          <span>{string.mailbox.reply_all}</span>
        </div>
        <div className="forward-button" onClick={ev => props.onForward(ev)}>
          <i className="icon-forward" />
          <span>{string.mailbox.forward}</span>
        </div>
      </div>
    )}
  </div>
);

const renderEmailInfoCollapse = (status, preview) => (
  <div className="email-info-content-line">
    {renderEmailStatus(status)}
    <span className="email-preview-content">{preview}</span>
  </div>
);

const renderEmailInfoExpand = props => (
  <div className="email-info-content-line">
    <div className="email-info-content-to">
      {renderEmailStatus(props.email.status)}
      <span>{`To ${showContacts([
        ...props.email.to,
        ...props.email.cc
      ])}`}</span>
      <div className="email-info-content-to-more">
        <span onClick={props.onTooglePopOverEmailMoreInfo}>
          {string.mailbox.more}
        </span>
        <PopOverEmailMoreInfo
          bcc={props.email.bcc}
          cc={props.email.cc}
          from={props.email.from}
          to={props.email.to}
          date={props.dateLong}
          isHidden={props.isHiddenPopOverEmailMoreInfo}
          menuPosition={{ left: '-102px', top: '25px' }}
          onToggleMenu={props.onTooglePopOverEmailMoreInfo}
          subject={props.email.subject}
        />
      </div>
    </div>
    <div className="email-info-content-actions">
      {props.isDraft ? (
        <div>
          <i
            className="icon-pencil"
            onClick={ev => props.onClickEditDraft(ev)}
          />
        </div>
      ) : (
        <div>
          {props.isFromMe &&
            !props.isUnsend &&
            props.email.secure && (
              <ButtonUnsend
                onClick={props.onClickUnsendButton}
                status={props.buttonUnsendStatus}
              />
            )}
          <ButtonIcon
            icon={'icon-replay'}
            onClick={props.onClickReplyEmail}
            status={props.buttonReplyStatus}
          />
          <i
            className="icon-dots"
            onClick={ev => props.onTogglePopOverEmailActions(ev)}
          >
            <PopOverEmailActions
              isHidden={props.isHiddenPopOverEmailActions}
              isSpam={props.isSpam}
              isTrash={props.isTrash}
              isFromMe={props.isFromMe}
              hasBoundary={!!props.email.boundary}
              menuPosition={{ right: '-32px', top: '28px' }}
              onReplyEmail={props.onReplyEmail}
              onReplyAll={props.onReplyAll}
              onForward={props.onForward}
              onMarkAsSpam={props.onMarkAsSpam}
              onMarkUnread={props.onMarkUnread}
              onDelete={props.onDelete}
              onDeletePermanently={props.handleClickPermanentlyDeleteEmail}
              onToggleMenu={props.onTogglePopOverEmailActions}
              onOpenEmailSource={props.onOpenEmailSource}
              onPrintEmail={props.onPrintEmail}
              onReportPhishing={props.onReportPhishing}
            />
          </i>
        </div>
      )}
    </div>
  </div>
);

const showContacts = contacts => {
  return contacts.reduce((result, contact, index) => {
    if (contacts.length > 1) {
      const name = contact.name || contact.email.split('@')[0];
      const firstname = `${index !== 0 ? ', ' : ''}${name.split(' ')[0]}`;
      return `${result}${firstname}`;
    }
    return `${result} ${contact.name || contact.email}`;
  }, '');
};

const renderEmailStatus = status => {
  return <div className="email-status">{defineEmailStatus(status)}</div>;
};

const renderIcons = (
  fileTokens,
  isSecure,
  onMouseEnterTooltip,
  onMouseLeaveTooltip,
  id
) => {
  return (
    <div className="email-info-content-detail-icons">
      {!!fileTokens.length && <i className="icon-attach" />}
      {isSecure &&
        renderIconSecure(onMouseEnterTooltip, onMouseLeaveTooltip, id)}
    </div>
  );
};

const renderIconSecure = (onMouseEnterTooltip, onMouseLeaveTooltip, id) => {
  return (
    <div
      data-tip
      data-for={`securetip${id}`}
      onMouseEnter={() => {
        onMouseEnterTooltip(`securetip${id}`);
      }}
      onMouseLeave={() => {
        onMouseLeaveTooltip(`securestip${id}`);
      }}
    >
      <i className="icon-secure" />
    </div>
  );
};

const theMail = content => {
  const blockImages = true;
  if (!blockImages) return `<div class="email-container">${content}</div>`;
  return getDOM(content);
};

const getDOM = html => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(
    `<div class="email-container">${html}</div>`,
    'text/html'
  );
  const allImages = doc.getElementsByTagName('img');
  for (let img of allImages) {
    const originalHeight = img.height;
    const originalWidth = img.width;
    const el = doc.createElement('div');
    el.innerHTML = `<div style='height: ${originalHeight}; width: ${originalWidth}; min-width: 15px; min-height: 15px; max-width: 30px; max-height: 30px; border: 1px solid #4a4a4a;'>
                              <svg
                                class="image-blocked"
                                data-name="Image blocked"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 40 40"
                              >
                                <path
                                  class="cls-1"
                                  d="M33.7,0H6.3A6.3,6.3,0,0,0,0,6.3V33.7A6.3,6.3,0,0,0,6.3,40H33.7A6.3,6.3,0,0,0,40,33.7V6.3A6.3,6.3,0,0,0,33.7,0ZM27,6.23a4,4,0,1,1-4,4A4,4,0,0,1,27,6.23Zm5.53,26H7.61a1.12,1.12,0,0,1-1.09-1.77L13.32,17a1.14,1.14,0,0,1,2.09-.19l6.84,8.93a1.67,1.67,0,0,0,2.59.16l1.67-1.69A1.6,1.6,0,0,1,29,24.4l4.33,6.19C34,31.48,33.62,32.21,32.52,32.21Z"
                                />
                              </svg>
                            </div>`;
    img.insertAdjacentElement('afterend', el);
    img.remove();
  }
  return `<div class="email-container">${new XMLSerializer().serializeToString(
    doc
  )}</div>`;
};

const defineEmailStatus = status => {
  switch (status) {
    case EmailStatus.SENT:
      return <i className="icon-checked status-sent" />;
    case EmailStatus.DELIVERED:
      return <i className="icon-double-checked status-delivered" />;
    case EmailStatus.READ:
      return <i className="icon-double-checked status-opened" />;
    case EmailStatus.SENDING:
      return <i className="icon-time status-sending" />;
    default:
      return null;
  }
};

const defineEmailState = (displayEmail, staticOpen) => {
  if (isExpand(displayEmail, staticOpen)) {
    return 'email-container-expand';
  }
  return 'email-container-collapse';
};

const defineEmailType = (isUnsend, isDraft, isEmpty) => {
  if (isUnsend) {
    return 'email-unsend';
  } else if (isDraft) {
    return 'email-draft';
  } else if (isEmpty) {
    return 'email-empty';
  }
  return 'email-normal';
};

const isExpand = (displayEmail, staticOpen) => {
  return displayEmail || staticOpen;
};

renderEmailInfoExpand.propTypes = {
  borderUrl: PropTypes.string,
  buttonReplyStatus: PropTypes.number,
  buttonUnsendStatus: PropTypes.number,
  dateLong: PropTypes.string,
  email: PropTypes.object,
  handleClickPermanentlyDeleteEmail: PropTypes.func,
  isDraft: PropTypes.bool,
  isSpam: PropTypes.bool,
  isTrash: PropTypes.bool,
  isFromMe: PropTypes.bool,
  isHiddenPopOverEmailActions: PropTypes.bool,
  isHiddenPopOverEmailMoreInfo: PropTypes.bool,
  isUnsend: PropTypes.bool,
  onClickEditDraft: PropTypes.func,
  onClickReplyEmail: PropTypes.func,
  onClickUnsendButton: PropTypes.func,
  onDelete: PropTypes.func,
  onDeletePermanently: PropTypes.func,
  onForward: PropTypes.func,
  onMarkAsSpam: PropTypes.func,
  onMarkUnread: PropTypes.func,
  onOpenEmailSource: PropTypes.func,
  onPrintEmail: PropTypes.func,
  onReplyEmail: PropTypes.func,
  onReplyAll: PropTypes.func,
  onReportPhishing: PropTypes.func,
  onTogglePopOverEmailActions: PropTypes.func,
  onTooglePopOverEmailMoreInfo: PropTypes.func
};

Email.propTypes = {
  avatarUrl: PropTypes.string,
  borderUrl: PropTypes.string,
  color: PropTypes.string,
  content: PropTypes.string,
  date: PropTypes.string,
  dismissPopup: PropTypes.func,
  displayEmail: PropTypes.bool,
  email: PropTypes.object,
  files: PropTypes.array,
  handleClickPermanentlyDeleteEmail: PropTypes.func,
  handlePopupConfirm: PropTypes.func,
  hideView: PropTypes.bool,
  isDraft: PropTypes.bool,
  isEmpty: PropTypes.bool,
  isUnsend: PropTypes.bool,
  letters: PropTypes.string,
  onForward: PropTypes.func,
  onMouseEnterTooltip: PropTypes.func,
  onMouseLeaveTooltip: PropTypes.func,
  onReplyAll: PropTypes.func,
  onReplyLast: PropTypes.func,
  onToggleEmail: PropTypes.func,
  popupContent: PropTypes.object,
  preview: PropTypes.string,
  staticOpen: PropTypes.bool,
  isHiddenPopOverEmailBlocked: PropTypes.bool,
  onTogglePopOverEmailBlocked: PropTypes.func
};

export default Email;

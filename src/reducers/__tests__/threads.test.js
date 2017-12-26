/* eslint-env node, jest */

import threadsReducer from '../thread';
import * as actions from '../../actions/index';

describe('thread actions', () => {
  it('should add threads to state', () => {
    const threads = [{
      id: 23,
      subject: 'test subject 23',
      preview: 'preview 23',
      date: 1234567890,
      emails: [10, 43]
    }, {
      id: 13,
      subject: 'test subject 13',
      preview: 'preview 13',
      date: 1234567891,
      emails: [11, 21]
    }];
    const action = actions.addThreads(threads);
    const state = threadsReducer(undefined, action);
    expect(state).toMatchSnapshot();
  });

  it('should set thread as read', () => {
    const threads = [{
      id: 23,
      subject: 'test subject 23',
      preview: 'preview 23',
      date: 1234567890,
      emails: [10, 43]
    }]
    const action = actions.addThreads(threads);
    const state = threadsReducer(undefined, action);
    const actionSelect = actions.selectThread(0);
    const newState = threadsReducer(state, actionSelect);
    expect(newState).toMatchSnapshot();
  });
});

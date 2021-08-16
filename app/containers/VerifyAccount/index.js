/**
 *
 * VerifyAccount
 *
 */

import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useInjectSaga } from 'utils/injectSaga';
// Import Actions
import {
  setVerifyCodeAction,
  verifyVerifyCodeAction,
} from 'containers/VerifyAccount/actions';

import saga from 'containers/VerifyAccount/saga';
import reducer from 'containers/VerifyAccount/reducer';
import LoadingIndicator from 'components/LoadingIndicator';
import { useInjectReducer } from 'utils/injectReducer';

const key = 'verifyPage';
export default function VerifyAccount() {
  const dispatch = useDispatch();
  useInjectSaga({ key, saga });
  useInjectReducer({ key, reducer });
  const { code } = useParams();

  useEffect(() => {
    if (code) {
      dispatch(setVerifyCodeAction(code));
      dispatch(verifyVerifyCodeAction());
    }
  }, [code]);

  return <LoadingIndicator />;
}

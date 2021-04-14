/**
 *
 * Notifier
 *
 */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from 'containers/SnackBar/reducer';
import { useInjectSaga } from 'utils/injectSaga';
import saga from 'containers/SnackBar/saga';
import { createStructuredSelector } from 'reselect';
import {
  makeSnackBarMessageSelector,
  makeSnackBarMessageShowSelector,
  makeSnackBarMessageTypeSelector,
} from 'containers/SnackBar/selectors';
import SnackBarWrapper from 'components/SnackBar';
import {
  clearSnackbarAction,
  removeProcessSnackbarAction,
} from 'containers/SnackBar/actions';

const key = 'snackMessage';

const stateSelector = createStructuredSelector({
  message: makeSnackBarMessageSelector(),
  show: makeSnackBarMessageShowSelector(),
  type: makeSnackBarMessageTypeSelector(),
});

export default function SnackBar() {
  const dispatch = useDispatch();

  const autoDismiss = () => dispatch(removeProcessSnackbarAction());
  const clear = () => dispatch(clearSnackbarAction());

  useInjectReducer({ key, reducer });

  useInjectSaga({ key, saga });

  const { message, show, type } = useSelector(stateSelector);

  useEffect(() => {
    if (message !== '') {
      autoDismiss();
    }
  }, [message]);

  if (show)
    return (
      <SnackBarWrapper type={type}>
        {message}
        <button
          type="button"
          className="absolute top-0 bottom-0 right-0 px-4 py-3"
          onClick={clear}
        >
          <svg
            className="fill-current h-6 w-6 text-black"
            role="button"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <title>Close</title>
            <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
          </svg>
        </button>
      </SnackBarWrapper>
    );

  return <div />;
}

// Notifier.propTypes = {
// 	snackbars: PropTypes.array,
// 	enqueueSnackbar: PropTypes.func,
// 	onRemoveSnackbar: PropTypes.func,
// };

/*
 *
 * LanguageToggle
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import Toggle from 'components/Toggle';
import Wrapper from 'containers/LocaleToggle/Wrapper';
import messages from 'containers/LocaleToggle/messages';
import { appLocales } from 'i18n';
import { changeLocaleAction } from 'containers/LanguageProvider/actions';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';

export function LocaleToggle(props) {
  return (
    <Wrapper>
      <Toggle
        value={props.locale}
        values={appLocales}
        messages={messages}
        onToggle={props.onLocaleToggle}
      />
    </Wrapper>
  );
}

LocaleToggle.propTypes = {
  onLocaleToggle: PropTypes.func,
  locale: PropTypes.string,
};

const mapStateToProps = createSelector(makeSelectLocale(), (locale) => ({
  locale,
}));

export function mapDispatchToProps(dispatch) {
  return {
    onLocaleToggle: (evt) => dispatch(changeLocaleAction(evt.target.value)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LocaleToggle);

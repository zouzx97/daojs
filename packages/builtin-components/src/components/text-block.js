import React from 'react';
import PropTypes, { any } from 'prop-types';

export default function TextBlock(props) {
  return (
    <span style={{ ...props.style }}>{props.text}</span>
  );
}

TextBlock.propTypes = {
  text: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  style: PropTypes.objectOf(any),
};

TextBlock.defaultProps = {
  text: '',
  style: {},
};

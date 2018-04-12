import React from 'react';
import PropTypes from 'prop-types';
import TextArea from 'antd/lib/input/TextArea';

export default function TextBlock(props) {
  return (
    <span>{props.text}</span>
  );
}

TextBlock.propTypes = {
  text: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

TextBlock.defaultProps = {
  text: '',
};

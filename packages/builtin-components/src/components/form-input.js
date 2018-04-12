import React from 'react';
import { Form, Input } from 'antd';
import PropTypes from 'prop-types';

export default function FormInput({
  update,
  defaultValue,
  value,
  label,
}) {
  return (
    <Form.Item label={label}>
      <Input
        defaultValue={defaultValue.toString()}
        onChange={e => update(e.target.value)}
        value={value}
      />
    </Form.Item>
  );
}

FormInput.propTypes = {
  update: PropTypes.func.isRequired,
  defaultValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  label: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

FormInput.defaultProps = {
  defaultValue: '',
  label: '',
  value: '',
};

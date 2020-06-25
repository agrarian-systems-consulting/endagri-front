import React from 'react';
import { Field } from 'formik';
import { Form } from 'semantic-ui-react';

const SemanticIntegerField = ({ component, ...fieldProps }) => {
  const { showErrorsInline, ...rest } = fieldProps;

  return (
    <Field {...rest}>
      {({
        field: { value, onBlur, ...field },
        form: { setFieldValue, submitCount, touched, errors, handleBlur },
        ...props
      }) => {
        return React.createElement(component, {
          ...rest,
          ...field,
          ...props,
          ...(component === Form.Radio || component === Form.Checkbox
            ? {
                checked:
                  component === Form.Radio ? fieldProps.value === value : value,
              }
            : {
                value: value || '',
              }),
          ...(component === Form.Dropdown && {
            value: value || [],
          }),

          ...((submitCount >= 1 || touched[field.name]) && errors[field.name]
            ? {
                error:
                  showErrorsInline == false
                    ? true
                    : {
                        content: errors[field.name],
                      },
              }
            : {}),
          onChange: (e, { value: newValue, checked }) =>
            setFieldValue(fieldProps.name, parseInt(newValue, 10) || checked),
          onBlur: handleBlur,
        });
      }}
    </Field>
  );
};

export default SemanticIntegerField;

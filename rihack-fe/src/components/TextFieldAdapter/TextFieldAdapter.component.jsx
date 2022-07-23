import {
  FormControl,
  FormHelperText,
  FormLabel,
  TextField,
  Tooltip,
} from '@mui/material';
import React, { useCallback, useMemo } from 'react';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const TextFieldAdapter = (props) => {
  const {
    input,
    meta,
    label,
    required,
    children,
    select,
    fullWidth,
    className,
    tooltipText,
    area,
    onBlur,
    minRows = 3,
    maxRows = 10,
    ...rest
  } = props;
  const { error, touched } = meta;

  const hasError = useMemo(() => {
    return touched && error;
  }, [touched, error]);

  const handleOnBlur = useCallback(
    (event) => {
      const { value, onChange, type = 'text', onBlur: inputOnBlur } = input;

      inputOnBlur(event);
      onBlur && onBlur(event);

      if (value && type === 'text') {
        onChange(value.trim());
      } else if (value && type === 'number') {
        onChange(value.replace(/^0+(?!\.|$)/, ''));
      }
    },
    [input, onBlur]
  );

  return (
    <FormControl error={!!hasError} fullWidth={fullWidth} className={className}>
      <div>
        {label && (
          <FormLabel htmlFor={input.name} required={required}>
            {label}
          </FormLabel>
        )}
        {tooltipText && (
          <Tooltip title={tooltipText} placement="top" arrow>
            <HelpOutlineIcon />
          </Tooltip>
        )}
      </div>

      <TextField
        id={input.name}
        {...input}
        {...rest}
        error={!!hasError}
        select={select}
        multiline={area}
        minRows={minRows}
        maxRows={maxRows}
        onBlur={handleOnBlur}
      >
        {children}
      </TextField>

      {hasError && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

export default TextFieldAdapter;

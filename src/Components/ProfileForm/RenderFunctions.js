import { Icon, Input, Item, Label } from "native-base";
import React from "react";
import styles from "./css";

export const RenderInput = ({
  label,
  value,
  required,
  checkFunction,
  onChange,
  keyboardType,
  maxLength = 128,
  disabled,
  secureTextEntry,
  itemStyle,
  error,
}) => {
  return (
    <>
      <Label style={styles.label}>
        {label}
        {required ? "*" : ""}
      </Label>
      <Item
        rounded
        style={itemStyle || styles.inputItem}
        success={
          value !== null &&
          checkFunction &&
          value.length > 0 &&
          checkFunction(value)
        }
        error={
          error !== undefined
            ? error
            : value !== null &&
              checkFunction &&
              value.length > 0 &&
              !checkFunction(value)
        }
      >
        <Input
          style={styles.input}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType || "default"}
          maxLength={maxLength}
          onChangeText={onChange}
          value={value}
          disabled={disabled}
        />
        {value && checkFunction && value.length > 0 ? (
          <Icon
            name={checkFunction(value) ? "checkmark-circle" : "close-circle"}
            style={checkFunction(value) ? styles.green : styles.red}
          />
        ) : null}
      </Item>
    </>
  );
};

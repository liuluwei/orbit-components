// @flow
import * as React from "react";
import styled, { css } from "styled-components";
import { warning } from "@adeira/js";

import { ICON_SIZES } from "../../Icon/consts";
import IconContainer from "./components/IconContainer";
import defaultTheme from "../../defaultTheme";
import { TOKENS, BUTTON_STATES, SIZE_OPTIONS, TYPE_OPTIONS } from "./consts";
import { StyledSpinner } from "../../Loading";
import getSpacingToken from "../../common/getSpacingToken";
import getSizeToken from "./helpers/getSizeToken";
import getTypeToken from "./helpers/getTypeToken";
import getButtonSpacing from "./helpers/getButtonSpacing";
import getButtonBoxShadow from "./helpers/getButtonBoxShadow";
import getFocus from "./helpers/getFocus";

import type { Props } from "./index";

export const StyledButton = styled(
  ({
    theme,
    asComponent = "button",
    buttonLink,
    circled,
    external,
    type,
    icon,
    sizeIcon,
    width,
    bordered,
    loading,
    onlyIcon,
    fullWidth,
    style,
    dataTest,
    submit,
    ref,
    ariaControls,
    ariaExpanded,
    spaceAfter,
    title,
    size,
    ...props
  }) => {
    const isButtonWithHref = asComponent === "button" && props.href;
    const Component = isButtonWithHref ? "a" : asComponent;
    const buttonType = submit ? "submit" : "button";

    return (
      <Component
        data-test={dataTest}
        aria-controls={ariaControls}
        aria-expanded={ariaExpanded}
        aria-label={title}
        type={!isButtonWithHref ? buttonType : undefined}
        {...props}
        ref={ref}
      >
        {props.children}
      </Component>
    );
  },
)`
  position: relative;
  display: ${({ href, asComponent }) => (href || asComponent === "a" ? "inline-flex" : "flex")};
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  appearance: none;
  text-decoration: none;
  width: ${({ fullWidth, width, onlyIcon }) =>
    fullWidth
      ? "100%"
      : (width && `${width}px`) || (onlyIcon && getSizeToken(TOKENS.heightButton)) || "auto"};
  flex: ${({ fullWidth }) => (fullWidth ? "1 1 auto" : "0 0 auto")};
  max-width: 100%; // to ensure that Buttons content wraps in IE
  height: ${getSizeToken(TOKENS.heightButton)};
  background: ${({ bordered }) =>
    bordered
      ? getTypeToken(TOKENS.backgroundButtonBordered)
      : getTypeToken(TOKENS.backgroundButton)};
  color: ${({ bordered }) =>
    bordered
      ? getTypeToken(TOKENS.colorTextButtonBordered)
      : getTypeToken(TOKENS.colorTextButton)} !important;
  border: 0;
  border-radius: ${({ theme, circled }) =>
    circled ? getSizeToken(TOKENS.heightButton) : theme.orbit.borderRadiusNormal};
  padding: ${getButtonSpacing()};
  font-family: ${({ theme }) => theme.orbit.fontFamily};
  font-weight: ${({ theme }) => theme.orbit.fontWeightBold}!important;
  font-size: ${getSizeToken(TOKENS.fontSizeButton)};
  line-height: 1.4; // preventing inheriting with safe value
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: all 0.15s ease-in-out !important;
  outline: 0;
  opacity: ${({ disabled, theme }) => disabled && theme.orbit.opacityButtonDisabled};
  margin-bottom: ${getSpacingToken};
  ${getButtonBoxShadow(BUTTON_STATES.DEFAULT)};

  &:hover {
    background: ${({ disabled, bordered, transparent }) =>
      !disabled &&
      !transparent &&
      (bordered
        ? getTypeToken(TOKENS.backgroundButtonBorderedHover)
        : getTypeToken(TOKENS.backgroundButtonHover))};
    color: ${({ disabled, bordered, transparent }) =>
      !disabled &&
      !transparent &&
      (bordered
        ? getTypeToken(TOKENS.colorTextButtonBorderedHover)
        : getTypeToken(TOKENS.colorTextButtonHover))}!important;
    ${getButtonBoxShadow(BUTTON_STATES.HOVER)};

    ${IconContainer} {
      color: ${({ disabled, bordered }) =>
        !disabled &&
        (bordered
          ? getTypeToken(TOKENS.colorTextButtonBorderedHover)
          : getTypeToken(TOKENS.colorTextButtonHover))};
    }
  }

  &:active {
    ${({ buttonLink, transparent, disabled, bordered }) =>
      buttonLink
        ? !disabled &&
          css`
              background: ${!transparent && getTypeToken(TOKENS.backgroundButtonActive)};
              color: ${getTypeToken(TOKENS.colorTextButtonActive)}!important;
              ${getButtonBoxShadow(BUTTON_STATES.ACTIVE)};
            ;
      }`
        : !disabled &&
          css`
            background: ${bordered || !transparent
              ? getTypeToken(TOKENS.backgroundButtonBorderedActive)
              : getTypeToken(TOKENS.backgroundButtonActive)};
            ${getButtonBoxShadow(BUTTON_STATES.ACTIVE)};
            color: ${bordered
              ? getTypeToken(TOKENS.colorTextButtonBorderedActive)
              : getTypeToken(TOKENS.colorTextButtonActive)}!important;
            & ${IconContainer} {
              color: ${bordered
                ? getTypeToken(TOKENS.colorTextButtonBorderedActive)
                : getTypeToken(TOKENS.colorTextButtonActive)};
            }
          `};

    ${StyledSpinner} {
      width: ${getSizeToken(TOKENS.loadingWidth)};
      height: ${getSizeToken(TOKENS.loadingHeight)};
    }

    ${getFocus};
  }
`;

StyledButton.defaultProps = {
  theme: defaultTheme,
};

const ButtonPrimitive = (props: Props) => {
  const {
    children,
    title,
    size = SIZE_OPTIONS.NORMAL,
    type = TYPE_OPTIONS.PRIMARY,
    iconLeft,
    loading,
    onlyIcon,
    disabled,
    buttonLink,
    ...properties
  } = props;

  const sizeIcon = size === ICON_SIZES.SMALL ? ICON_SIZES.SMALL : ICON_SIZES.MEDIUM;
  const isDisabled = loading || disabled;

  const name = buttonLink ? `buttonLink` : `button`;

  warning(
    !(!children && !title),
    `Warning: children or title property is missing on ${name}. Use title property to add aria-label to be accessible for screen readers. More information https://orbit.kiwi/components/${name}/api/#accessibility`,
  );

  return (
    <StyledButton
      sizeIcon={sizeIcon}
      onlyIcon={onlyIcon}
      disabled={isDisabled}
      size={size}
      type={type}
      title={title}
      buttonLink={buttonLink}
      {...properties}
    >
      {children}
    </StyledButton>
  );
};

export default ButtonPrimitive;

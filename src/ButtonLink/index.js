// @flow
import * as React from "react";

import { ICON_SIZES } from "../Icon/consts";
import { TYPE_OPTIONS, SIZE_OPTIONS } from "../primitives/ButtonPrimitive/consts";
import ButtonPrimitive from "../primitives/ButtonPrimitive";
import IconContainer from "../primitives/ButtonPrimitive/components/IconContainer";
import ButtonPrimitiveContent from "../primitives/ButtonPrimitive/components/ButtonContent";
import ButtonPrimitiveContentChildren from "../primitives/ButtonPrimitive/components/ButtonContentChildren";

import type { Props } from "./index";

const ButtonLink = React.forwardRef<Props, HTMLButtonElement>((props, ref) => {
  const {
    external,
    children,
    asComponent,
    href,
    size = SIZE_OPTIONS.NORMAL,
    icon,
    iconRight,
    type = TYPE_OPTIONS.PRIMARY,
    onClick,
    width = 0,
    role,
    disabled,
    circled,
    submit,
    transparent,
    ariaExpanded,
    ariaControls,
    spaceAfter,
    dataTest,
    tabIndex,
    title,
    fullWidth,
    className,
  } = props;

  const iconLeft = props.iconLeft || icon;
  const sizeIcon = size === ICON_SIZES.SMALL ? ICON_SIZES.SMALL : ICON_SIZES.MEDIUM;

  const onlyIcon = Boolean(iconLeft && !children);

  return (
    <ButtonPrimitive
      onClick={onClick}
      asComponent={asComponent}
      size={size}
      buttonLink
      onlyIcon={onlyIcon}
      sizeIcon={sizeIcon}
      type={type}
      href={!disabled ? href : null}
      target={!disabled && href && external ? "_blank" : undefined}
      rel={!disabled && href && external ? "noopener noreferrer" : undefined}
      iconLeft={iconLeft}
      iconRight={iconRight}
      ref={ref}
      width={width}
      className={className}
      role={role}
      disabled={disabled}
      fullWidth={fullWidth}
      circled={circled}
      submit={submit}
      transparent={transparent}
      ariaExpanded={ariaExpanded}
      ariaControls={ariaControls}
      title={title}
      spaceAfter={spaceAfter}
      tabIndex={tabIndex}
      dataTest={dataTest}
    >
      <ButtonPrimitiveContent>
        {iconLeft && (
          <IconContainer size={size} type={type} onlyIcon={onlyIcon} sizeIcon={sizeIcon}>
            {iconLeft}
          </IconContainer>
        )}
        {children && <ButtonPrimitiveContentChildren>{children}</ButtonPrimitiveContentChildren>}
        {iconRight && (
          <IconContainer size={size} type={type} onlyIcon={onlyIcon} sizeIcon={sizeIcon} right>
            {iconRight}
          </IconContainer>
        )}
      </ButtonPrimitiveContent>
    </ButtonPrimitive>
  );
});

ButtonLink.displayName = "ButtonLink";

export default ButtonLink;

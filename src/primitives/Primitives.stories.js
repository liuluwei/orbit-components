// @flow
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { text, select, number, boolean } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import ButtonPrimitive from "./ButtonPrimitive";
import * as Icons from "../icons";
import BadgePrimitive from "./BadgePrimitive";
import { TYPE_OPTIONS, SIZE_OPTIONS } from "./ButtonPrimitive/consts";
import SPACINGS_AFTER from "../common/getSpacingToken/consts";

const getIcons = defaultIcon => select("Icon", [null, ...Object.keys(Icons)], defaultIcon);
const getIcon = source => Icons[source];

storiesOf("Primitives", module)
  .add(
    "BadgePrimitive",
    () => {
      const Icon = getIcon(getIcons("Airplane"));
      const background = text("Background", "linear-gradient(#fd1d1d, #ffae28)");
      const foregroundColor = text("ForegroundColor", "#fff");

      return (
        <BadgePrimitive
          background={background}
          foregroundColor={foregroundColor}
          icon={Icon && <Icon />}
        >
          BadgePrimitive
        </BadgePrimitive>
      );
    },
    {
      info: "This is a preview of this component in RTL setup.",
    },
  )
  .add("ButtonPrimitive", () => {
    const buttonLink = boolean("ButtonLink", false);
    const children = text("Children", "Button");
    const href = text("Href", undefined);
    const external = boolean("External", false);
    const asComponent = text("asComponent", "button");
    const disabled = boolean("Disabled", false);
    const fullWidth = boolean("fullWidth", false);
    const type = select("Type", Object.values(TYPE_OPTIONS), "primary");
    const size = select("Size", Object.values(SIZE_OPTIONS), "normal");
    const width = number("Width", 0);
    const bordered = boolean("Bordered", false);
    const circled = boolean("Circled", false);
    const loading = boolean("Loading", false);
    const transparent = boolean("Transparent", false);
    const submit = boolean("Submit", false);
    const dataTest = text("dataTest", "test");
    const IconLeft = getIcon(getIcons("iconLeft", "Airplane"));
    const IconRight = getIcon(getIcons("iconRight", "ChevronDown"));
    const ariaExpanded = boolean("Aria expanded", false);
    const ariaControls = text("Aria controls", "element ID");
    const tabIndex = text("tabIndex", "0");
    const spaceAfter = select("spaceAfter", [null, ...Object.values(SPACINGS_AFTER)]);
    const title = text("Title", "Additional information for accessibility");

    return (
      <ButtonPrimitive
        onClick={action("clicked")}
        asComponent={asComponent}
        href={href}
        external={external}
        disabled={disabled}
        circled={circled}
        fullWidth={fullWidth}
        buttonLink={buttonLink}
        bordered={bordered}
        loading={loading}
        dataTest={dataTest}
        type={type}
        size={size}
        iconLeft={IconLeft && <IconLeft />}
        iconRight={IconRight && <IconRight />}
        submit={submit}
        transparent={transparent}
        width={width}
        ariaControls={ariaControls}
        ariaExpanded={ariaExpanded}
        tabIndex={tabIndex}
        spaceAfter={spaceAfter}
        title={title}
      >
        {children}
      </ButtonPrimitive>
    );
  });

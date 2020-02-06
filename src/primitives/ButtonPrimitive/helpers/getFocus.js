// @flow
import { css } from "styled-components";

import { TOKENS, BUTTON_STATES } from "../consts";
import getTypeToken from "./getTypeToken";
import getButtonBoxShadow from "./getButtonBoxShadow";
import type { GetFocus } from "./getFocus";

const getFocus: GetFocus = ({ bordered, buttonLink }) => {
  return css`
    :focus {
      ${!buttonLink && getButtonBoxShadow(BUTTON_STATES.FOCUS)};
      background: ${bordered && getTypeToken(TOKENS.backgroundButtonFocus)};
    }
    :focus:not(:focus-visible) {
      box-shadow: none;
      background: ${bordered
        ? getTypeToken(TOKENS.backgroundButtonBordered)
        : getTypeToken(TOKENS.backgroundButton)};
    }
    :-moz-focusring,
    :focus-visible {
      ${!buttonLink && getButtonBoxShadow(BUTTON_STATES.FOCUS)};
      background: ${bordered && getTypeToken(TOKENS.backgroundButtonFocus)};
    }
  `;
};

export default getFocus;

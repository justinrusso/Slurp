/**
 *
 * @param {string} hexString
 */
export function hexToRGB(hexString) {
  let hexCode = hexString;
  if (hexString.startsWith("#")) {
    hexCode = hexString.slice(1);
  }

  if (hexCode.length !== 3 && hexCode.length !== 6) {
    throw new Error("Unsupported hex code length");
  }

  const regex = new RegExp(`([a-f\\d]{${hexCode.length === 3 ? 1 : 2}})`, "gi");
  let hexCodes = hexCode.match(regex);

  if (!hexCodes || hexCodes.length !== 3) {
    throw new Error("Invalid hex code");
  }

  if (hexCode.length === 3) {
    hexCodes = hexCodes.map((shortHex) => `${shortHex}${shortHex}`);
  }

  return {
    r: parseInt(hexCodes[0], 16),
    g: parseInt(hexCodes[1], 16),
    b: parseInt(hexCodes[2], 16),
  };
}

/**
 *
 * @param {string} hexString
 * @param {number} opacity A number from 0 - 1
 */
export function addOpacityToHex(hexString, opacity) {
  if (opacity < 0 || opacity > 1) {
    throw new Error("Unsupported opacity value");
  }

  const rgb = hexToRGB(hexString);

  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`;
}

// From https://github.com/mui-org/material-ui/blob/master/packages/mui-material/src/Paper/Paper.js
/**
 * Gets the background-image overlay opacity for dark mode
 * @param {number} elevation
 * @returns {number}
 */
export const getOverlayAlpha = (elevation) => {
  let alphaValue;
  if (elevation < 1) {
    alphaValue = 5.11916 * elevation ** 2;
  } else {
    alphaValue = 4.5 * Math.log(elevation + 1) + 2;
  }
  return (alphaValue / 100).toFixed(2);
};

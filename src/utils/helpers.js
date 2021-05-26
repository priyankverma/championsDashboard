const deviceWidth = {
  mobileS: "250px", // 320 is the standard
  tablet: "768px",
  desktop: "980px",
};

export const device = {
  mobileS: `(min-width: ${deviceWidth.mobileS})`,
  tablet: `(min-width: ${deviceWidth.tablet})`,
  desktop: `(min-width: ${deviceWidth.desktop})`,
};

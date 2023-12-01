const BADGE_COLOR = Object.freeze({
  CONTRIBUTOR: "orange",
  VIEWER: "blue",
});
export const getBadgeColor = (key: any) => {
  // @ts-ignore
  return BADGE_COLOR[key] ?? "primary";
};

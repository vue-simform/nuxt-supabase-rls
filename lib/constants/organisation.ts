export const ROLES = Object.freeze({
  CONTRIBUTOR: "ORG_CONTRIBUTOR",
  VIEWER: "ORG_VIEWER",
});
const BADGE_COLOR = Object.freeze({
  [ROLES.CONTRIBUTOR]: "orange",
  [ROLES.VIEWER]: "blue",
});
export const getBadgeColor = (key: any) => {
  // @ts-ignore
  return BADGE_COLOR[key] ?? "primary";
};

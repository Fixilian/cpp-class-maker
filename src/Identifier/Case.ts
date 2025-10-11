/**
 * Cases represents enum of possible cases of identifier.
 */
export const Cases = {
  CamelCase: "camelCase",
  PascalCase: "PascalCase",
  SnakeCase: "snake_case",
  Untouched: "Untouched",
} as const;

/**
 * Case provides type for Cases enum.
 */
export type Case = (typeof Cases)[keyof typeof Cases];

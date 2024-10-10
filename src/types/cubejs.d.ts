// src/types/cubejs.d.ts
export type BinaryOperator =
  | "equals"
  | "notEquals"
  | "contains"
  | "notContains"
  | "gt"
  | "gte"
  | "lt"
  | "lte";

export interface CubejsFilter {
  dimension: string;
  operator: BinaryOperator;
  values: any[];
}

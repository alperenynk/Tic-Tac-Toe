/** Turns a list of values + a label map into SegmentedControl options. */
export const toOptions = <T extends string>(values: readonly T[], labels: Record<T, string>) =>
  values.map((value) => ({ value, label: labels[value] }));

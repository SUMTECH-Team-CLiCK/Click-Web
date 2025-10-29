export const flattenEntries = (value, path = []) => {
  if (Array.isArray(value)) {
    return value.flatMap((item, index) => flattenEntries(item, [...path, index]));
  }

  if (value !== null && typeof value === "object") {
    return Object.entries(value).flatMap(([key, val]) => flattenEntries(val, [...path, key]));
  }

  return [{ key: path.join("."), value }];
};

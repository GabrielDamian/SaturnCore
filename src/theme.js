export const theme = {
  colors: {
    bg_1: "#1b1b1b",
    bg_2: "#222222",

    accent_1: "#6e8086",
    accent_2: "#ffffff",
    accent_3: "#aa8453",
    accent_4: "#e4a853",
    accent_5: "#aa8453",
  },
  fonts: {
    body: "Rubik, sans-serif",
    headings: "Baskervville SC, sans-serif",
  },
  borderRadius: {
    sm: "4px",
    md: "8px",
    lg: "12px",
  },
  boxShadow: {
    sm: "0 2px 4px rgba(0, 0, 0, 0.1)",
    md: "0 4px 8px rgba(0, 0, 0, 0.1)",
    lg: "0 8px 16px rgba(0, 0, 0, 0.1)",
  },
};

export function flattenObject(obj, parentKey = "", separator = "-") {
  const flattened = {};

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      const newKey = parentKey ? `--${parentKey}${separator}${key}` : key;

      if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
        Object.assign(flattened, flattenObject(obj[key], newKey, separator));
      } else {
        flattened[newKey] = obj[key];
      }
    }
  }

  return flattened;
}

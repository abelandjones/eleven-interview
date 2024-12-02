import { currencySymbols } from "@/lib/currencies";

/**
 * Converts a number into a money format with two decimal places.
 * @param {number} amount - The amount to be converted.
 * @returns {string} - The formatted money string.
 */
export const formatMoney = (
  amount: number,
  currency: string = "GBP",
): string => {
  const symbol = currencySymbols[currency] ?? "£";

  return `${symbol}${amount.toFixed(2)}`;
};

export const formatStrings = (text: string) => {
  // remove spaces, quotes and square brackets and Split the string by commas
  return text.replace(/[\s'"\[\]]/g, "").split(",");
};

export const formatTitle = (title?: string) => {
  return title?.split("-")[1]?.trim() ?? title;
};

export const formatSellingPlan = (sellingPlan: string) => {
  if (sellingPlan.includes("1")) return sellingPlan.replace("-", " ");

  return `${sellingPlan.replace("-", " ")}s`;
};

export const formatProductId = (id?: string) => {
  if (!id) return "";
  return id.split("/")[4];
};

export const formatCheckoutId = (id?: string) => {
  if (!id) return "";
  return id.split("/")[4]?.split("?")[0];
};
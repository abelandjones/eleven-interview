import DOMPurify from "dompurify";

export const createHTML = (htmlString: string) => {
  if (typeof htmlString !== "string") {
    return { __html: "" };
  }

  // Sanitize the HTML string
  const sanitizedHTML = DOMPurify.sanitize(htmlString);

  return { __html: sanitizedHTML };
};

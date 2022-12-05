export const scrollToTop = (x: number | undefined) => {
  if (x !== undefined) window.scrollTo({ top: x, behavior: "smooth" });
};

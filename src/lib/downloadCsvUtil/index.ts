export const downloadCSVString = (input: string, title?: string): void => {
  const hiddenElement = document.createElement("a");
  hiddenElement.href = `data:text/csv;charset=utf-8,${encodeURI(input)}`;
  hiddenElement.target = "_blank";
  hiddenElement.download = `${
    title ? title.toLowerCase().split(" ").join("_") : "data"
  }.csv`;
  hiddenElement.click();
  hiddenElement.remove();
};

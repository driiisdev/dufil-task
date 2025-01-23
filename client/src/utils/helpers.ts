export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString();
};

export const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
};

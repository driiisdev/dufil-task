export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString();
};

export const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
};

export const handleApiError = (error: any) => {
  if (error.response) {
    return error.response.data.message || 'An error occurred';
  }
  return 'Network error occurred';
};

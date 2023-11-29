export const getDeleteDate = () => {
  const currentDate = new Date();
  const deleteDate = new Date();
  deleteDate.setDate(currentDate.getDate() - 1);
  return deleteDate;
};

export const getDeleteDateInterval = (date: Date) => {
  const starOfDeleteDate = new Date(date);
  starOfDeleteDate.setUTCHours(0, 0, 0, 0);

  const endOfDeleteDate = new Date(date);
  endOfDeleteDate.setUTCHours(23, 59, 59, 999);

  return {
    starOfDeleteDate,
    endOfDeleteDate,
  };
};

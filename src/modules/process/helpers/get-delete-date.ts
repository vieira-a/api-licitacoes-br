export const getDeleteDate = () => {
  const currentDate = new Date();
  const deleteDate = new Date();
  deleteDate.setDate(currentDate.getDate() - 1);
  return deleteDate;
};

export default ({ date, month, year }: { date: number; month: number; year: number }): number => {
  const currDate = new Date();
  const birthDate = new Date(year, month, date);
  const yearDifference = currDate.getUTCFullYear() - birthDate.getUTCFullYear();
  return Math.abs(yearDifference);
};

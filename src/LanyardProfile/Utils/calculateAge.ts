export default ({ date, month, year }: { date: number; month: number; year: number }): number => {
  // https://jsdate.wtf
  const dob = new Date(year, month - 1, date);
  const msDifference = Date.now() - dob.getTime();
  const ageDate = new Date(msDifference);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

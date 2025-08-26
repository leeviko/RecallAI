function getShortMonthName(monthIndex: number) {
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  return monthNames[monthIndex] || '';
}

export const prettyDate = (date: Date) => {
  return `${getShortMonthName(
    date.getMonth()
  )} ${date.getDate()}, ${date.getFullYear()}`;
};

export const formatDuration = (duration: number) => {
  const minutes = Math.floor(duration / 60000);
  const seconds = Math.floor((duration % 60000) / 1000);
  return `${minutes} min ${seconds} sec`;
};

function formatDate(dateString) {
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  };

  const date = new Date(dateString);
  const formattedDate = new Intl.DateTimeFormat('en-us', options).format(date);

  return formattedDate;
}

module.exports = formatDate;
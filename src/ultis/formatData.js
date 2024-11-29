const date = new Date();
const formattedDateTime =
  date.toLocaleDateString("en-GB") +
  " " +
  date.toLocaleTimeString("en-GB", { hour12: false });

module.exports = {
  formattedDateTime,
};

let date = document.querySelector("#date");
let day = document.querySelector("#day");

function getFormattedDate() {
  const today = new Date();
  const options = { month: "short", day: "2-digit" };
  return today.toLocaleDateString("en-uk", options);
}

function getFormattedDay() {
  const today = new Date();
  const options = { weekday: "long" };
  return today.toLocaleDateString("en-uk", options);
}

date.textContent = getFormattedDate();
day.textContent = getFormattedDay();

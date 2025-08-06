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

const userQuery = document.querySelector("#search");
const selectedSearchType = document.querySelector("#category");

userQuery.addEventListener("keydown", function (e) {
  if (e.key == "Enter") {
    search();
  }
});

function search() {
  const query = userQuery.value.trim();
  const platform = selectedSearchType.value;

  if (!query || platform === "none") {
    alert("Please enter a search query and select a platform");
    return;
  }

  let url = "";

  if (platform == "google") {
    url = "https://www.google.com/search?q=" + query;
  }

  if (platform == "youtube") {
    url = "https://www.youtube.com/results?search_query=" + query;
  }

  if (platform == "mdn") {
    url = "https://developer.mozilla.org/en-US/search?q=" + query;
  }

  if (platform == "wiki") {
    url = "https://en.wikipedia.org/wiki/Special:Search?search=" + query;
  }

  if (url) {
    window.open(url, "_blank");
  }

  if (platform == "dict") {
    url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + query;

    axios
      .get(url)
      .then((response) => {
        console.log(`Word: ${response.data[0].word}`);
        console.log(`Pronunciation: ${response.data[0].phonetics[0].text}`);
        console.log(`Adjective: ${response.data[0].meanings[0].partOfSpeech}`);
        console.log(
          `Definition: ${response.data[0].meanings[0].definitions[0].definition}`
        );
        console.log(response.data);
      })
      .catch((e) => {
        console.log("Error Fetching Data:", e);
      });
  }
}

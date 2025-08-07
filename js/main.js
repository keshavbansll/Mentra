let date = document.querySelector("#date");
let day = document.querySelector("#day");
let darkBackground = document.querySelector(".dark");
darkBackground.classList.add("hidden");

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
const dictBlock = document.querySelector(".dictionary");

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

  let word = document.querySelector(".word h1");
  let pronunciation = document.querySelector(".word h3");
  let partOfSpeech = document.querySelector(".part-of-speech");
  let definition = document.querySelector(".definition");

  if (platform == "mentra") {
    url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + query;

    axios
      .get(url)
      .then((response) => {
        word.innerText = response.data[0].word;
        pronunciation.innerText = response.data[0].phonetics[0].text;
        partOfSpeech.innerText = response.data[0].meanings[0].partOfSpeech;
        definition.innerText =
          response.data[0].meanings[0].definitions[0].definition;
        // console.log(response.data);
      })
      .catch((e) => {
        word.innerText = e;
        pronunciation.innerText = "";
        partOfSpeech.innerText = "";
        definition.innerText = "";
        alert(
          "Could not find requested word in Dictionary. Try searching another word."
        );
      });

    dictBlock.classList.remove("hidden");
    dictBlock.classList.add("expand-right");
  }
}

let dictExpandButton = document.querySelector("#dict-expand-btn");

function updateExpandIconVisibility() {
  const platform = selectedSearchType.value;
  if (platform === "mentra") {
    dictExpandButton.classList.remove("hidden");
  } else {
    dictExpandButton.classList.add("hidden");
  }
}

updateExpandIconVisibility();

selectedSearchType.addEventListener("change", updateExpandIconVisibility);

dictBlock.classList.add("hidden");

let toggle = false;

function showDictionaryDefintion() {
  if (!toggle) {
    dictBlock.classList.remove("hidden");
    dictBlock.classList.add("expand-right");
    darkBackground.classList.remove("hidden");
    darkBackground.classList.add("overlay");
  } else {
    dictBlock.classList.add("hidden");
    dictBlock.classList.remove("expand-right");
    darkBackground.classList.add("hidden");
    darkBackground.classList.remove("overlay");
  }

  toggle = !toggle;
}

dictExpandButton.addEventListener("click", showDictionaryDefintion);

function updateClock() {
  const now = new Date();
  const timeString = now.toLocaleTimeString("en-uk", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  document.querySelector("#clock").textContent = timeString;
}

updateClock();
setInterval(updateClock, 1000);

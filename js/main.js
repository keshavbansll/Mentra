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
    dictBlock.classList.add("scaleUp");
    darkBackground.classList.remove("hidden");
    darkBackground.classList.add("overlay");

    toggle = true;
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
    dictBlock.classList.add("scaleUp");
    darkBackground.classList.remove("hidden");
    darkBackground.classList.add("overlay");
  } else {
    dictBlock.classList.add("hidden");
    dictBlock.classList.remove("scaleUp");
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

let quoteText = document.querySelector(".quote-text");

// function dailyQuote() {
//   url = "https://api.api-ninjas.com/v1/quotes";

//   axios
//     .get(url, {
//       headers: { "X-Api-Key": "atITxGd9o3C92eKZlLoDAg==pN8vWgzYhjU5vTM7" },
//     })
//     .then((response) => {
//       quoteText.innerHTML = "🎯" + response.data[0].quote;
//       console.log(response.data[0]);
//     })
//     .catch((e) => {
//       console.log(`Error fetching quote ${e}`);
//     });
// }

// dailyQuote();

// let nextQuoteBtn = document.querySelector(".change");

// nextQuoteBtn.addEventListener("click", dailyQuote);

// let addStreakBtn = document.querySelector(".add-date");

// addStreakBtn.addEventListener("click", () => {
//   const todayElement = document.querySelector(".days .today");
//   if (todayElement) {
//     todayElement.innerHTML = '<i class="fa-solid fa-check check"></i>';
//   }
// });

let addTaskIcon = document.querySelector(".icons i");
let addTaskInput = document.querySelector(".todo-search");

let taskToggle = false;

addTaskIcon.addEventListener("click", () => {
  if (!taskToggle) {
    addTaskInput.classList.remove("hidden");
    addTaskInput.classList.add("slideLeft");
    addTaskInput.classList.remove("slideRight");
  } else {
    addTaskInput.classList.add("slideRight");
    addTaskInput.classList.remove("slideLeft");
    setTimeout(() => {
      addTaskInput.classList.add("hidden");
    }, 500);
  }

  taskToggle = !taskToggle;
});

let todoSearch = document.querySelector(".todo-search");
let tasks = document.querySelector(".todo-tasks");

let taskInfo = document.querySelector(".task-info h3");

function updateTaskInfoVisibilty() {
  let progressBar = document.querySelector(".progress-bar");

  if (tasks.children.length > 0) {
    taskInfo.textContent = "Progress";
    progressBar.classList.remove("hidden");
  } else {
    taskInfo.textContent = "You do not have any added tasks yet!";
    progressBar.classList.add("hidden");
  }
}

let progressBar = document.querySelector("#task-progress");
let progressText = document.querySelector("#progress-text");
progressBar.setAttribute("data-completed", 0);

let totalTasks = 0;
let completedTasks = 0;

function updateProgress() {
  if (totalTasks > 0 && completedTasks === totalTasks) {
    totalTasks = 0;
    completedTasks = 0;
  }
  progressBar.max = totalTasks;
  progressBar.value = completedTasks;

  let progress =
    totalTasks > 0 ? Math.floor((completedTasks / totalTasks) * 100) : 0;

  progressText.textContent = `${progress}%`;
}

function addTask() {
  if (!todoSearch.value.trim()) return;

  totalTasks++;

  let newTask = document.createElement("label");

  newTask.classList.add("task-wrapper");
  tasks.appendChild(newTask);

  let newCheck = document.createElement("input");

  newCheck.type = "checkbox";
  newTask.appendChild(newCheck);

  let newMark = document.createElement("div");
  let newIcon = document.createElement("i");

  newMark.classList.add("checkmark");
  newIcon.classList.add("fa-solid");
  newIcon.classList.add("fa-check");
  newMark.appendChild(newIcon);
  newTask.appendChild(newMark);

  let newTaskTitle = document.createElement("p");
  newTaskTitle.innerText = todoSearch.value;
  newTask.append(newTaskTitle);

  newCheck.addEventListener("change", () => {
    if (newCheck.checked) {
      setTimeout(() => {
        newTask.remove();
        completedTasks++;
        updateProgress();
        updateTaskInfoVisibilty();
      }, 700);
    }
  });

  todoSearch.value = "";

  updateTaskInfoVisibilty();
  updateProgress();
}

todoSearch.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    addTask();
  }
});

updateTaskInfoVisibilty();

function updateCalendarDates() {
  const today = new Date();
  const currentDayIndex = today.getDay();

  const daysList = document.querySelectorAll(".days li");

  for (let i = 0; i < daysList.length; i++) {
    let dateObj = new Date(today);
    dateObj.setDate(today.getDate() - currentDayIndex + i);
    daysList[i].textContent = dateObj.getDate();
    daysList[i].classList.remove("today");
  }

  daysList[currentDayIndex].classList.add("today");
}

updateCalendarDates();

setInterval(() => {
  const now = new Date();
  if (now.getHours() === 0 && now.getMinutes() === 0) {
    updateCalendarDates();
  }
}, 60000);

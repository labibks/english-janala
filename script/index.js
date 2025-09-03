// function pronounceWord(word) {
//   const utterance = new SpeechSynthesisUtterance(word);

//   // List all available voices
//   const voices = window.speechSynthesis.getVoices();

//   // Try to pick a female English voice
//   const femaleVoice = voices.find(
//     (voice) =>
//       voice.lang.startsWith("en") &&
//       (voice.name.toLowerCase().includes("female") ||
//         voice.name.toLowerCase().includes("woman") ||
//         voice.name.toLowerCase().includes("zira")) // Windows e Microsoft Zira holo female
//   );

//   // If found, set that voice
//   if (femaleVoice) {
//     utterance.voice = femaleVoice;
//   }

//   window.speechSynthesis.speak(utterance);
// }

// // Important: On some browsers, getVoices() doesn't return instantly
// window.speechSynthesis.onvoiceschanged = () => {
//   console.log(window.speechSynthesis.getVoices());
// };

function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}

const cratElements = (arr) => {
  const htmlElements = arr.map((el) => `<span class="btn">${el}</span>`);
  return htmlElements.join(" ");
};

const manegSpinner = (status) => {
  if (status == true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("word-container").classList.add("hidden");
  } else {
    document.getElementById("word-container").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
};

const loadLesson = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      displayLesson(json.data);
    });
};
// btn gula re active korar jonno ekhane kaj kora hoyse
const removeActive = () => {
  const lessonButtons = document.querySelectorAll(".btn-lesson");
  // console.log(lessonButtons)
  lessonButtons.forEach((btn) => btn.classList.remove("active"));
};

const loadLevelWord = (id) => {
  manegSpinner(true);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActive(); //remove all active class
      const clickBtn = document.getElementById(`lesson-btn-${id}`);
      clickBtn.classList.add("active"); //add active class only select button
      displayLevelWord(data.data);
    });
};
// word details show
const loadWordDetail = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  displayWordDetails(details.data);
};

const displayWordDetails = (word) => {
  const detailBox = document.getElementById("details-container");
  detailBox.innerHTML = `<div class="">
        <h2 class="text-2xl font-bold">${
          word.word
        } ( <i class="fa-solid fa-microphone-lines"></i>    :${
    word.pronunciation
  })</h2>
      </div>
      <div class="">
        <h2 class="font-bold">Meaning</h2>
        <p>${word.meaning}</p>
      </div>
      <div class="">
        <h2 class="font-bold">Example</h2>
        <p>${word.sentence}</p>
      </div>
      <div class="space-x-2">
        <h2 class="font-bold">সমার্থক শব্দ গুলো</h2>
       <div>${cratElements(word.synonyms)}</div>
      </div>
      <button class="btn bg-[#422AD5] rounded-md text-white">Complete Learning</button>`;
  document.getElementById("word_modal").showModal();
};

// fetc kore sob word display te show koranor jonno
const displayLevelWord = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";

  if (words.length == 0) {
    wordContainer.innerHTML = `<div class="col-span-full rounded-xl">
        <img class="mx-auto" src="./assets/alert-error.png" />
          <p class="font-bangla text-[#79716B] text-center pt-20">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
          <h2 class="text-4xl font-bold text-center pt-5 pb-16">নেক্সট Lesson এ যান</h2>
          
         </div>`;
    manegSpinner(false);
    return;
  }

  words.forEach((word) => {
    const wordCard = document.createElement("div");
    wordCard.innerHTML = `<div class="bg-white text-center rounded-xl shadow-sm py-10 px-5 space-y-5">
            <h2 class="text-2xl font-bold">${
              word.word ? word.word : "শব্দ পাওয়া যায়নি"
            }</h2>
            <p class="font-semibold">Meaning /Pronounciation</p>
            <div class="text-2xl font-medium font-bangla">"${
              word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"
            } / ${
      word.pronunciation ? word.pronunciation : "pronunciation পাওয়া যায়নি"
    }"</div>
            <div class="flex justify-between items-center">
              <button onclick="loadWordDetail(${
                word.id
              })" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF90] "><i class="fa-solid fa-circle-info"></i></button>
              <button onclick="pronounceWord('${
                word.word
              }')" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF90] "><i class="fa-solid fa-volume-high"></i></button>
            </div>
          </div>`;

    wordContainer.append(wordCard);
  });

  manegSpinner(false);
};

//  lesson button display
const displayLesson = (lessons) => {
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";

  for (let lesson of lessons) {
    const btnLesson = document.createElement("button");
    btnLesson.innerHTML = `
        <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary btn-lesson">
        <i class="fa-solid fa-book-open"></i>Lesson-${lesson.level_no}</button>
        `;

    levelContainer.append(btnLesson);
  }
};
loadLesson();

// search button event add

document.getElementById("search-btn").addEventListener("click", () => {
  removeActive();
  const input = document.getElementById("input-btn");
  const searchValue = input.value.trim().toLowerCase();
  console.log(searchValue);

  fetch("https://openapi.programming-hero.com/api/words/all")
    .then((res) => res.json())
    .then((data) => {
      const allWords = data.data;
      console.log(allWords);
      const filterWords = allWords.filter((word) =>
        word.word.toLowerCase().includes(searchValue)
      );

      // search to display
      displayLevelWord(filterWords);
    });
});

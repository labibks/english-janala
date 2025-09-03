const loadLesson = () =>{
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then(res => res.json())
    .then(json => {
        console.log(json)
        displayLesson(json.data)
    })
}
 const loadLevelWord = (id) =>{
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    
    fetch(url)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        displayLevelWord(data.data)
    })
 }
// fetc kore sob word display te show koranor jonno
 const displayLevelWord = (words) =>{
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";
// "id": 6,
//       "level": 5,
//       "word": "Fascinate",
//       "meaning": "মুগ্ধ করা",
//       "pronunciation": "ফ্যাসিনেট"
    words.forEach(word => {
        const wordCard = document.createElement("div");
        wordCard.innerHTML = `<div class="bg-white text-center rounded-xl shadow-sm py-10 px-5 space-y-5">
            <h2 class="text-2xl font-bold">${word.word}</h2>
            <p class="font-semibold">Meaning /Pronounciation</p>
            <div class="text-2xl font-medium font-bangla">"${word.meaning} / ${word.pronunciation}"</div>
            <div class="flex justify-between items-center">
              <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF90] "><i class="fa-solid fa-volume-high"></i></button>
              <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF90] "><i class="fa-solid fa-circle-info"></i></button>
            </div>
          </div>`;

        wordContainer.append(wordCard)
    })
 }



//  lesson button display
const displayLesson = (lessons) =>{
    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML = "";

    for(let lesson of lessons){
        const btnLesson = document.createElement("button")
        btnLesson.innerHTML = `
        <button onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary">
        <i class="fa-solid fa-book-open"></i>Lesson-${lesson.level_no}</button>
        `;

        levelContainer.append(btnLesson)
    }
}
loadLesson()
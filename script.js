const input = document.getElementById ('text');
const title = document.getElementById ('title');
const meaning = document.getElementById ('meaning');
const info = document.getElementById ('info');
const meaningContainer = document.getElementById ('meaning-container');
const audio = document.getElementById ('audio');
// const word=input.value;

async function fetchAPI (word) {
  try {
    info.style.display = 'block';
    meaningContainer.style.display = 'none';
    info.innerText = `fetching meaning of ${word} from dictionary`;
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    let result = await fetch (url).then (res => res.json ());
    console.log (result);
    if (result.title) {
      meaningContainer.style.display = 'block';
      info.style.display = 'none';
      title.innerText = word;
      meaning.innerText = 'N/A';
      audio.style.display = 'none';
    } else {
      info.style.display = 'none';
      meaningContainer.style.display = 'block';
      title.innerText = result[0].word;
      meaning.innerText = result[0].meanings[0].definitions[0].definition;
      audio.src = result[0].phonetics[0].audio;
    }
  } catch (error) {
    console.log ('try agin latter');
    info.innerText=" Some error occurred Please try agin latter";
  }
}

input.addEventListener ('keyup', e => {
  if (e.target.value && e.key === 'Enter') {
    fetchAPI (e.target.value);
  }
});

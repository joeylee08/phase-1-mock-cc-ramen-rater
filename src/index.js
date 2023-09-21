//main structural elements
const menu = document.querySelector('#ramen-menu');
const details = document.querySelector('#ramen-detail');
const form = document.querySelector('#new-ramen');

//elements that display values
const image = document.querySelector('div#ramen-detail img');
const name = document.querySelector('div#ramen-detail h2');
const restaurant = document.querySelector('div#ramen-detail h3');
const rating = document.querySelector('#rating-display');
const comment = document.querySelector('#comment-display');

//initial fetch and render
fetch('http://localhost:3000/ramens')
  .then(res => res.json())
  .then(json => {
    json.forEach(obj => getRamen(obj))
    renderRamen(json[0])
  })

//helper functions
function getRamen(ramenObj) {
  const img = document.createElement('img');
  img.addEventListener('click', () => renderRamen(ramenObj))
  img.src = ramenObj.image;
  img.alt = `Image of ${ramenObj.name}`;
  menu.append(img);
}

function renderRamen(ramenObj) {
  image.src = ramenObj.image;
  image.alt = ramenObj.name;
  name.textContent = ramenObj.name;
  restaurant.textContent = ramenObj.restaurant;
  rating.textContent = ramenObj.rating;
  comment.textContent = ramenObj.comment;
}

function submitNewRamen(e) {
  e.preventDefault();
  fetch('http://localhost:3000/ramens', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      "name": form.name.value,
      "restaurant": form.restaurant.value,
      "image": form.image.value,
      "rating": form.rating.value,
      "comment": form.querySelector('textarea').textContent
    })
  })
  .then(res => res.json())
  .then(jsonObj => {
    getRamen(jsonObj)
    renderRamen(jsonObj)
  })
  form.reset()
}

form.addEventListener('submit', submitNewRamen)
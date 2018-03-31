// var objectToStore = JSON.stringify('.idea-list');
// var json = '{"ideaTitle":true, "count":25}';
// obj = JSON.parse(json);
// console.log(json)
// getCard()

var save = $('.save-button');
var ideaNumber = 0
var cardArray = []

save.click(storeIdea);



function storeIdea(event) {
  event.preventDefault();
  var ideaTitle = $('#idea-title').val();
  var ideaBody = $('#idea-body').val();
  var ideaId = event.timeStamp;
  var newCard = new CreateCard(ideaId, ideaTitle, ideaBody);
  newCard.prependCard();
  storeCard(ideaId, newCard);
}

function CreateCard(id, title, body) {
  this.id = id;
  this.title = title;
  this.body = body;
}

CreateCard.prototype.prependCard = function() { 
  $('.idea-list').prepend(`<article id="${this.id}">
  <h3 contenteditable="true">${this.title}</h3>
  <input type="button" aria-label="delete" class="delete-button" alt="delete">
  <p contenteditable="true">${this.body}</p>
  <input type="button" aria-label="upvote" class="upvote-button" alt="upvote">
  <input type="button" aria-label="downvote" class="downvote-button" alt="downvote">
  <p class="quality">quality:
  <span class="rating">swill</span>
  </p>      
  </article>`);
  $('#search').removeClass('search');
  $('#idea-title , #idea-body').val('');
}

function storeCard(id, card) {
  var stringCard = JSON.stringify(card);
  localStorage.setItem(id, stringCard);
  addToCardArray(stringCard)
}

function getCard(id, card) {
  var retrievedCard = localStorage.getItem(id)
  JSON.parse(card);
  console.log('test')
}

function addToCardArray(card) {
  cardArray.push(card)
  console.log(cardArray)
}

$('#search').on('keyup', search);

// function search() {
//   var input = $('search').val()
// }


$('main').on('click', 'article .delete-button', deleteIdea);

function deleteIdea(event) {
  event.preventDefault();
  localStorage.removeItem(this.id)
  $(this).parent('article').remove()
};

$('main').on('click', 'article .upvote-button', upvoteIdea); 

function upvoteIdea(event) {
  event.preventDefault();
  var rating = $('.rating');
  if (rating.text() === 'swill') {
     rating.text('plausible');
  } else if (rating.text() === 'plausible') 
     rating.text('genius');
};

$('main').on('click', 'article .downvote-button', downvoteIdea)

function downvoteIdea(event) {
  event.preventDefault();
  var rating = $('.rating');
  if (rating.text() === 'genius') {
    rating.text('plausible');
  } else if (rating.text() === 'plausible') 
    rating.text('swill');
};
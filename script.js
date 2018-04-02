// var objectToStore = JSON.stringify('.idea-list');
// var json = '{"ideaTitle":true, "count":25}';
// obj = JSON.parse(json);
// console.log(json)
// getCard()

var $save = $('.save-button');
var cardArray = []

loadCards();
$save.click(storeIdea);



function storeIdea(event) {
  event.preventDefault();
  var $ideaTitle = $('#idea-title').val();
  var $ideaBody = $('#idea-body').val();
  var $ideaId = event.timeStamp;
  var newCard = new CreateCard($ideaId, $ideaTitle, $ideaBody);
  prependCard(newCard.id,newCard.title,newCard.body);
  storeCard($ideaId, newCard);
}

function CreateCard(id, title, body) {
  this.id = id;
  this.title = title;
  this.body = body;
}
// 1. var retrievedObject = localStorage.getItem('somethingComplicated');
// 2. retrievedObject (Notice this is still the stringified version of our object - we need it to be a real object again, not a string)
// 3. var parsedObject = JSON.parse(retrievedObject);
// 4. parsedObject (We are now back to our original object!)

function prependCard(id, title, body) { 
  $('.idea-list').prepend(`<article id="${id}">
  <h3 contenteditable="true">${title}</h3>
  <input type="button" aria-label="delete" class="delete-button" alt="delete">
  <p contenteditable="true">${body}</p>
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
}

function loadCards() {

// localStorage.map(function(card) { 

// });


  for (var i = 0; i < localStorage.length; i++) { 
    var localStorageid = localStorage.key(i)
    var retrievedCard = localStorage.getItem(localStorageid);
    var parsedCard = JSON.parse(retrievedCard);
    console.log(parsedCard);
    prependCard(parsedCard.id, parsedCard.title, parsedCard.body);
  }
}


  //   getCard("id", "card")
  //   prependCard("id", "title", "body")
  //   for each, getCard() & parse if needed
  //  prepend all to page
  // }

function getCard(id, card) {
  var retrievedCard = localStorage.getItem(id)
  JSON.parse(card);
  console.log('test')
}

$('#search').on('keyup', search);

function search() {
  var input = $('search').val()
}


$('main').on('click', 'article .delete-button', deleteIdea);

function deleteIdea(event) {
  event.preventDefault();
  localStorage.removeItem(this.id)
  $(this).parent('article').remove()
};

$('main').on('click', 'article .upvote-button', upvoteIdea); 

function upvoteIdea(event) {
  event.preventDefault();
  var $rating = $('.rating');
  if ($(this).siblings('p').children($rating).text() === 'swill') {
    $(this).siblings('p').children($rating).text('plausible');
  } else if ($(this).siblings('p').children($rating).text() === 'plausible') 
    $(this).siblings('p').children($rating).text('genius');
};

$('main').on('click', 'article .downvote-button', downvoteIdea)

function downvoteIdea(event) {
  event.preventDefault();
  var $rating = $('.rating');
  if ($(this).siblings('p').children($rating).text() === 'genius') {
    $(this).siblings('p').children($rating).text('plausible');
  } else if ($(this).siblings('p').children($rating).text() === 'plausible') 
    $(this).siblings('p').children($rating).text('swill');
};
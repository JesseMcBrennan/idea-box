
var $save = $('.save-button');

loadCards();
$save.click(storeIdea);


function storeIdea(event) {
  event.preventDefault();
  var $ideaTitle = $('#idea-title').val();
  var $ideaBody = $('#idea-body').val();
  var $ideaId = event.timeStamp;
  var $quality = 'swill'
  var newCard = new CreateCard($ideaId, $ideaTitle, $ideaBody, $quality);
  prependCard(newCard.id, newCard.title, newCard.body, newCard.quality);
  storeCard($ideaId, newCard);
}

function CreateCard(id, title, body, quality) {
  this.id = id;
  this.title = title;
  this.body = body;
  this.quality = quality;
}

function prependCard(id, title, body, quality) { 
  $('.idea-list').prepend(`<article id="${id}">
  <h3 class="title content" contenteditable="true">${title}</h3>
  <input type="button" aria-label="delete" class="delete-button" alt="delete">
  <p class="body content" contenteditable="true">${body}</p>
  <input type="button" aria-label="upvote" class="upvote-button" alt="upvote">
  <input type="button" aria-label="downvote" class="downvote-button" alt="downvote">
  <p class="quality">quality:
  <span class="rating">${quality}</span>
  </p>      
  </article>`);
  $('#search').removeClass('search');
  $('#idea-title , #idea-body').val('');
}

function loadCards() {
  for (var i = 0; i < localStorage.length; i++) { 
    var localStorageid = localStorage.key(i)
    var retrievedCard = localStorage.getItem(localStorageid);
    var parsedCard = JSON.parse(retrievedCard);
    prependCard(parsedCard.id, parsedCard.title, parsedCard.body, parsedCard.quality);
  };
}

function getCard(id) {
  var retrievedCard = localStorage.getItem(id);
  var parsedCard = JSON.parse(retrievedCard);
}

function storeCard(id, card) {
  var stringCard = JSON.stringify(card);
  localStorage.setItem(id, stringCard);
}

$('#search').on('keyup', search);

function search() {
  var input = $('search').val()
}

$('main').on('click', 'article .delete-button', deleteIdea);

function deleteIdea(event) {
  event.preventDefault();
  localStorage.removeItem($(this).parent('article').attr('id'));
  $(this).parent('article').remove() 
};


$('main').on('blur', 'article .content', editContent); 

function editContent() {
  var $id = $(this).parent('article').attr('id')
  var retrievedCard = localStorage.getItem($id);
  var parsedCard = JSON.parse(retrievedCard);
  console.log($(this).parent('article').children('.title').val())
  parsedCard.title = $(this).parent('article').children('.title').text();
  parsedCard.body = $(this).parent('article').children('.body').text();
  storeCard($id, parsedCard)
}

$('main').on('click', 'article .upvote-button', upvoteIdea); 

function upvoteIdea(event) {
  event.preventDefault();
  var $id = $(this).parent('article').attr('id');
  var retrievedCard = localStorage.getItem($id);
  var parsedCard = JSON.parse(retrievedCard);
  var $rating = $('.rating');
  if ($(this).siblings('p').children($rating).text() === 'swill') {
    $(this).siblings('p').children($rating).text('plausible')
    parsedCard.quality = 'plausible';
    return storeCard($id, parsedCard)
  } else if ($(this).siblings('p').children($rating).text() === 'plausible') 
    $(this).siblings('p').children($rating).text('genius')
    parsedCard.quality = 'genius'; 
    storeCard($id, parsedCard)
};

$('main').on('click', 'article .downvote-button', downvoteIdea)

function downvoteIdea(event) {
  event.preventDefault();
  var $id = $(this).parent('article').attr('id');
  var retrievedCard = localStorage.getItem($id);
  var parsedCard = JSON.parse(retrievedCard);
  var $rating = $('.rating');
  if ($(this).siblings('p').children($rating).text() === 'genius') {
    $(this).siblings('p').children($rating).text('plausible');
    parsedCard.quality = 'plausible';
    return storeCard($id, parsedCard)
  } else if ($(this).siblings('p').children($rating).text() === 'plausible') 
    $(this).siblings('p').children($rating).text('swill');
    parsedCard.quality = 'swill';  
    storeCard($id, parsedCard)
};
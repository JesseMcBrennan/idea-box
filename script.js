loadCards();
checkSize();

$('.save-button').on('click', storeIdea);

$(window).resize(checkSize);

function storeIdea(event) {
  event.preventDefault();
  var $ideaTitle = $('#idea-title').val();
  var $ideaBody = $('#idea-body').val();
  var $ideaId = event.timeStamp;
  var $quality = 'swill';
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
  $('.idea-list').prepend(`<article id="${id}" class="idea-card" aria-atomic>
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
    var localStorageId = localStorage.key(i);
    var retrievedCard = localStorage.getItem(localStorageId);
    var parsedCard = JSON.parse(retrievedCard);
    prependCard(parsedCard.id, parsedCard.title, parsedCard.body, parsedCard.quality);
  };
}

$('#search').on('keyup', search);

function search() {
  var $input = $('#search').val();
  var $cards = $('article .content');
  $("article .content:contains('" + $input + "')").parent().show();
  $("article .content:not(:contains('" + $input + "'))").parent().hide();  
}

$('main').on('click', 'article .delete-button', deleteIdea);

function deleteIdea(event) {
  event.preventDefault();
  localStorage.removeItem($(this).parent('article').attr('id'));
  $(this).parent('article').remove();
};

$('main').on('blur', 'article .content', editContent); 
$('main').on('keypress', 'article .content',exitEditor);

function exitEditor(event){
  if (event.keyCode === 13) {
    $(this).blur();
  };
}

function editContent() {
  var $id = $(this).parent('article').attr('id')
  var parsedCard = getCard($id);
  parsedCard.title = $(this).parent('article').children('.title').text();
  parsedCard.body = $(this).parent('article').children('.body').text();
  storeCard($id, parsedCard);
}

$('main').on('click', 'article .upvote-button', upvoteIdea); 

function upvoteIdea(event) {
  event.preventDefault();

  var $id = $(this).parent('article').attr('id');
  var parsedCard = getCard($id);
  var $rating = $('.rating');
  if ($(this).siblings('p').children($rating).text() === 'swill') {
    $(this).siblings('p').children($rating).text('plausible')
    parsedCard.quality = 'plausible';
    return storeCard($id, parsedCard);
  } else if ($(this).siblings('p').children($rating).text() === 'plausible') {
    $(this).siblings('p').children($rating).text('genius');
    parsedCard.quality = 'genius'; 
  } storeCard($id, parsedCard);
};

$('main').on('click', 'article .downvote-button', downvoteIdea);

function downvoteIdea(event) {
  event.preventDefault();
  var $id = $(this).parent('article').attr('id');
  var parsedCard = getCard($id);  
  var $rating = $('.rating');
  if ($(this).siblings('p').children($rating).text() === 'genius') {
    $(this).siblings('p').children($rating).text('plausible');
    parsedCard.quality = 'plausible';
    return storeCard($id, parsedCard);
  } else if ($(this).siblings('p').children($rating).text() === 'plausible') {
    $(this).siblings('p').children($rating).text('swill');
    parsedCard.quality = 'swill';  
  } storeCard($id, parsedCard);
};

function getCard(id) {
  var retrievedCard = localStorage.getItem(id);
  return JSON.parse(retrievedCard);
}

function storeCard(id, card) {
  var stringCard = JSON.stringify(card);
  localStorage.setItem(id, stringCard);
}

function checkSize() {
  if($(window).width() <= 650) {
    $('#idea-body').replaceWith('<textarea type="text" class="form"' + 
      'name="body" aria-label="Enter Idea Body" id="idea-body"' +
      'placeholder="Body" for="button"></textarea>');
    $('#idea-body').attr('rows', '3');
  } else  
    $('#idea-body').replaceWith('<input type="text" class="form"' +
      'name="body" aria-label="Enter Idea Body" id="idea-body"' + 
      'placeholder="Body" for="button">');  
}



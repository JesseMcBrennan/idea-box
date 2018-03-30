// var objectToStore = JSON.stringify('.idea-list');
// var json = '{"ideaTitle":true, "count":25}';
// obj = JSON.parse(json);
// console.log(json)
var save = $('.save-button');
var ideaNumber = 0

save.click(storeIdea);

function storeIdea(event){
  event.preventDefault();
  var ideaTitle = $('#idea-title').val();
  var ideaBody = $('#idea-body').val();
  ideaNumber++
  var ideaCard =
    $('.idea-list').prepend(`<article id="${ideaNumber}">
      <h3 contenteditable="true">${ideaTitle}</h3>
      <input type="button" aria-label="delete" class="delete-button" alt="delete">
      <p contenteditable="true">${ideaBody}</p>
      <input type="button" aria-label="upvote" class="upvote-button" alt="upvote">
      <input type="button" aria-label="downvote" class="downvote-button" alt="downvote">
      <p class="quality">quality:
      <span class="rating">swill</span>
      </p>      
    </article>`);
  $('#search').removeClass('search');
  $('#idea-title , #idea-body').val('');
}


$('main').on('click', 'article .delete-button', deleteIdea);

function deleteIdea(event) {
  event.preventDefault();
  $(this).parent('article').remove()
};

$('main').on('click', 'article .upvote-button', upvoteIdea); 

function upvoteIdea(event) {
  event.preventDefault();  
};

$('main').on('click', 'article .downvote-button', downvoteIdea)

function downvoteIdea(event) {
  event.preventDefault();
}
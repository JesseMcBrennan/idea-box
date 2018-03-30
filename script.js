var objectToStore = JSON.stringify('.idea-list')
var save = $('.save-button')
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
      <input type="image" aria-label="delete" class="delete-button" alt="delete" src="images/delete.svg">
      <p contenteditable="true">${ideaBody}</p>
      <input type="image" aria-label="upvote" class="upvote-button" alt="upvote" src="images/upvote.svg">
      <input type="image" aria-label="downvote" class="downvote-button" alt="downvote" src="images/downvote.svg">
      <p class="quality">quality:
      <span class="rating">swill</span>
      </p>      
    </article>`)
  $('#idea-title , #idea-body').val('')
  }



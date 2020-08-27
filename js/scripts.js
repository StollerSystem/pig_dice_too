















//Interface Logic
$(document).ready(function(event) {
  $("#addPlayer").submit(function(event) {
    event.preventDefault();

    createPlayer($("#enterName").val(),$("#playerType").val());
  })
 

function createPlayer(name,type) {
  console.log(name);
  console.log(type);

  //let htmlToAdd = $("<p></p>").text("Text.");

  let htmlToAdd = '<div class="player"><h2>'+name+'</h2><p>score</p></div>'
  $(".playerGroup").html(htmlToAdd);




}




});
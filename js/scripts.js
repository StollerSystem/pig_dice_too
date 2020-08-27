
function Game() {
  this.playerArray = []
  this.playerId = 0
}
 let pigGame = new Game()





function Player(Id,name,type) {
  this.Id = Id
  this.name = name
  this.type = type
  this.totalScore = 0
  this.turnScore = 0
}








//Interface Logic
$(document).ready(function(event) {
  $("#addPlayer").submit(function(event) {
    event.preventDefault();

    createPlayer($("#enterName").val(),$("#playerType").val());
  })
  $("#startGame").click(function(){ 
    $("#playerCreate").hide();
    $("#gameInterface").show();
    startGame();
   })

  function createPlayer(name,type) {
    console.log(name);
    console.log(type);
    pigGame.playerId += 1;
    let Id =  pigGame.playerId;
    let player = new Player(Id,name,type)
    pigGame.playerArray.push(player)
    console.log(pigGame.playerArray)
    displayPlayers(pigGame.playerArray)
    //let htmlToAdd = $("<p></p>").text("Text.");
  }

  function displayPlayers(array) {
    console.log("display!")
    let htmlToAdd = ""
    pigGame.playerArray.forEach(function(player) {

      htmlToAdd += '<div class="player" id="'+player.Id+'"><h2>'+player.name+' "'+player.type+'"'+'</h2><p>'+'Score:'+player.totalScore+'</p></div>'
      console.log(htmlToAdd)
    });
    $(".playerGroup").html(htmlToAdd);
  }

  function startGame() {
    
  }
});





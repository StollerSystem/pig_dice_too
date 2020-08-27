
function Game() {
  this.playerArray = []
  this.playerId = 0
  this.rounds = 0
  this.activePlayerIndex = 0
  this.playerCount = 0 
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
  });
  $("#startGame").click(function(){ 
    $("#playerCreate").hide();
    $("#gameInterface").show();
    startGame();
   });
  $("#pass").click(function() {
    console.log("pass!")
    pigGame.activePlayerIndex += 1;
    if (pigGame.activePlayerIndex > pigGame.playerCount - 1) {

      pigGame.activePlayerIndex = 0 
      console.log("index reset")
    }
    displayActivePlayer(pigGame.activePlayerIndex)
  });

  function createPlayer(name,type) {
    console.log(name);
    console.log(type);
    pigGame.playerId += 1;
    let Id =  pigGame.playerId;
    let player = new Player(Id,name,type);
    pigGame.playerArray.push(player);
    console.log(pigGame.playerArray);
    displayPlayers(pigGame.playerArray);
    //let htmlToAdd = $("<p></p>").text("Text.");
  }

  function displayPlayers(array) {
    console.log("display!");
    let htmlToAdd = "";
    pigGame.playerArray.forEach(function(player) {

      htmlToAdd += '<div class="player" id="'+player.Id+'"><h2>'+player.name+' "'+player.type+'"'+'</h2><p>'+'Total Score:'+player.totalScore+'</p></div>'
      console.log(htmlToAdd);
    });
    $(".playerGroup").html(htmlToAdd);
  }

  function startGame() {    
    console.log("game start");
    pigGame.playerCount = pigGame.playerArray.length;
    console.log(pigGame.playerCount);
    gameRound();

    //playerTurn(determinePLayer)
  }

  function gameRound() {
    //let playerCount = pigGame.playerArray.length
    //console.log(playerCount)
    pigGame.rounds += 1;
    console.log("round#",pigGame.rounds);
   
    //console.log(currentPlayerIndex)
    console.log("round#",pigGame.rounds);
    // for (const player of pigGame.playerArray) {
    //   playerTurn(player)
    // }
    displayActivePlayer(pigGame.activePlayerIndex);
  }

  

  function displayActivePlayer(activePlayerIndex) {
    player = pigGame.playerArray[activePlayerIndex]
    $("#turnName").text(player.name+"'s Turn!")
    $("#turnScoreDisplay").text("Running Score:"+player.turnScore)    
  }

});





// Business Logic 

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
    $("#pass").hide();
    startGame();
   });

  $("#pass").click(function() {
    passTurn();    
  });

  $("#hold").click(function() {
    pigGame.playerArray[pigGame.activePlayerIndex].totalScore += pigGame.playerArray[pigGame.activePlayerIndex].turnScore
    endGame();
    passTurn();    
  });

  $("#roll").click(function() {
    rollDice();
    // let diceRoll = Math.floor((Math.random() * 6) + 1);
    // console.log(diceRoll)
    // $("#diceRoll").text("Rolled a "+diceRoll+"!") 
    // if (diceRoll ===1) {
    //   $("#diceRoll").text("Rolled a 1 OUCH!")
    //   $("#roll").hide();
    //   $("#hold").hide();
    //   $("#pass").show();
    //   pigGame.playerArray[pigGame.activePlayerIndex].turnScore = 0
    //   displayActivePlayer(pigGame.activePlayerIndex)
    //   //passTurn();
    // } else {
    //     addScore(diceRoll);
    // }
  });

  function rollDice () {
    let diceRoll = Math.floor((Math.random() * 6) + 1);
    console.log(diceRoll)
    $("#diceRoll").text("Rolled a "+diceRoll+"!") 
    if (diceRoll ===1) {
      $("#diceRoll").text("Rolled a 1 OUCH!")
      $("#roll").hide();
      $("#hold").hide();
      $("#pass").show();
      pigGame.playerArray[pigGame.activePlayerIndex].turnScore = 0
      displayActivePlayer(pigGame.activePlayerIndex)
      //passTurn();
    } else {
        addScore(diceRoll);
    }
  }


  function passTurn () {   
    console.log("pass!")      
    pigGame.playerArray[pigGame.activePlayerIndex].turnScore = 0
    pigGame.activePlayerIndex += 1;
    if (pigGame.activePlayerIndex > pigGame.playerCount - 1) {
      pigGame.activePlayerIndex = 0 
      console.log("index reset")
    }        
    if (pigGame.playerArray[pigGame.activePlayerIndex].type ===  "CPU Easy") {
      console.log("EASY CPU!")
      cpuEasyTurn()
    } else if (pigGame.playerArray[pigGame.activePlayerIndex].type ===  "CPU Hard") {
      console.log("Hard CPU!")
      cpuHardTurn()
    } else {
        $("#roll").show();
        $("#pass").hide();
        $("#hold").show();
        $("#diceRoll").text("")
        displayActivePlayer(pigGame.activePlayerIndex)
        displayPlayers(pigGame.playerArray);
    }    
  }

  function cpuEasyTurn() {
    $("#hold").hide();
    $("#roll").hide();    
    let diceRoll1 = Math.floor((Math.random() * 6) + 1);
    console.log(diceRoll1)     
    if (diceRoll1 ===1) {
      $("#diceRoll").text("Rolled a 1 OUCH!")
      pigGame.playerArray[pigGame.activePlayerIndex].turnScore = 0
      $("#pass").show();
    } else {
        $("#diceRoll").text("Rolled a "+diceRoll1)
        addScore(diceRoll1);
        let diceRoll2 = Math.floor((Math.random() * 6) + 1);
        console.log(diceRoll2)       
        if (diceRoll2 ===1) {
          $("#diceRoll").append(" then rolled a 1 OUCH!")
          pigGame.playerArray[pigGame.activePlayerIndex].turnScore = 0
          $("#pass").show();
        } else {
            $("#diceRoll").append(" then rolled a "+diceRoll2+"!")
            addScore(diceRoll2);
        }
      }
    pigGame.playerArray[pigGame.activePlayerIndex].totalScore += pigGame.playerArray[pigGame.activePlayerIndex].turnScore
    endGame();
    $("#pass").show();    
    displayActivePlayer(pigGame.activePlayerIndex)
    displayPlayers(pigGame.playerArray);   
  } 





  function cpuHardTurn() {
    $("#hold").hide();
    $("#roll").hide();
    //$("#pass").show();
    // How many times will it roll CRAZY FORMAL 
    // - 4 
    let rollCount = 4
    for (let index = 0; index < rollCount; index +=1) {
      console.log("ROLL!",index)
      let diceRoll1 = Math.floor((Math.random() * 6) + 1);
      console.log(diceRoll1)     
      if (diceRoll1 ===1) {
        $("#diceRoll").text("Rolled a 1 OUCH!")
        pigGame.playerArray[pigGame.activePlayerIndex].turnScore = 0
        displayActivePlayer(pigGame.activePlayerIndex);
        //$("#pass").show();
        break;
      } else {
          $("#diceRoll").append(" Rolled a "+diceRoll1+"!")
          addScore(diceRoll1);
        }
    }
    pigGame.playerArray[pigGame.activePlayerIndex].totalScore += pigGame.playerArray[pigGame.activePlayerIndex].turnScore
    endGame();
    $("#pass").show();    
    displayActivePlayer(pigGame.activePlayerIndex)
    displayPlayers(pigGame.playerArray); 
  }

  function addScore(roll) {
    pigGame.playerArray[pigGame.activePlayerIndex].turnScore += roll;
    displayActivePlayer(pigGame.activePlayerIndex);
  }

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
    $("#cont").hide();  
    console.log("game start");
    pigGame.playerCount = pigGame.playerArray.length;
    console.log(pigGame.playerCount);
    gameRound();    
  }

  function endGame(){
    console.log("endgametrigger")
    if (pigGame.playerArray[pigGame.activePlayerIndex].totalScore >= 30){
     $("#everything").hide();
     $("#winner").show();
     $("#winner").text(pigGame.playerArray[pigGame.activePlayerIndex].name + " Wins! Final Score: "+pigGame.playerArray[pigGame.activePlayerIndex].totalScore);
    }
  }

  function gameRound() { // < Maybe dont need this 
    //let playerCount = pigGame.playerArray.length
    //console.log(playerCount)
    pigGame.rounds += 1;
    console.log("round#",pigGame.rounds);
   
    //console.log(currentPlayerIndex)
    //console.log("round#",pigGame.rounds);
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





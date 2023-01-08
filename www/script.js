var me={};
var game_status={};
var state=0;
var i=0; //counter gia to posa cards mporei o paikths na traviksei apo to pile

$(function () {
  $.ajax({
    url:"pinnacle.php/player",
    method: "POST",
    error: login_error
  });

  $("#login").click(function () {
    setTimeout(() => {
      $.ajax({
        url: "pinnacle.php/status/",
        success: function (data) {
          state = data[0].status;
          console.log(data[0].status);
          if (state == "started") {
            $.ajax({
              url: "pinnacle.php/deck",
              method: "POST",
              function(data) {
                //console.log("all good!");
              },
            });
          }
        },
      });
    }, 100);
  });
  $("#start").prop("disabled", true);
  $("#center_card").hide();
  $("#login").click(login_to_game);
  $("#do_move").click(do_move);
  //Gia thn emfanish xartiwn
  action();
  $("#id").change(function () {
    document.getElementById("cards").innerHTML = "";
    action();
  });
  $("#cards").hide();
  $("#comb_string").hide();
  $("#play_card").hide();
  //edw
  $("#get_card").click(function () {
    console.log("patithike to click!");
    get_card_pile();
  });
  $("#get_card").hide();

  //edw
  $("#combination_div").hide();

  $("#play_card").click(
    //na 3ana emfanizei to center card
    play_card
  );

  $("#start").click(function () {
    document.getElementById("cards").innerHTML = "";
    action();
    document.getElementById("started").classList.add("fixed-bottom");
    document.getElementById("started").classList.add("mb-5");
    $("#game_info").hide();
    $("#game_info").show(1000);
    $("#play_card").show(1000);
    $("#get_card").show(1000);
    $("#comb_string").show();
    $("#head").hide(1000);
    $(".hide").hide(1000);
    $("#combination_div").show(1000);
    $("#cards").show(1000);
    $("#center_card").show(1000);
    $.ajax({
      url: "pinnacle.php/status/",
      success: function (data) {
        state = data[0].status;
        console.log(data[0].status);
        if (state == "started") {
          center_cards();
        }
      },
    });
    //$("#login").hide();
  });
});

function get_card_pile() {
   
  if(i==0){
    $.ajax({
      url: "pinnacle.php/give_card",
      method: "POST",
      success: function (data) {
        alert("you got a card from pile");
        console.log("ektelestike to give card sever side!");
        document.getElementById("cards").innerHTML = "";
        action();
      },
    });
    i=1; //exei traviksei ena xarti apo to pile
  }
  else{
    alert("You can only get 1 pile card per turn!");
  }
}
function play_card() {
  i=0; //to counter twn xartiwn pou travhkse apo to pile mhdenizetai gia na mporei na ksana traviksei 1 xarti otan erthei h seira tou
  var selected = document.getElementById("cards");
  var value = selected.value;
  var text = selected.options[selected.selectedIndex].text;
  var splittext = text.split(" ");
  //console.log("value " + value);
  //console.log("text " + text);

  $.ajax({
    url: "pinnacle.php/clean_center",
    method: "POST",
    success: function () {
      //console.log("");
    },
  });
  $.ajax({
    url: "pinnacle.php/playcard/" + splittext[0] + "/" + splittext[1],
    method: "PUT",
    success: function (data) {
      $("#center_card").html("<h6>" + text + "</h6>");
      document.getElementById("center_card").classList.add("bg-info");
      selected.options[selected.selectedIndex].remove();
    },
  });
  if($('#cards').children('option').length == 1){
    $.ajax({
      url:"pinnacle.php/status",
      method:"POST",
      error:login_error
    });        
  }
}
function do_move(){
   var s = $("#theplay").val();

   var a = s.trim().split(/[ ]+/);
   if(a.length<6){
      alert("Combination must be 3 cards or more!");
      return;
   }
   if(a.length==6){
      $.ajax({
          url:"pinnacle.php/move/"+a[0]+'/'+a[1]+'/'+a[2]+'/'+a[3]+'/'+a[4]+'/'+a[5],
          method:'PUT',
          dataType: "json",
          contentType: 'application/json',
          data: JSON.stringify( {token: me.token} ),  
          //allagh edw
          headers: {"X-Token": me.token},
          success: move_result,
          error:login_error
      });   
  }
  if(a.length == 8){
      $.ajax({
        url:"pinnacle.php/move/"+a[0]+'/'+a[1]+'/'+a[2]+'/'+a[3]+'/'+a[4]+'/'+a[5]+'/'+a[6] +'/'+a[7],
        method:'PUT',
        dataType: "json",
        contentType: 'application/json',
        data: JSON.stringify( {token: me.token} ),  
        //allagh edw
        headers: {"X-Token": me.token},
        success: move_result,
        error:login_error
    });   
  }
  if(a.length == 10){
    $.ajax({
      url:"pinnacle.php/move/"+a[0]+'/'+a[1]+'/'+a[2]+'/'+a[3]+'/'+a[4]+'/'+a[5]+'/'+a[6] +'/'+a[7]+'/'+a[8] +'/'+a[9],
      method:'PUT',
      dataType: "json",
      contentType: 'application/json',
      data: JSON.stringify( {token: me.token} ),  
      //allagh edw
      headers: {"X-Token": me.token},
      success: move_result,
      error:login_error
  });   
}
if(a.length == 12){
  $.ajax({
    url:"pinnacle.php/move/"+a[0]+'/'+a[1]+'/'+a[2]+'/'+a[3]+'/'+a[4]+'/'+a[5]+'/'+a[6] +'/'+a[7]+'/'+a[8] +'/'+a[9]+'/'+a[10] +'/'+a[11],
    method:'PUT',
    dataType: "json",
    contentType: 'application/json',
    data: JSON.stringify( {token: me.token} ),  
    //allagh edw
    headers: {"X-Token": me.token},
    success: move_result,
    error:login_error
});   
}
}

function move_result(data){
  $("#comb_result").html('');
   for(var i=0;i<data.length;i++){
      var o = data[i];
      var number = o.number;
      var shape = o.shape;
      $("#comb_result").append(number +" "+shape+"<br>");
   }
   action();
}

function login_to_game(){
   if($("#username").val()==''){
      alert("ERROR!Empty fields not allowed!");
     /* document.getElementById("alert").innerHTML+=
                   '<div class="container">'+
                       '<div class="alert text-center alert-danger alert-dismissible fade show">'+
                            '<button type="button" class="btn-close bg-danger bg-opacity-25" data-dismiss="alert"></button>'+
                             '<strong>ERROR!</strong> Empty fields not allowed!'+
                         '</div>'+
                   '</div>'; */
     return;
   }
   
   var p_id=$("#id").val();
   
   $.ajax({
      url: "pinnacle.php/player/"+p_id,
      method: 'PUT',
      dataType: "json",
      contentType: 'application/json',
      data: JSON.stringify(  {username: $("#username").val(), id: p_id }),
      success: login_result,
      error: login_error
   });
   
}

function action() {
  var p_id = $("#id").val();
  $.ajax({
    url: "pinnacle.php/deck/player " + p_id,
    success: show_deck,
  });
}
function show_deck(data){
  $('#cards').html("");
   for(var i=0;i<data.length;i++){
      var o = data[i];
      var number = o.number;
      var shape = o. shape;
      var node = document.createElement("option");
      var textnode = document.createTextNode(number +"");
      $('#cards').append("<option value='"+number +" " + shape+"'>" + number + " " + shape + "</option>");
      //document.getElementById("cards").innerHTML+="<option>" + number + " " + shape + "</option>";
   }   
} 

function login_result(data){
   alert("User Added!");
   //$('#start').prop('disabled', false);
   me = data[0]; 
   update_info();
   game_status_update();
}
 
 
function update_info(){
   $('#game_info').html("<p>" + "I am Player: "+me.id+", my name is: "+me.username+"<br>Token: "+me.token+"<br>Game state: "+game_status.status+", " +game_status.p_turn+" must play now." + "</p>");
   //fixing this and adding a button to play a card
   if(game_status.status=='started'){
      $('#start').prop('disabled', false);
      center_cards();
   }
   if(game_status.result != null){
     
    document.getElementById("alert").innerHTML=
                   '<div class="container">'+
                       '<div class="alert text-center alert-danger alert-dismissible fade show">'+
                            '<button type="button" class="btn-close bg-danger bg-opacity-25" data-dismiss="alert"></button>'+
                             '<strong>GAME OVER! '+game_status.result+' won!'+ '</strong>' 
                         '</div>'+
                   '</div>';
   }
}

function center_cards() {
  $.ajax({
    url: "pinnacle.php/center",
    success: get_center_card,
  });
}

function get_center_card(data) {
  var number;
  var shape;
  for (var i = 0; i < data.length; i++) {
    number = data[i].number;
    shape = data[i].shape;
  }
  $("#center_card").html("<h6>" + number + " " + shape + "</h6>");
  document.getElementById("center_card").classList.add("bg-info");
}

function login_error(data,y,z,c){
   var x= data.responseJSON;
   alert(x.errormesg);
}

function game_status_update(){
   $.ajax({url: "pinnacle.php/status/", success: update_status,headers: {"X-Token":me.token}});
}

function update_status(data){
   game_status= data[0];
   update_info();
    if(game_status.p_turn=="player "+me.id && me.id!=null){
      x=0;
      // do play
      if($("#start").is(":hidden")){
        $("#combination_div").show(1000);
        $("#play_card").show(1000);
        $('#get_card').show(1000);
      }
      setTimeout(function(){ game_status_update();}, 500);
    }
    else{
      // must wait for something
      $("#combination_div").hide(1000);
      $("#play_card").hide(1000);
      $('#get_card').hide(1000);
      setTimeout(function(){ game_status_update();}, 500);
    }
}
 

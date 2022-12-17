var me={};
var game_status={};
$( function(){
   $('#login').click(login_to_game);
   //Gia thn emfanish xartiwn
    action();
    $("#id").change(function(){
      document.getElementById("cards").innerHTML="";
      action();
   });
   $("#cards").hide();
   $('#play_card').hide();
   $("#start").click(function(){
      document.getElementById("started").classList.add('fixed-bottom');
      document.getElementById("started").classList.add('mb-5');
      $('#game_info').hide();
      $('#game_info').show(1000);
      $('#play_card').show(1000);
      $("#head").hide(1000);
      $(".hide").hide(1000);
      $("#cards").show(1000);
      //$("#login").hide();
   }) ; 
});
 

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

function action(){
   var p_id=$("#id").val();
    $.ajax(
         {
            url: "pinnacle.php/deck/player "+p_id,
            success: show_deck
         } 
      );
     }
function show_deck(data){
   for(var i=0;i<data.length;i++){
      var o = data[i];
      var number = o.number;
      var shape = o. shape;
      var node = document.createElement("option");
      var textnode = document.createTextNode(number +"");
      $('#cards').append("<option>" + number + " " + shape + "</option>");
      //document.getElementById("cards").innerHTML+="<option>" + number + " " + shape + "</option>";
   }   
} 

function deck_handle(){
   //url ajax 
   //succes go to other function store the variables 
   //show the center card on the page
}

function login_result(data){
   alert("User Added!");
   me = data[0]; 
   update_info();
   game_status_update();
  
   
   //bootstrap alert parakatw
   /*
   document.getElementById("alert").innerHTML+=
      '<div class="container">'+
                       '<div class="alert text-center alert-success alert-dismissible fade show">'+
                            '<button type="button" class="btn-close bg-success bg-opacity-25" data-dismiss="alert"></button>'+
                             '<strong>Success!</strong> User Added!'+
                         '</div>'+
                   '</div>'; 
   */
}
 
 
function update_info(){
   $('#game_info').html("<p>" + "I am Player: "+me.id+", my name is: "+me.username+"<br>Token: "+me.token+"<br>Game state: "+game_status.status+", " +game_status.p_turn+" must play now." + "</p>");
   //fixing this and adding a button to play a card

   if(game_status=='started'){
      //bla bla
      //call the fucking moirasma xartiwn mesa apo post
      //call the fucking function center_cards , mesa stin fucntion kalese to center card
      $.ajax(
         {
            url: "",
            success: other_func()
         } 
      );
   }
}
function login_error(data,y,z,c){
   var x= data.responseJSON;
   alert(x.errormesg);
   //bootstrap alert parakatw
     /* document.getElementById("alert").innerHTML+=
                     '<div class="container">'+
                       '<div class="alert text-center alert-danger alert-dismissible fade show">'+
                            '<button type="button" class="btn-close bg-danger bg-opacity-25" data-dismiss="alert"></button>'+
                             '<strong>ERROR!</strong>'+x.errormesg+
                         '</div>'+
                     '</div>'; */
       
}
function game_status_update(){
   $.ajax({url: "pinnacle.php/status/", success: update_status});
}

function update_status(data){
   game_status= data[0];
   update_info();
    if(game_status.p_turn==me.p_id && me.p_id!=null){
      x=0;
      // do play
      $("#move_div").show(1000);
      setTimeout(function(){ game_status_update();}, 15000);
    }
    else{
      // must wait for something
      $("#move_div").hide(1000);
      setTimeout(function(){ game_status_update();}, 4000);
    }
}
 

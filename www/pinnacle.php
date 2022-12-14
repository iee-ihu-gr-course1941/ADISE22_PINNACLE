<?php
    require_once "../lib/dbConnect.php";
    require_once "../lib/game.php";
    require_once "../lib/deck.php";
    require_once "../lib/users.php";
    
    $method = $_SERVER['REQUEST_METHOD'];
    $request = explode('/', trim($_SERVER['PATH_INFO'],'/'));
    $input = json_decode(file_get_contents('php://input'),true);
      if($input==null) {
        $input=[];
    }
    if(isset($_SERVER['HTTP_X_TOKEN'])) {
        $input['token']=$_SERVER['HTTP_X_TOKEN'];
    } else {
        $input['token']='';
    }    
     //$input=$_SERVER['HTTP_X_TOKEN'];

    switch ($r=array_shift($request)) {
        case 'deck' : 
            handle_deck($method,$request[0]);
        break;

        case 'player': 
            handle_player($method, $request,$input);
        
            break;

        case 'status':
            if(sizeof($request)==0){
                handle_status($method);
            }
            else{
                header("HTTP/1.1 404 Not Found");
            }
        break;
        
        case 'playcard':
            handle_play_card($method,$request);
        break;

        case 'give_card':
            handle_givecard($method);
        break;

        case 'clean_center':
            handle_clean_center($method);
        break;
        case 'center':
            if(sizeof($request)==0){
                handle_center($method); 
            }
            else{
                header("HTTP/1.1 404 Not Found");
            }
        break;
        case 'move':
            handle_move($method,$request,$input);
            break;

        default: 	
        header("HTTP/1.1 404 Not Found");
        exit;
    }
// FUNCTIONS
    function handle_deck($method,$b){
        if($method=='GET'){
            get_player_cards($b);
        }
        else if($method=='POST'){
            reset_deck();
        }
        else{
            header('HTTP/1.1405 Method Not Allowed');
        }
    }
   
    function handle_status($method){
        if($method=='GET'){
            show_status();
            
        }
        elseif($method =='POST'){
            result_status();
        }
        else{
            header('HTTP/1.1 405 Method Not Allowed');
        }
    }
   
    function handle_count($method){
        if($method=='GET'){
            player_count();
        }
        else{
            header('HTTP/1.1 405 Method Not Allowed');
        }
    }
    function handle_player($method,$p,$input){
        if($method == "POST"){
            reset_game();
        }
        switch ($b=array_shift($p)){
            case '1':
            case '2':
                handle_user($method,$b,$input);
                break;           
            default: header("HTTP/1.1 404 Not Found");
                     print json_encode(['errormesg'=>"Player $b not found."]);
                break;
        }
    }
    function handle_givecard($method){
        if($method=='POST'){
            give_card();
        }
    }
    function handle_clean_center($method){
        if($method=='POST'){
            clean_center();
        }
    }
    function handle_play_card($method,$b){
        if($method=='PUT'){
            play_one_card($b);
        }
    }
    function handle_center($method){
        if($method=='GET'){
            center_cards();
        }else if($method=='POST'){
            show_center_card();
        }
    }
    function handle_move($method,$b,$input){
   
        if($method=='PUT'){     
            play_comb($b,$input['token']);
        }
        else{
            header('HTTP/1.1 405 Method Not Allowed');
        }
    }
    ?> 
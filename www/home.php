<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- CSS only -->
    <!--bootstrap link-->
    <link  rel="stylesheet" type="text/css" href="main2.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
    <title>Pinnacle</title>
</head>
<body>
 <?php 
  require_once "../lib/dbConnect.php";
  require_once "../lib/deck.php";
 ?>
    <div class="container text-center pt-5" >
        <div class="row justify-content-center pt-5">
            <div class="col-md-5">
                <h2 class="text-info">Welcome to Pinnacle Game!</h2>
                <form action="login.php" method="get">
                    <div class="form-group">
                        <label class="mt-4 mb-4">Login</label>
                            <h5  id="error" class="error text-danger text-opacity-50 bg-danger bg-opacity-25 rounded"><?php echo $_GET['ERROR'];?></h5>                   
                        <input placeholder="Enter Username" id="input" type="text" name="user" class="form-control mt-4 ">
                    </div>
                    <button type="submit" name="sumbit" class="btn btn-primary mt-4">Login</button>
                </form>
            </div>
        </div>
    </div>
    <?php   
    /* $method = $_SERVER['REQUEST_METHOD'];
    $request = explode('/', trim($_SERVER['PATH_INFO'],'/'));
     
    $input = json_decode(file_get_contents('php://input'),true);

   
    switch ($r=array_shift($request)) {
        case 'deck' : 
        switch ($b=array_shift($request)) {
            case '':
            case null: handle_deck($method);
            break;
            case 'piece': // handle_piece($method, $request[0],$request[1],$input);
                        break;
            case 'player': // handle_player($method, $request[0],$input);
                        break;
            default: header("HTTP/1.1 404 Not Found");
                    break;
        }
        break;
        default: 	
        header("HTTP/1.1 404 Not Found");
        exit;
    }
    function handle_deck($method){
        if($method=='GET'){
            show_deck();
        }
        else if($method=='POST'){
            reset_deck();
        }
        else{
            header('HTTP/1.1405 Method Not Allowed');
        }
    }
    */
    ?> 
</body>
</html>
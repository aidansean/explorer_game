<?php

$title = 'Room Explorer | Player' ;
$tagline = 'Explore that room!' ;
$stylesheets = array('style.css') ;
$js_scripts = array() ;

$js_scripts[] = 'js/helper.js' ;
$js_scripts[] = 'js/settings.js' ;
$js_scripts[] = 'js/control_play.js' ;
$js_scripts[] = 'js/base.js' ;
$js_scripts[] = 'js/polygon.js' ;
$js_scripts[] = 'js/room_data.js' ;
$js_scripts[] = 'js/draw.js' ;
$js_scripts[] = 'js/monsters.js' ;
$js_scripts[] = 'js/doors.js' ;
include_once($_SERVER['FILE_PREFIX'] . '/_core/preamble.php') ;
?>  
  
  <h2 id="h2_room_name"></h2>
  <canvas id="canvas_game" width="500" height="500"></canvas>
  
<?php foot() ; ?>

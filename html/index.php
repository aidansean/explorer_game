<?php

$title = 'Room Explorer' ;
$tagline = 'Explore that room!' ;
$stylesheets = array('style.css') ;
include_once($_SERVER['FILE_PREFIX'] . '/_core/preamble.php') ;
?>  
  
  <div class="right">
    <h3>About this page</h3>
    <p>This page is a work in progress.  It's a retro style arcade game where the player runs around, collects objects, evades monster etc.</p>
  </div>
  
  <ul>
    <li><a href="edit.php">Edit the game</a></li>
    <li><a href="play.php">Play the game</a></li>
  </ul>
  
<?php foot() ; ?>

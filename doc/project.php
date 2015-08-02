<?php
include_once($_SERVER['FILE_PREFIX']."/project_list/project_object.php") ;
$github_uri   = "https://github.com/aidansean/explorer_game" ;
$blogpost_uri = "http://aidansean.com/projects/?tag=explorer_game" ;
$project = new project_object("explorer_game", "Room explorer game", "https://github.com/aidansean/explorer_game", "http://aidansean.com/projects/?tag=explorer_game", "explorer_game/images/project.jpg", "explorer_game/images/project_bw.jpg", "This project is a game where the player explores rooms with a top down view and does all the normal things, such as traverse mazes, open doors, fight monsters and so on.  This is a gravity-less version of the <a href=\"\">Platform game</a> and has an even more retro feel to it.  It's obviously a work in progress and needs a lot more work, but the main mechanics are complete and it even has its own editor.", "Games", "canvas,CSS,HTML,JavaScript") ;
?>
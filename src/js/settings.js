var save_point_x  = 200 ;
var save_point_y  = 400 ;

var dir = 'N' ;

// Player coordinates
var x = save_point_x ;
var y = save_point_y ;

// Room coordinates
var ux = 0 ;
var uy = 0 ;

var canvas  = null ;
var context = null ;

// canvas width and height
var cw = 500 ;
var ch = 500 ;

// Player width and height
var pw = 25 ;
var ph = 25 ;

var margin = 20 ;

var gw = cw - 2*margin ;
var gh = ch - 2*margin ;

var vx = 0 ;
var vy = 0 ;

var counter =  0 ;
var stop    = -1 ;
var delay   = 20 ;

// Change in x and y with each move
var dx = 10 ;
var dy = 10 ;

var player = null ;

var allow_diagonal = false ;
var tolerance = 1e-3 ;

var snap = true ;
var snap_dx = dx ;
var snap_dy = dy ;

var grid_x = 2*dx ;
var grid_y = 2*dy ;
var do_draw_grid = true ;

// Seeking points with right mouse button
var found_point   = false ;
var matched_lines = [] ;

var adding_text = false ;
var text = '' ;
var text_tmp = '' ;

var bullet_x  = -1 ;
var bullet_y  = -1 ;
var vx_bullet =  0 ;
var vy_bullet =  0 ;

var door_keys = [] ;
var things = [] ;

var pi = Math.PI ;

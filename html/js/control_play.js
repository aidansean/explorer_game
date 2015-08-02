var mode = 'play' ;

// Keyboard interactions
function keyDown(evt){
  var keyDownID = window.event ? event.keyCode : (evt.keyCode != 0 ? evt.keyCode : evt.which) ;
  switch(keyDownID){
    case 13: // Enter
      break ;
    case 27: // Escape
      room.lines.pop() ;
      break ;
    case 32: // Space
      evt.preventDefault() ;
      shoot_gun() ;
      break ;
    case 71: // g
      do_draw_grid = !do_draw_grid ;
      break ;
    case 37: case 65: // Left
      evt.preventDefault() ;
      try_move_W() ;
      break ;
    case 39: case 68: // Right
      evt.preventDefault() ;
      try_move_E() ;
      break ;
    case 38: case 87: // Up
      evt.preventDefault() ;
      try_move_N() ;
      break ;
    case 40: case 83: // Down
      evt.preventDefault() ;
      try_move_S() ;
      break ;
  }
}

function keyUp(evt){
  var keyUpID = window.event ? event.keyCode : (evt.keyCode != 0 ? evt.keyCode : evt.which) ;
  switch(keyUpID){
    case 13: // Enter
      break ;
    case 32: // Space
      break ;
    case 37: case 65: // Left
      evt.preventDefault() ;
      stop_move_W() ;
      break ;
    case 39: case 68: // Right
      evt.preventDefault() ;
      stop_move_E() ;
      break ;
    case 38: case 87: // Up
      evt.preventDefault() ;
      stop_move_N() ;
      break ;
    case 40: case 83: // Down
      evt.preventDefault() ;
      stop_move_S() ;
      break ;
  }
}

function stop_move() { vx = 0 ; vy = 0 ; }
function stop_move_W(){
  if(Math.abs(vy)>tolerance) vy = sign(vy)*dy ;
  vx = 0 ;
}
function stop_move_E(){
  if(Math.abs(vy)>tolerance) vy = sign(vy)*dy ;
  vx = 0 ;
}
function stop_move_N(){
  if(Math.abs(vx)>tolerance) vx = sign(vx)*dx ;
  vy = 0 ;
}
function stop_move_S(){
  if(Math.abs(vx)>tolerance) vx = sign(vx)*dx ;
  vy = 0 ;
}
function try_move_W(){
  dir = 'W' ;
  if(Math.abs(vy)>tolerance && allow_diagonal){
    vx = -dx/Math.sqrt(2) ;
    vy = sign(vy)*dy/Math.sqrt(2) ;
  }
  else{
    vx = -dx ; vy =   0 ;
  }
}
function try_move_E(){
  dir = 'E' ;
 if(Math.abs(vy)>tolerance && allow_diagonal){
    vx = dx/Math.sqrt(2) ;
    vy = sign(vy)*dy/Math.sqrt(2) ;
  }
  else{
    vx = dx ; vy =   0 ;
  }
}
function try_move_N(){
  dir = 'N' ;
  if(Math.abs(vx)>tolerance && allow_diagonal){
    vy = -dy/Math.sqrt(2) ;
    vx = sign(vx)*dx/Math.sqrt(2) ;
  }
  else{
    vx =  0 ; vy = -dy ;
  }
}
function try_move_S(){
  dir = 'S' ;
  if(Math.abs(vx)>tolerance && allow_diagonal){
    vy = dy/Math.sqrt(2) ;
    vx = sign(vx)*dx/Math.sqrt(2) ;
  }
  else{
    vx =  0 ; vy = dy ;
  }
}


function add_eventListeners(){
  document.addEventListener('keydown', keyDown) ;
  document.addEventListener('keyup'  , keyUp  ) ;
}



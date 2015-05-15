var mode = 'edit' ;

function start_add_text(){ adding_text = true ; }
var x_mouse_down = -1 ;
var y_mouse_down = -1 ;
var x_mouse_move = -1 ;
var y_mouse_move = -1 ;
var x_mouse_out  = -1 ;
var y_mouse_out  = -1 ;
var x_mouse_up   = -1 ;
var y_mouse_up   = -1 ;

var text_input_active = false ;

// Keyboard interactions
function keyDown(evt){
  if(text_input_active) return ;
  var keyDownID = window.event ? event.keyCode : (evt.keyCode != 0 ? evt.keyCode : evt.which) ;
  if(adding_text){
    if(keyDownID==32) evt.preventDefault() ; // Space
    if(keyDownID==13){
      room.add_text(x_mouse_down, y_mouse_down, text+'') ;
      text = '' ;
      text_tmp = '' ;
      adding_text = false ;
    }
    text     += String.fromCharCode(keyDownID) ;
    text_tmp += String.fromCharCode(keyDownID) ;
    return ;
  }
  switch(keyDownID){
    case 13: // Enter
      if(adding_text){
        adding_text = false ;
        room.add_text(text_x, text_y, text) ;
      }
      break ;
    case 27: // Escape
      room.lines.pop() ;
      break ;
    case 32: // Space
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
  if(Math.abs(vy)>tolerance && allow_diagonal){
    vx = -dx/Math.sqrt(2) ;
    vy = sign(vy)*dy/Math.sqrt(2) ;
  }
  else{
    vx = -dx ; vy =   0 ;
  }
}
function try_move_E(){
 if(Math.abs(vy)>tolerance && allow_diagonal){
    vx = dx/Math.sqrt(2) ;
    vy = sign(vy)*dy/Math.sqrt(2) ;
  }
  else{
    vx = dx ; vy =   0 ;
  }
}
function try_move_N(){
  if(Math.abs(vx)>tolerance && allow_diagonal){
    vy = -dy/Math.sqrt(2) ;
    vx = sign(vx)*dx/Math.sqrt(2) ;
  }
  else{
    vx =  0 ; vy = -dy ;
  }
}
function try_move_S(){
  if(Math.abs(vx)>tolerance && allow_diagonal){
    vy = dy/Math.sqrt(2) ;
    vx = sign(vx)*dx/Math.sqrt(2) ;
  }
  else{
    vx =  0 ; vy = dy ;
  }
}

function is_right_click(e){
  // Is it a right click?
  var rightclick ;
  if(!e) var e = window.event ;
  if     (e.which ) rightclick = (e.which ==3) ;
  else if(e.button) rightclick = (e.button==2) ;
  return rightclick ;
}


function get_mouse_xy(e){
  var rect = canvas.getBoundingClientRect() ;
  var x_ = e.clientX - rect.left ;
  var y_ = e.clientY - rect.top  ;
  if(snap){
    x_ = snap_dx*Math.round(x_/snap_dx) ;
    y_ = snap_dy*Math.round(y_/snap_dy) ;
  }
  x_ -= margin ;
  y_ -= margin ;
  return [x_,y_] ;
}

function update_mouse_coords(){
  Get('td_x_mouse_down').innerHTML = x_mouse_down ;
  Get('td_y_mouse_down').innerHTML = y_mouse_down ;
  Get('td_x_mouse_move').innerHTML = x_mouse_move ;
  Get('td_y_mouse_move').innerHTML = y_mouse_move ;
  Get('td_x_mouse_out' ).innerHTML = x_mouse_out  ;
  Get('td_y_mouse_out' ).innerHTML = y_mouse_out  ;
  Get('td_x_mouse_up'  ).innerHTML = x_mouse_up   ;
  Get('td_y_mouse_up'  ).innerHTML = y_mouse_up   ;
}

function mousedown(e){
  var rc = is_right_click(e) ;
  var xy = get_mouse_xy(e) ;
  x_mouse_down = xy[0] ;
  y_mouse_down = xy[1] ;
  x_mouse_move =    -1 ;
  y_mouse_move =    -1 ;
  if(adding_text) return ;
  update_mouse_coords() ;
  
  
  // If we're using the right mouse button check for elements:
  //   If we coincide with a point, move that point for all lines
  //   Otherwise start dragging a rectangle around elements
  found_point = false ;
  matched_lines = [] ;
  if(rc){
    for(var i=0 ; i<room.lines.length ; i++){
      var l = room.lines[i] ;
      if(abs(x_mouse_down-l.p1[0])<tolerance && abs(y_mouse_down-l.p1[1])<tolerance){
        found_point = true ;
        matched_lines.push([i,0]) ;
        room.lines[i].p1_0 = [] ;
        room.lines[i].p1_0.push(room.lines[i].p1[0]) ;
        room.lines[i].p1_0.push(room.lines[i].p1[1]) ;
      }
      if(abs(x_mouse_down-l.p2[0])<tolerance && abs(y_mouse_down-l.p2[1])<tolerance){
        found_point = true ;
        matched_lines.push([i,1]) ;
        room.lines[i].p2_0 = [] ;
        room.lines[i].p2_0.push(room.lines[i].p2[0]) ;
        room.lines[i].p2_0.push(room.lines[i].p2[1]) ;
      }
    }
    if(found_point==false){
      
    }
  }
}
function mousemove(e){
  if(adding_text) return ;
  var rc = is_right_click(e) ;
  var xy = get_mouse_xy(e) ;
  x_mouse_move = xy[0] ;
  y_mouse_move = xy[1] ;
  update_mouse_coords() ;
  if(rc){
    if(found_point){
      var dx = x_mouse_move - x_mouse_down ;
      var dy = y_mouse_move - y_mouse_down ;
      for(var i=0 ; i<matched_lines.length ; i++){
        var m = matched_lines[i] ;
        if(m[1]==0){
          room.lines[m[0]].p1[0] = room.lines[m[0]].p1_0[0] + dx ;
          room.lines[m[0]].p1[1] = room.lines[m[0]].p1_0[1] + dy ;
        }
        else if(m[1]==1){
          room.lines[m[0]].p2[0] = room.lines[m[0]].p2_0[0] + dx ;
          room.lines[m[0]].p2[1] = room.lines[m[0]].p2_0[1] + dy ;
        }
        
      }
    }
  }
}
function mouseup(e){
  if(adding_text) return ;
  if(x_mouse_down<0 || y_mouse_down<0) return ;

  var rc = is_right_click(e) ;
  var xy = get_mouse_xy(e) ;
  x_mouse_up = xy[0] ;
  y_mouse_up = xy[1] ;
  update_mouse_coords() ;
  
  if(rc){
    if(found_point){
      var dx = x_mouse_up - x_mouse_down ;
      var dy = y_mouse_up - y_mouse_down ;
      for(var i=0 ; i<matched_lines.length ; i++){
        var m = matched_lines[i] ;
        if(m[1]==0){
          room.lines[m[0]].p1[0] = room.lines[m[0]].p1_0[0] + dx ;
          room.lines[m[0]].p1[1] = room.lines[m[0]].p1_0[1] + dy ;
        }
        else if(m[1]==1){
          room.lines[m[0]].p2[0] = room.lines[m[0]].p2_0[0] + dx ;
          room.lines[m[0]].p2[1] = room.lines[m[0]].p2_0[1] + dy ;
        }
      }
    }
  }
  else{
    var x1 = snap_dx*Math.round(x_mouse_down/snap_dx) ;
    var y1 = snap_dy*Math.round(y_mouse_down/snap_dy) ;
    var x2 = snap_dx*Math.round(x_mouse_up  /snap_dx) ;
    var y2 = snap_dy*Math.round(y_mouse_up  /snap_dy) ;
    room.add_line([x1,y1],[x2,y2],[0,255,255]) ;
  }
  x_mouse_down = -1 ;
  y_mouse_down = -1 ;
  x_mouse_move = -1 ;
  y_mouse_move = -1 ;
  x_mouse_up   = -1 ;
  y_mouse_up   = -1 ;
}
function mouseout(e){
  if(adding_text) return ;
  if(x_mouse_down<0 || y_mouse_down<0) return ;
  
  var xy = get_mouse_xy(e) ;
  x_mouse_up = xy[0] ;
  y_mouse_up = xy[1] ;
  update_mouse_coords() ;
  
  var x1 = snap_dx*Math.round(x_mouse_down/snap_dx) ;
  var y1 = snap_dy*Math.round(y_mouse_down/snap_dy) ;
  var x2 = snap_dx*Math.round(x_mouse_up  /snap_dx) ;
  var y2 = snap_dy*Math.round(y_mouse_up  /snap_dy) ;
  room.add_line([x1,y1],[x2,y2],[0,255,255]) ;

  x_mouse_down = -1 ;
  y_mouse_down = -1 ;
  x_mouse_move = -1 ;
  y_mouse_move = -1 ;
  x_mouse_up   = -1 ;
  y_mouse_up   = -1 ;
}

function skip_N(){ y-=ch ; change_room() ; }
function skip_E(){ x+=cw ; change_room() ; }
function skip_S(){ y+=ch ; change_room() ; }
function skip_W(){ x-=cw ; change_room() ; }

function update_room_name(){ room.name = input_room_name.value ; }

function text_input_active_true (){ text_input_active = true  ; }
function text_input_active_false(){ text_input_active = false ; }

function add_eventListeners(){
  document.addEventListener('keydown', keyDown) ;
  document.addEventListener('keyup'  , keyUp  ) ;
  Get('canvas_game').addEventListener('mousedown', mousedown) ;
  Get('canvas_game').addEventListener('mouseup'  , mouseup  ) ;
  Get('canvas_game').addEventListener('mousemove', mousemove) ;
  Get('canvas_game').addEventListener('mouseout' , mouseout ) ;
  Get('submit_add_text').addEventListener('mousedown' , start_add_text) ;
  
  Get('submit_change_room_name').addEventListener('click' , update_room_name) ;
  
  Get('input_room_name').addEventListener('focus', text_input_active_true ) ;
  Get('input_room_name').addEventListener('blur' , text_input_active_false) ;
  
  Get('td_N').addEventListener('mousedown' , skip_N ) ;
  Get('td_E').addEventListener('mousedown' , skip_E ) ;
  Get('td_S').addEventListener('mousedown' , skip_S ) ;
  Get('td_W').addEventListener('mousedown' , skip_W ) ;
}



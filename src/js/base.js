function start(){
  canvas  = Get('canvas_game') ;
  context = canvas.getContext('2d') ;
  context.translate(0.5,0.5) ;
  context.lineCap = 'round' ;
  canvas.oncontextmenu = function(e){ e.preventDefault() ; } ;
  
  cw = canvas.width  ;
  ch = canvas.height ;
  
  make_player() ;
  make_rooms() ;
  
  room = get_room(ux,uy) ;
  change_room() ;
  
  add_eventListeners() ;
  draw() ;
  
  heartbeat() ;
}

function heartbeat(){
  if(counter>stop && stop>0) return ;
  counter++ ;
  
  x += vx ;
  y += vy ;
  x = dx*Math.floor(x/dx) ;
  y = dy*Math.floor(y/dy) ;
  player.update_points() ;
  var collide = false ;
  for(var i=0 ; i<room.lines.length ; i++){
    room.lines[i].intersects = false ;
  }
  // Check for collisions
  for(var j=0 ; j<player.lines.length ; j++){
    // Check for walls
    for(var i=0 ; i<room.lines.length ; i++){
      if(line_segment_intersection(player.lines[j], room.lines[i])){
        collide = true ;
        break ;
      }
    }
    if(collide) break ;
    // Check for monsters
    for(var i=0 ; i<room.monsters.length ; i++){
      if(player.lines[j].intersects_polygon(room.monsters[i])){
        if(room.monsters[i].alive){
          collide = true ;
          kill_player() ;
        }
      }
    }
    if(collide) break ;
    // Check for doors
    for(var i=0 ; i<room.doors.length ; i++){
      if(player.lines[j].intersects_polygon(room.doors[i])){
        if(room.doors[i].locked){ // Only check list of keys if we have to
          for(var k=0 ; k<door_keys.length ; k++){
            if(door_keys[k]==room.doors[i].name){
              room.doors[i].locked = false ;
            }
          }
        }
        if(room.doors[i].locked){
          collide = true ;
        }
      }
    }
    if(collide) break ;
    // Check for things
    for(var i=0 ; i<room.things.length ; i++){
      if(player.lines[j].intersects_polygon(room.things[i])){
        if(!room.things[i].present) continue ;
        things.push(room.things[i]) ;
        room.things[i].present = false ;
        if(room.things[i].type=='key') door_keys.push(room.things[i].name) ;
      }
    }
    
  }
  if(collide){
    x -= vx ;
    y -= vy ;
    vx =  0 ;
    vy =  0 ;
  }
  x = dx*Math.floor(x/dx) ;
  y = dy*Math.floor(y/dy) ;
  
  var m = margin ;
  if(x+0.5*pw>cw-m){ x = m-0.5*pw ; ux++ ; change_room() ; }
  if(x-0.5*pw<  -m){ x =   cw-2*m ; ux-- ; change_room() ; }
  if(y+0.5*ph>ch-m){ y = m-0.5*ph ; uy++ ; change_room() ; }
  if(y-0.5*ph<  -m){ y =   ch-2*m ; uy-- ; change_room() ; }
  
  if(Get('td_x' )) Get('td_x' ).innerHTML =  x ;
  if(Get('td_y' )) Get('td_y' ).innerHTML =  y ;
  if(Get('td_ux')) Get('td_ux').innerHTML = ux ;
  if(Get('td_uy')) Get('td_uy').innerHTML = uy ;
  
  player.update_points() ;
  draw() ;
  
  window.setTimeout(heartbeat,delay) ;
}

function kill_player(){
  x  = save_point_x  ;
  y  = save_point_y  ;
  ux = Math.floor(x/cw) ;
  uy = Math.floor(y/ch) ;
  change_room() ;
}

function shoot_gun(){
  bullet_x = x%cw ;
  bullet_y = y%ch ;
  vx_bullet = 0 ;
  vy_bullet = 0 ;
  if(dir=='W') vx_bullet = -2*dx ;
  if(dir=='E') vx_bullet =  2*dx ;
  if(dir=='N') vy_bullet = -2*dy ;
  if(dir=='S') vy_bullet =  2*dy ;
}

function distance_point_line(px, py, lx1, ly1, lx2, ly2){
  lx2 -= lx1 ;
  ly2 -= ly1 ;
  px  -= lx1 ;
  py  -= ly1 ;
  var t = Math.atan2(ly2,lx2) ;
  var m2x = lx2*Math.cos(t) + ly2*Math.sin(t) ;
  var m2y = ly2*Math.cos(t) - lx2*Math.sin(t) ;
  var qx  =  px*Math.cos(t) +  py*Math.sin(t) ;
  var qy  =  py*Math.cos(t) -  px*Math.sin(t) ;
  var dx = (qx>0 && qx<m2x) ? 0 : Math.min( Math.abs(qx) , Math.abs(m2x-qx) ) ;
  var d = Math.sqrt(dx*dx+qy*qy) ;
  return d ;
}
function draw(){
  context.fillStyle = 'rgb(100,100,100)' ;
  context.fillRect(0,0,cw,ch) ;
  
  var m = margin ;
  var x1 = m ;
  var y1 = m ;
  var x2 = cw-m ;
  var y2 = ch-m ;
  
  context.fillStyle = 'rgb(0,0,0)' ;
  context.fillRect(m,m,cw-2*m,ch-2*m) ;
  
  var mx = [3*m,m,-m] ;
  var my = [3*m,m,-m] ;
  for(var i=-1 ; i<=1 ; i++){
    //if(i!=0) continue ;
    for(var j=-1 ; j<=1 ; j++){
      var Dx = i*cw+mx[i+1] ;
      var Dy = j*ch+my[j+1] ;
      var r = get_room(ux+i,uy+j) ;
      for(var k=0 ; k<r.lines.length ; k++){
        r.lines[k].draw(context,Dx,Dy) ;
      }
      for(var k=0 ; k<r.texts.length ; k++){
        r.texts[k].draw(context,Dx,Dy) ;
      }
      if(i==0 && j==0){
        for(var k=0 ; k<r.monsters.length ; k++){
          if(r.monsters[k].alive==false) continue ;
          r.monsters[k].update_points() ;
          r.monsters[k].draw(context,Dx,Dy) ;
        }
        for(var k=0 ; k<r.doors.length ; k++){
          r.doors[k].draw(context,Dx,Dy) ;
        }
        for(var k=0 ; k<r.things.length ; k++){
          r.things[k].draw(context,Dx,Dy) ;
        }
      }
    }
  }
  if(bullet_x>=0 || bullet_y>=0){
    bullet_x += vx_bullet ;
    bullet_y += vy_bullet ;
    
    for(var i=0 ; i<room.monsters.length ; i++){
      var mon = room.monsters[i] ;
      if(mon.alive==false) continue ;
      var kill_monster = false ;
      for(var j=0 ; j<mon.lines.length ; j++){
        var l = mon.lines[j] ;
        var d = distance_point_line(bullet_x, bullet_y, l.p1[0], l.p1[1], l.p2[0], l.p2[1]) ;
        if(d<2*dx) kill_monster = true ;
      }
      if(kill_monster){
        bullet_x  = -1 ;
        bullet_y  = -1 ;
        vx_bullet = -1 ;
        vy_bullet = -1 ;
        room.monsters[i].alive = false ;
      }
    }
    for(var j=0 ; j<room.lines.length ; j++){
      var l = room.lines[j] ;
      var d = distance_point_line(bullet_x, bullet_y, l.p1[0], l.p1[1], l.p2[0], l.p2[1]) ;
      if(d<2*dx){
        bullet_x  = -1 ;
        bullet_y  = -1 ;
        vx_bullet = -1 ;
        vy_bullet = -1 ;
      }
    }
    if(bullet_x<0 || bullet_x>=cw || bullet_y<0 || bullet_y>=ch){
      bullet_x = -1 ;
      bullet_y = -1 ;
      vx_bullet = 0 ;
      vy_bullet = 0 ;
    }
    else{
      context.beginPath() ;
      context.fillStyle = 'rgb(255,0,0)' ;
      context.arc(bullet_x+m,bullet_y+m,5,0,2*Math.PI,true) ;
      context.fill() ;
    }
  }
  if(text_tmp){
    var text_tmp_object = new text_object(x_mouse_down, y_mouse_down, text_tmp, Get('select_text_align').value, Get('input_text_size').value, 'rgb(255,0,255)') ;
    text_tmp_object.draw(context, 0, 0) ;
  }
  
  player.draw(context,m,m) ;
  
  if(mode=='edit'){
    if(do_draw_grid) draw_grid() ;
  
    if(x_mouse_move>=0 && y_mouse_move>=0 && x_mouse_down>=0 && y_mouse_down>=0 && found_point==false){
      context.beginPath() ;
      context.lineWidth = 3 ;
      context.strokeStyle = 'rgb(255,255,255)' ;
      context.moveTo(x_mouse_down+Dx,y_mouse_down+Dy) ;
      context.lineTo(x_mouse_move+Dx,y_mouse_move+Dy) ;
      context.stroke() ;
    }
  }
  else{
    context.fillStyle = 'rgb(50,50,50)' ;
    context.fillRect(   -1,     -1, cw,m+2) ;
    context.fillRect(   -1,     -1,m+2, ch) ;
    context.fillRect(cw-m-1,    -1,m+2, ch) ;
    context.fillRect(    -1,ch-m-1, cw,m+2) ;
  }
  
  return ;
  context.fillStyle = 'rgb(255,255,255)' ;
  context.fillRect(0,0,cw,margin) ;
  context.fillRect(0,ch-margin,cw,margin) ;
  context.fillRect(0,0,margin,ch) ;
  context.fillRect(cw-margin,0,margin,ch) ;
}

function draw_grid(){
  context.lineWidth =1 ;
  context.strokeStyle = 'rgb(200,200,200)' ;
  for(var x=0 ; x<cw ; x+=grid_x){
    context.moveTo(x , 0) ;
    context.lineTo(x ,ch) ;
  }
  for(var y=0 ; y<ch ; y+=grid_y){
    context.moveTo( 0, y) ;
    context.lineTo(cw, y) ;
  }
  context.stroke() ;
}

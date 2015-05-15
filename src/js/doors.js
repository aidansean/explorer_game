function door_object(name, color, text, x, y, w, h){
  var points = [] ;
  points.push([x-0.5*w,y-0.5*h]) ;
  points.push([x+0.5*w,y-0.5*h]) ;
  points.push([x+0.5*w,y+0.5*h]) ;
  points.push([x-0.5*w,y+0.5*h]) ;
  var door = new polygon_object(points, [255, 0, 0], true) ;
  
  door.locked = true ;
  door.name  = name  ;
  door.color = color ;
  door.text  = text  ;
  door.x = x ;
  door.y = y ;
  door.w = w ;
  door.h = h ;
  
  door.draw = function(c, Dx, Dy){
    if(!this.locked) return ;
    
    c.strokeStyle = this.color ;
    c.fillStyle   = this.color ;
    
    c.fillRect(this.x+Dx-0.3*this.w, this.y+Dy-0.2*this.h, 0.6*this.w, 0.5*this.h ) ;
    c.beginPath() ;
    c.arc(this.x+Dx, this.y+Dy-0.2*this.h, 0.15*this.w, 0, pi, true) ;
    c.stroke() ;
    
    c.strokeRect(this.x+Dx-0.5*this.w, this.y+Dy-0.5*this.h, this.w, this.h) ;
    
    c.font = 0.5*this.h + 'px arial , sans-serif' ;
    c.textAlign = 'center' ;
    c.fillStyle   = 'rgb(0,0,0)' ;
    c.fillText(this.text, this.x+Dx, this.y+0.2*this.h+Dy) ;
  }
  
  door.code = function(){
    var string = '  door = new door_object("'
      + this.name + '","'
      + this.color + '","'
      + this.text + '",'
      + this.x + ',' + this.y + ','
      + this.w + ',' + this.h + ') ;\n' ;
    string = string + '  the_room.doors.push(door) ;\n' ;
    return string ;
  }
  return door ;
}

function key_object(name, color, text, x, y,w, h){
  var points = [] ;
  points.push([x-0.5*w,y-0.5*h]) ;
  points.push([x+0.5*w,y-0.5*h]) ;
  points.push([x+0.5*w,y+0.5*h]) ;
  points.push([x-0.5*w,y+0.5*h]) ;
  var key = new polygon_object(points, [255, 0, 0], true) ;
  
  key.present = true ;
  key.type = 'key' ;
  key.name  = name  ;
  key.color = color ;
  key.text  = text  ;
  key.x = x ;
  key.y = y ;
  key.w = w ;
  key.h = h ;
  
  key.draw = function(c, Dx, Dy){
    if(!this.present) return ;
    
    c.strokeStyle = this.color ;
    c.fillStyle   = this.color ;
    
    c.beginPath() ;
    c.arc(this.x+Dx-0.4*this.w, this.y+Dy, 0.35*this.w, 0, 2*pi, true) ;
    c.fill() ;
    
    c.strokeRect(this.x+Dx-0.5 *this.w, this.y+Dy-0.05*this.h, this.w,     0.1*this.h) ;
    c.strokeRect(this.x+Dx+0.5 *this.w, this.y+Dy, this.w*0.05,0.3*this.h) ;
    c.strokeRect(this.x+Dx+0.25*this.w, this.y+Dy, this.w*0.05,0.3*this.h) ;
    
    c.font = 0.5*this.h + 'px arial , sans-serif' ;
    c.textAlign = 'center' ;
    c.fillStyle   = 'rgb(0,0,0)' ;
    c.fillText(this.text, this.x+Dx-0.4*this.w, this.y+0.2*this.h+Dy) ;
    
    //c.strokeRect(this.x+Dx-0.5*this.w, this.y+Dy-0.5*this.h, this.w, this.h) ;
  }
  
  key.code = function(){
    var string = '  key = new key_object("'
      + this.name + '","'
      + this.color + '","'
      + this.text + '",'
      + this.x + ',' + this.y + ','
      + this.w + ',' + this.h + ') ;\n' ;
    string = string + '  the_room.things.push(key) ;\n' ;
    return string ;
  }
  return key ;
}

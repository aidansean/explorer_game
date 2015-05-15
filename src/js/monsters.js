function spider_object(x1, y1, x2, y2, period, offset, w, h, color){
  var points = [] ;
  points.push([x1-0.5*this.w,y1-0.5*this.h]) ;
  points.push([x1+0.5*this.w,y1-0.5*this.h]) ;
  points.push([x1+0.5*this.w,y1+0.5*this.h]) ;
  points.push([x1-0.5*this.w,y1+0.5*this.h]) ;
  var monster = new polygon_object(points, [255, 0, 0], true) ;
  monster.species = 'spider' ;
  monster.x1 = x1 ;
  monster.y1 = y1 ;
  monster.x2 = x2 ;
  monster.y2 = y2 ;
  monster.w  =  w ;
  monster.h  =  h ;
  monster.x  = x1 ;
  monster.y  = y1 ;
  monster.color  = color  ;
  monster.period = period ;
  monster.offset = offset ;
  monster.alive  = true   ;
  monster.update_points = function(){
    this.points = [] ;
    var f = ((counter+this.offset)%this.period)/this.period ;
    if(f>0.5) f = 1-f ;
    this.x = this.x1 + f*(this.x2-this.x1) ;
    this.y = this.y1 + f*(this.y2-this.y1) ;
    this.points.push([this.x-0.5*this.w,this.y-0.5*this.h]) ;
    this.points.push([this.x+0.5*this.w,this.y-0.5*this.h]) ;
    this.points.push([this.x+0.5*this.w,this.y+0.5*this.h]) ;
    this.points.push([this.x-0.5*this.w,this.y+0.5*this.h]) ;
    this.lines  = [] ;
    var n = this.points.length ;
    for(var i=0 ; i<n ; i++){
      this.lines.push(new line_object(this.points[i],this.points[(i+1)%n], this.color)) ;
    }
  }
  monster.draw = function(c, Dx, Dy){
    c.lineWidth = 2 ;
    c.strokeStyle = this.color ;
    c.beginPath() ;
    for(var j=0 ; j<this.lines.length ; j++){
      c.moveTo(this.lines[j].p1[0],this.lines[j].p1[1]) ;
      c.lineTo(this.lines[j].p2[0],this.lines[j].p2[1]) ;
    }
    //context.stroke() ;
    
    var r = Math.sqrt(this.w*this.w+this.h*this.h)/2 ;
    
    var dy1 = 0.7*r ;
    var dy2 = 0.1*r ;
    var d   = 1 ;
    c.beginPath() ;
    c.fillStyle = this.color ;
    c.arc(this.x+Dx, this.y+Dy,0.5*r,0,2*Math.PI,true) ;
    c.arc(this.x+Dx, this.y+d*dy+Dy,0.3*r,0,2*Math.PI,true) ;
    c.fill() ;
    
    context.beginPath() ;
    for(var i=0 ; i<4 ; i++){
      var t = 0.2*(i-1.5)*Math.PI ;
      context.moveTo(this.x              +Dx, this.y-d*dy2          +Dy) ;
      context.lineTo(this.x+r*Math.cos(t)+Dx, this.y+d*r*Math.sin(t)+Dy) ;
      context.moveTo(this.x              +Dx, this.y-d*dy2          +Dy) ;
      context.lineTo(this.x-r*Math.cos(t)+Dx, this.y+d*r*Math.sin(t)+Dy) ;
    }
    context.stroke() ;
    
    context.beginPath() ;
    c.fillStyle = 'rgb(0,0,0)' ;
    c.arc(this.x-0.1*r+Dx, this.y+0.45*this.h+Dy,0.1*r,0,2*Math.PI,true) ;
    c.arc(this.x+0.1*r+Dx, this.y+0.45*this.h+Dy,0.1*r,0,2*Math.PI,true) ;
    c.fill() ;
  }
  monster.code = function(){
    var string = '  monster = new ' + this.species + '_object('
      + this.x1 + ',' + this.y1 + ','
      + this.x2 + ',' + this.y2 + ','
      + this.period + ',' + this.offset
      + ',' + this.w + ',' + this.h + ',"'
      + this.color + '") ;\n' ;
    string = string + '  the_room.monsters.push(monster) ;\n' ;
    return string ;
  }
  return monster ;
}


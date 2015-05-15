function line_object(p1, p2, color){
  this.p1 = p1 ;
  this.p2 = p2 ;
  this.color = color ;
  this.r = this.color[0] ;
  this.g = this.color[1] ;
  this.b = this.color[2] ;
  this.intersects = false ;
  this.intersects_polygon = function(pol){
    for(var i=0 ; i<pol.lines.length ; i++){
      if(line_segment_intersection(pol.lines[i], this)){
        this.intersects = true ;
        return true ;
      }
    }
    return false ;
  }
  this.draw = function(c, Dx, Dy){
    var n = 1 ;
    for(var i=0 ; i<n ; i++){
      c.lineWidth = 1+2*(n-i) ;
      var r = Math.floor(this.r*(i+1)/n) ;
      var g = Math.floor(this.g*(i+1)/n) ;
      var b = Math.floor(this.b*(i+1)/n) ;
      var color = 'rgb('+r+','+g+','+b+')' ;
      c.strokeStyle = color ;
      c.beginPath() ;
      c.moveTo(this.p1[0]+Dx,this.p1[1]+Dy) ;
      c.lineTo(this.p2[0]+Dx,this.p2[1]+Dy) ;
      c.stroke() ;
    }
  }
}

function polygon_object(points, color, closed){
  this.points = points ;
  this.lines  = [] ;
  this.color = color ;
  this.r = this.color[0] ;
  this.g = this.color[1] ;
  this.b = this.color[2] ;
  this.closed = closed ;
  var n = (this.closed) ? this.points.length : this.points.length-1 ;
  for(var i=0 ; i<n ; i++){
    this.lines.push(new line_object(this.points[i],this.points[(i+1)%n],color)) ;
  }
  this.draw = function(c, Dx, Dy){
    for(var i=0 ; i<this.lines.length ; i++){
      this.lines[i].draw(c, Dx, Dy) ;
    }
  }
}

function make_player(){
  var points = [] ;
  points.push([x-0.5*pw,y-0.5*ph]) ;
  points.push([x+0.5*pw,y-0.5*ph]) ;
  points.push([x+0.5*pw,y+0.5*ph]) ;
  points.push([x-0.5*pw,y+0.5*ph]) ;
  player = new polygon_object(points, [255, 0, 0], true) ;
  player.update_points = function(){
    this.points = [] ;
    this.points.push([x-0.5*pw,y-0.5*ph]) ;
    this.points.push([x+0.5*pw,y-0.5*ph]) ;
    this.points.push([x+0.5*pw,y+0.5*ph]) ;
    this.points.push([x-0.5*pw,y+0.5*ph]) ;
    this.lines  = [] ;
    var n = this.points.length ;
    for(var i=0 ; i<n ; i++){
      this.lines.push(new line_object(this.points[i],this.points[(i+1)%n], player.color)) ;
    }
  }
  player.draw = function(c, Dx, Dy){
    var color = 'rgb('+this.color+')' ;
    c.strokeStyle = color ;
    c.beginPath() ;
    c.arc(x+Dx,y-0.3*ph+Dy,0.2*pw,0,2*Math.PI,true) ;
    c.moveTo(x+Dx,y- 0.1*ph+Dy) ; c.lineTo(x+Dx,y+0.25*ph+Dy) ;
    c.moveTo(x+Dx,y+0.25*ph+Dy) ; c.lineTo(x-0.4*pw+Dx,y+0.5*ph+Dy) ;
    c.moveTo(x+Dx,y+0.25*ph+Dy) ; c.lineTo(x+0.4*pw+Dx,y+0.5*ph+Dy) ;
    c.moveTo(x-0.4*pw+Dx,y+0.05*ph+Dy) ; c.lineTo(x+0.4*pw+Dx,y+0.05*ph+Dy) ;
    c.stroke() ;
  }
}

function line_segment_intersection(l1, l2){
  var x1 = 1.0*l1.p1[0] ; var y1 = 1.0*l1.p1[1] ;
  var x2 = 1.0*l1.p2[0] ; var y2 = 1.0*l1.p2[1] ;
  var x3 = 1.0*l2.p1[0] ; var y3 = 1.0*l2.p1[1] ;
  var x4 = 1.0*l2.p2[0] ; var y4 = 1.0*l2.p2[1] ;
  return lineIntersect(x1,y1,x2,y2, x3,y3,x4,y4) ;
}
function lineIntersect(x1,y1,x2,y2, x3,y3,x4,y4){
  // Taken from http://stackoverflow.com/questions/9043805/test-if-two-lines-intersect-javascript-function
  var x = ((x1*y2-y1*x2)*(x3-x4)-(x1-x2)*(x3*y4-y3*x4))/((x1-x2)*(y3-y4)-(y1-y2)*(x3-x4)) ;
  var y = ((x1*y2-y1*x2)*(y3-y4)-(y1-y2)*(x3*y4-y3*x4))/((x1-x2)*(y3-y4)-(y1-y2)*(x3-x4)) ;
  if (isNaN(x)||isNaN(y)) return false;
  
  if(x1>=x2){ if(!(x2<=x&&x<=x1)) return false ; }
  else{       if(!(x1<=x&&x<=x2)) return false ; }
  
  if(y1>=y2){ if(!(y2<=y&&y<=y1)) return false ; }
  else{       if(!(y1<=y&&y<=y2)) return false ; }
  
  if(x3>=x4){ if(!(x4<=x&&x<=x3)) return false ; }
  else{       if(!(x3<=x&&x<=x4)) return false ; }
  
  if(y3>=y4){ if(!(y4<=y&&y<=y3)) return false ; }
  else{       if(!(y3<=y&&y<=y4)) return false ; }
    
  return true;
}
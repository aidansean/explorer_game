var rooms = [] ;
var current_room = null ;

function text_object(x, y, text, align, size, color){
  this.x = x ;
  this.y = y ;
  this.text  = text  ;
  this.align = align ;
  this.color = color ;
  this.draw = function(c, Dx, Dy){
    c.fillStyle = this.color ;
    c.textAlign = this.align ;
    c.font = size + 'px courier' ;
    c.fillText(this.text, this.x+Dx, this.y+Dy) ;
  }
}

function room_object(name){
  this.name = name ;
  this.lines = [] ;
  this.texts = [] ;
  this.monsters = [] ;
  this.doors    = [] ;
  this.things   = [] ;
  this.add_line = function(p1, p2, color){
    this.lines.push(new line_object(p1, p2, color)) ;
  }
  
  this.code = function(){
    if(this.name=='Nothingness') return '' ;
    var string = '  the_room = new room_object("' + this.name + '") ;\n' ;
    for(var i=0 ; i<this.lines.length ; i++){
      var l = this.lines[i] ;
      string += '  the_room.add_line([' + l.p1[0] + ',' + l.p1[1] + '],[' + l.p2[0] + ',' + l.p2[1] + '],['+l.color+']) ;\n' ;
    }
    for(var i=0 ; i<this.monsters.length ; i++){
      string += this.monsters[i].code() ;
    }
    for(var i=0 ; i<this.doors.length ; i++){
      string += this.doors[i].code() ;
    }
    for(var i=0 ; i<this.things.length ; i++){
      string += this.things[i].code() ;
    }
    string += '  add_room(the_room, ' + this.ux + ', ' + this.uy + ') ;\n\n' ;
    return string ;
  }
  this.add_text = function(x, y, text){
    var text = new text_object(x, y, text, Get('select_text_align').value, Get('input_text_size').value, 'rgb(255,0,255)') ;
    this.texts.push(text) ;
  }
}
var empty_room = new room_object('Nothingness',[]) ;

function make_rooms(){
  // Make some rooms
  var the_room = null ;
  var monster  = null ;
  var door     = null ;
  var color = [255,255,0] ;
  var m = margin ;
  
  the_room = new room_object("Solarium") ;
  the_room.add_line([20,20],[460,20],[255,255,0]) ;
  the_room.add_line([20,20],[20,440],[255,255,0]) ;
  the_room.add_line([20,440],[460,440],[255,255,0]) ;
  monster = new spider_object(100,100,100,300,100,0,20,20,"rgb(0,255,0)") ;
  the_room.monsters.push(monster) ;
  monster = new spider_object(150,100,150,300,100,10,20,20,"rgb(0,255,0)") ;
  the_room.monsters.push(monster) ;
  monster = new spider_object(200,100,200,300,100,20,20,20,"rgb(0,255,0)") ;
  the_room.monsters.push(monster) ;
  add_room(the_room, 0, 0) ;

  the_room = new room_object("Crawl space") ;
  the_room.add_line([460,440],[200,440],[0,255,255]) ;
  the_room.add_line([200,440],[200,340],[0,255,255]) ;
  the_room.add_line([200,340],[320,340],[0,255,255]) ;
  the_room.add_line([320,340],[320,400],[0,255,255]) ;
  the_room.add_line([320,400],[460,400],[0,255,255]) ;
  door = new door_object("A","rgb(255,0,255)","A",340,420,30,30) ;
  the_room.doors.push(door) ;
  add_room(the_room, 0, 1) ;

  the_room = new room_object("Solarium II") ;
  the_room.add_line([0,20],[440,20],[255,255,0]) ;
  the_room.add_line([440,20],[440,440],[255,255,0]) ;
  the_room.add_line([400,440],[0,440],[255,255,0]) ;
  the_room.add_line([440,440],[440,460],[255,255,0]) ;
  the_room.add_line([400,440],[400,460],[255,255,0]) ;
  key = new key_object("A","rgb(255,0,255)","A",300,300,30,30) ;
  the_room.things.push(key) ;
  add_room(the_room, 1, 0) ;

  the_room = new room_object("Cellar") ;
  the_room.add_line([440,0],[440,440],[0,255,255]) ;
  the_room.add_line([400,0],[400,400],[0,255,255]) ;
  the_room.add_line([440,440],[0,440],[0,255,255]) ;
  the_room.add_line([0,400],[180,400],[0,255,255]) ;
  the_room.add_line([400,400],[380,400],[0,255,255]) ;
  the_room.add_line([380,400],[380,280],[0,255,255]) ;
  the_room.add_line([380,280],[180,280],[0,255,255]) ;
  the_room.add_line([180,280],[180,400],[0,255,255]) ;
  the_room.add_line([180,260],[380,260],[0,255,255]) ;
  the_room.add_line([380,260],[380,140],[0,255,255]) ;
  the_room.add_line([380,140],[180,140],[0,255,255]) ;
  the_room.add_line([180,140],[180,260],[0,255,255]) ;
  add_room(the_room, 1, 1) ;


  
return ;
  
  the_room = new room_object("Solarium") ;
  the_room.add_line([20,20],[460,20],[255,255,0]) ;
  the_room.add_line([20,20],[20,440],[255,255,0]) ;
  the_room.add_line([20,440],[460,440],[255,255,0]) ;
  monster = new spider_object(100,100,100,300,100,0,20,20,"rgb(0,255,0)") ;
  the_room.monsters.push(monster) ;
  monster = new spider_object(150,100,150,300,100,10,20,20,"rgb(0,255,0)") ;
  the_room.monsters.push(monster) ;
  monster = new spider_object(200,100,200,300,100,20,20,20,"rgb(0,255,0)") ;
  the_room.monsters.push(monster) ;
  add_room(the_room, 0, 0) ;

  the_room = new room_object("Solarium II") ;
  the_room.add_line([0,20],[440,20],[255,255,0]) ;
  the_room.add_line([440,20],[440,440],[255,255,0]) ;
  the_room.add_line([400,440],[0,440],[255,255,0]) ;
  the_room.add_line([440,440],[440,460],[255,255,0]) ;
  the_room.add_line([400,440],[400,460],[255,255,0]) ;
  key = new key_object('A', 'rgb(255,0,255)','A', 300, 300, 30, 30) ;
  the_room.things.push(key) ;
  add_room(the_room, 1, 0) ;
  
  the_room = new room_object("Crawl space") ;
  the_room.add_line([460,440],[200,440],[0,255,255]) ;
  the_room.add_line([200,440],[200,340],[0,255,255]) ;
  the_room.add_line([200,340],[320,340],[0,255,255]) ;
  the_room.add_line([320,340],[320,400],[0,255,255]) ;
  the_room.add_line([320,400],[460,400],[0,255,255]) ;
  door = new door_object('A', 'rgb(255,0,255)','A', 340, 420, 30, 30) ;
  the_room.doors.push(door) ;
  add_room(the_room, 0, 1) ;

  the_room = new room_object("Cellar") ;
  the_room.add_line([440,0],[440,440],[0,255,255]) ;
  the_room.add_line([400,0],[400,400],[0,255,255]) ;
  the_room.add_line([440,440],[0,440],[0,255,255]) ;
  the_room.add_line([0,400],[180,400],[0,255,255]) ;
  the_room.add_line([400,400],[380,400],[0,255,255]) ;
  the_room.add_line([380,400],[380,280],[0,255,255]) ;
  the_room.add_line([380,280],[180,280],[0,255,255]) ;
  the_room.add_line([180,280],[180,400],[0,255,255]) ;
  add_room(the_room, 1, 1) ;


}

function add_room(room, ux_, uy_){
  if(rooms[ux_]){
    if(rooms[ux_][uy_]) return ;
    room.ux = ux_ ;
    room.uy = uy_ ;
    rooms[ux_][uy_] = room ;
  }
  else{
    rooms[ux_] = [] ;
    room.ux = ux_ ;
    room.uy = uy_ ;
    rooms[ux_][uy_] = room ;
  }
}

function get_room(ux_,uy_){
  if(rooms[ux_]){
    if(rooms[ux_][uy_]){
      return rooms[ux_][uy_] ;
    }
    else{
      var room_tmp = new room_object('Nothingness') ;
      add_room(room_tmp, ux_, uy_) ;
      return rooms[ux_][uy_] ;
    }
  }
  var room_tmp = new room_object('Nothingness') ;
  add_room(room_tmp, ux_, uy_) ;
  return rooms[ux_][uy_] ;
}

function change_room(){
  room = get_room(ux,uy) ;
  for(var i=0 ; i<room.monsters.length ; i++){
    room.monsters[i].alive = true ;
  }
  if(Get('h2_room_name'    )) Get('h2_room_name'    ).innerHTML = room.name ;
  if(Get('input_room_name' )) Get('input_room_name' ).value     = room.name ;
  if(Get('span_room_coords')) Get('span_room_coords').innerHTML = '(' + ux + ',' + uy + ')' ;
  
  var string = '' ;
  for(var i=0 ; i<rooms.length ; i++){
    for(var j=0 ; j<rooms[i].length ; j++){
      string += rooms[i][j].code() ;
    }
  }
  if(Get('textarea_room_code')) Get('textarea_room_code').value = string ;
  
}

function Get(id){ return document.getElementById(id) ; }
function Create(type){ return document.createElement(type) ; }
function sign(x){
  if(Math.abs(x)<tolerance) return 0 ;
  return (x>0) ? 1 : -1 ;
}
function abs(x){ return Math.abs(x) ; }

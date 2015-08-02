<?php

$title = 'Room Explorer | Editor' ;
$tagline = 'Edit that room!' ;
$stylesheets = array('style.css') ;
$js_scripts = array() ;

$js_scripts[] = 'js/helper.js' ;
$js_scripts[] = 'js/settings.js' ;
$js_scripts[] = 'js/controls.js' ;
$js_scripts[] = 'js/base.js' ;
$js_scripts[] = 'js/polygon.js' ;
$js_scripts[] = 'js/room_data.js' ;
$js_scripts[] = 'js/draw.js' ;
$js_scripts[] = 'js/monsters.js' ;
$js_scripts[] = 'js/doors.js' ;
include_once($_SERVER['FILE_PREFIX'] . '/_core/preamble.php') ;
?>  
  <p>
    <select id="select_text_align">
      <option name="left">left</option>
      <option name="center">center</option>
      <option name="right">right</option>
    </select>
    <input id="input_text_size" type="text" value="20"/>px 
    <input id="submit_add_text" type="submit" value="Add text"/>
  </p>
  <h2><input id="input_room_name" value=""><input type="submit" id="submit_change_room_name" value="Change room name"/> <span id="span_room_coords"></h2>
  <table>
    <tbody>
      <tr>
        <td>
          <table id="table_canvas_wrapper">
            <tbody>
              <tr>
                <td id="td_NW"></td>
                <td id="td_N" ></td>
                <td id="td_NE"></td>
              </tr>
              <tr>
                <td id="td_W"></td>
                <td id="td_middle"><canvas id="canvas_game" width="500" height="500"></canvas></td>
                <td id="td_E"></td>
              </tr>
              <tr>
                <td id="td_SW"></td>
                <td id="td_S" ></td>
                <td id="td_SE"></td>
              </tr>
            </tbodyy>
          </table>
        </td>
        <td>
          <table>
            <tbody>
              <tr><th>x</th><td id="td_x"></td></tr>
              <tr><th>y</th><td id="td_y"></td></tr>
              <tr><th>ux</th><td id="td_ux"></td></tr>
              <tr><th>uy</th><td id="td_uy"></td></tr>
              <tr><th>x_mouse_down</th><td id="td_x_mouse_down"></td></tr>
              <tr><th>y_mouse_down</th><td id="td_y_mouse_down"></td></tr>
              <tr><th>x_mouse_move</th><td id="td_x_mouse_move"></td></tr>
              <tr><th>y_mouse_move</th><td id="td_y_mouse_move"></td></tr>
              <tr><th>x_mouse_out </th><td id="td_x_mouse_out" ></td></tr>
              <tr><th>y_mouse_out </th><td id="td_y_mouse_out" ></td></tr>
              <tr><th>x_mouse_up  </th><td id="td_x_mouse_up"  ></td></tr>
              <tr><th>y_mouse_up  </th><td id="td_y_mouse_up"  ></td></tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
  <textarea id="textarea_room_code" rows="10" cols="80"></textarea>
  
<?php foot() ; ?>
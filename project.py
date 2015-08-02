from project_module import project_object, image_object, link_object, challenge_object

p = project_object('explorer_game', 'Room explorer game')
p.domain = 'http://www.aidansean.com/'
p.path = 'explorer_game'
p.preview_image    = image_object('%s/images/project.jpg'   %p.path, 150, 250)
p.preview_image_bw = image_object('%s/images/project_bw.jpg'%p.path, 150, 250)
p.folder_name = 'aidansean'
p.github_repo_name = 'explorer_game'
p.mathjax = False
p.tags = 'Games'
p.technologies = 'canvas,CSS,HTML,JavaScript'
p.links.append(link_object(p.domain, p.path, 'Live page'))
p.introduction = 'This project is a game where the player explores rooms with a top down view and does all the normal things, such as traverse mazes, open doors, fight monsters and so on.  This is a gravity-less version of the <a href="">Platform game</a> and has an even more retro feel to it.  It\'s obviously a work in progress and needs a lot more work, but the main mechanics are complete and it even has its own editor.'
p.overview = '''The game works mostly through simple collision detection.  This differs from the platform game in that is has moving enemies that can be killed through shooting.  Given that it's in the development phase it's lacking any coherent narrative, but one day when I get time I'll come back to this game and add a lot more to it and make it much more interesting.

The game has an editor where the developer draws lines onto the canvas to define where the walls are.  There are some features that need to be added to the editor, such as choosing the line colour, and being able to move vertices around or break up lines.

Unlike the platform game, this game uses procedurally drawn graphics.  This was quite fun to write!'''

p.challenges.append(challenge_object('This game requires fairly robust collision detection.', 'Collision detector has to consider two different cases in this game: the intersection of lines and the intersection of rectangles.  For recangles it\'s easy enough but for lines I needed to write an algorithms to check the overlap.  Once I had this I could use it in other projects.  The number of potential collisions scales with the number of lines in each room, so I tried to minimise the number of lines to something sensible for gameplay reasons.', 'Resolved'))

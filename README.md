Staff Paper
===========

staff_paper is a JavaScript library for rendering simple music notation in the browser. It uses the Raphaël vector graphics library for cross-browser compatible graphics.

It is currently in pre-release, and the API will likely change often.

#Usage

Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/penmanglewood/staff_paper/master/bin/staff-paper.min.js
[max]: https://raw.github.com/penmanglewood/staff_paper/master/bin/staff-paper.js 

In your web page:

###1. Import Raphael and StaffPaper.

```html
<script src="path/to/raphael-min.js"></script>
<script src="path/to/staff-paper.min.js"></script>
```

###2. Create your staff paper. Create an empty div for the paper, give it an id, and pass the id to the StaffPaper constructor.

```html
<script type="text/javascript">
  var paper = new StaffPaper('canvas', 800);
</script>
<body>
  <div id="canvas"></div>
</body>
```

###3. Add a staff

```
var gclef = paper.addStaff("g"); //addStaff takes one parameter: clef. Takes "g", "f", or nothing for no clef.
```

###4. Add notes to the staff

Since the staff can take any clef, notes are added not by letter name, but by index number, according to the figure below:
  
0      ----------------------------------------------------  
1  
2      ----------------------------------------------------  
3  
4      ----------------------------------------------------  
5  
6      ----------------------------------------------------  
7  
8      ----------------------------------------------------  
  
Each staff supports up to two leger lines above and below. Their index numbers are an extension of the numbers in the figure above. For example, if the staff above had a treble clef,  C4's (middle C) index number would be 10. A5 (first leger line above the staff) would be -2.

```
gclef.addNote(10); //Add middle C
gclef.addNote(8); //Add E
gclef.addNote(6); //Add G
```
  
#Development

1. Fork this project

2. Initialize the submodules

  ```
  git submodule init
  git submodule update
  ```

3. Install grunt

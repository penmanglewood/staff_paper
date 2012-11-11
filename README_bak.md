Staff Paper
===========

staff_paper is a JavaScript library for rendering simple music notation in the browser. It uses the Raphaël vector graphics library for cross-browser compatible graphics.

It is currently in pre-release, and will remain undocumented for a while longer until the library takes shape.

#Usage

Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/penmanglewood/staff_paper/master/bin/staff-paper.min.js
[max]: https://raw.github.com/penmanglewood/staff_paper/master/bin/staff-paper.js 

In your web page:

```html
<script src="path/to/raphael-min.js"></script>
<script src="path/to/staff-paper.min.js"></script>
<script type="text/javascript">
  staff = new StaffPaper('canvas', 800);
</script>
<body>
  <div id="canvas"></div>
</body>
```

#Development

1. Fork this project

2. Initialize the submodules

```
git submodule init
git submodule update
```

3. Install grunt
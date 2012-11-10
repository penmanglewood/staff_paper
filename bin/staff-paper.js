/*! Staff Paper - v0.1.0 - 2012-11-09
* Copyright (c) 2012 Eric Rubio; Licensed MIT */

var StaffPaper;
window.StaffPaper = StaffPaper;
(function() {

  StaffPaper = function(container_id, width, options) {
    if (!options) {
      options = {};
    }
    
    this.options = options;
    this.options.lineSpacing = parseInt(options.lineSpacing, 10) || 20; //The amount of pixel space between each staff line
    this.options.noteSpacing = parseInt(options.noteSpacing, 10) || 10; //The space between notes on the staff
    this.options.padding = parseInt(options.padding, 10) || 40; //The amount of pixel space above and below the staff

    this.container_id = container_id;
    this.width = parseInt(width, 10);
    this.height = (this.options.lineSpacing * 4) + (this.options.padding * 2);
    this.notes = []; //The collection of Note objects that are currently on screen.
    this.staves = []; //The collection of Staff objects for this StaffPaper
    this.ui = {}; //The object that will hold all the Raphael UI elements or sets

    this.paper = new Raphael(this.container_id, this.width, this.height);

    this.noteYMap = {};
    //TODO where does this map belong?
    this.noteYMap[1] = { f: this.options.padding, 
                        e: this.options.padding + (this.options.lineSpacing * 0.5), 
                        d: this.options.padding + this.options.lineSpacing, 
                        c: this.options.padding + (this.options.lineSpacing * 1.5)};
    this.noteYMap[0] = { b: this.options.padding + (this.options.lineSpacing * 2), 
                        a: this.options.padding + (this.options.lineSpacing * 2.5), 
                        g: this.options.padding + (this.options.lineSpacing * 3), 
                        f: this.options.padding + (this.options.lineSpacing * 3.5), 
                        e: this.options.padding + (this.options.lineSpacing * 4), 
                        d: this.options.padding + (this.options.lineSpacing * 4.5),
                        c: this.options.padding + (this.options.lineSpacing * 5)};
  };

  /**
  * Adds a note to the staff
  ***/
  StaffPaper.prototype.addNote = function(noteName, octave) {

    //TODO move to rendering code
    // var noteVRad = Math.floor(this.options.lineSpacing * 0.5 - 2),
    //     noteHRad = Math.floor(noteVRad * 1.375),
    //     noteStartX = 40;

    //TODO move to rendering code
    //var noteX = noteStartX + (this.notes.length * ((noteHRad + noteHRad) + this.options.noteSpacing));

    //TODO move to rendering code
    //this.paper.ellipse(noteX, this.getYPosForNote(noteName, octave), noteHRad, noteVRad).attr({fill: '#000'}).rotate(-25);

    this.notes.push(new Note(noteName));
  };

  StaffPaper.prototype.addStaff = function(clef, octave) {
    this.staves.push(new Staff(clef, octave));
  };

  //Gets the y position for the note name
  StaffPaper.prototype.getYPosForNote = function(noteName, octave) {
    return this.noteYMap[octave][noteName.toLowerCase()];
  };

  /************************
  RENDERING
  *************************/

  /**
  * Renders the staff according to the current data
  ***/
  StaffPaper.prototype.draw = function() {
    if (this.paper !== undefined) {
      throw new Error("Call init() only once");
    }

    var staffPath = "";
    for (var i = 0, newY = this.options.padding; i < 5; i++, newY += this.options.lineSpacing) {
      staffPath += "M0 " + newY.toString() + "L" + this.width + " " + newY.toString();
    }

    this.ui.bg = this.paper.rect(0, 0, this.width, this.height, 4).attr({fill: "#efefef", stroke: "none"});
    //this.ui.staves = this.paper.path(staffPath).attr({stroke: '#888', 'stroke-width': 2});
  };

  /**
  * Removes all the graphics and resets the data
  **/
  StaffPaper.prototype.clear = function() {
    this.notes = [];
    this.staves = [];
    this.ui = {};
    this.paper.clear();
  };

  /************************
  Internal objects
  *************************/

  /**
  * Note object
  *
  * name - the note name. a-g. Use # for sharps and the lowercase letter b for flats
  * value - the metrical value of the note: 1 - whole, 2 - half, 4 - quarter, 8 - eighth...
  **/
  var Note = function(name, value, octave) {
    this.name = name || "";
    this.value = parseInt(value, 10) || 4;
    this.octave = octave || "";
  };

  /**
  * Note object
  *
  * clef - the clef of the staff. 'g', 'f', or blank
  * octave - The number of octaves to raise or lower the staff. Defaults to 0, which means no transposition.
  **/
  var Staff = function(clef, octave) {
    this.clef = clef || "";
    var octDelta = parseInt(octave, 10) || 0;
    if (this.clef === "g") {
      this.octave = 4 + octave; //The common g-clef staff is known as octave 4. e.g. C4
    } else if (this.clef === "f") {
      this.octave = 3 + octave; //The common f-clef staff is known as octave 3. e.g. B3
    }
  };

})(StaffPaper);
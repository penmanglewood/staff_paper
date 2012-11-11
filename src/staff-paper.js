var StaffPaper;
window.StaffPaper = StaffPaper;
(function() {

  StaffPaper = function(container_id, width, options) {
    if (!options) {
      options = {};
    }
    
    this.options = options;
    this.options.lineSpacing = parseInt(options.lineSpacing, 10) || 14; //The amount of pixel space between each staff line
    this.options.noteSpacing = parseInt(options.noteSpacing, 10) || 10; //The space between notes on the staff
    this.options.padding = parseInt(options.padding, 10) || 34; //The amount of pixel space above and below the staff
    this.options.interStaffPadding = parseInt(options.interStaffPadding, 10) || 28; //The amount of space in between each staff

    this.container_id = container_id;
    this.width = parseInt(width, 10);
    this.height = (this.options.lineSpacing * 4) + (this.options.padding * 2);
    this.staves = []; //The collection of Staff objects for this StaffPaper
    this.ui = {staves: []}; //The object that will hold all the Raphael UI elements or sets
    this.drawBG = true; //The flag that stores whether the background needs to be redrawn or not.

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

  StaffPaper.prototype.addStaff = function(clef, octave) {
    var staff = new StaffPaper.Staff(clef, octave);
    this.staves.push(staff);

    return staff;
  };

  //Gets the y position for the note name
  StaffPaper.prototype.getYPosForNote = function(noteName, octave) {
    return this.noteYMap[octave][noteName.toLowerCase()];
  };

  StaffPaper.prototype.staffPathWithYOffset = function(yOffset) {
    var sp = "";
    for (var i = 0, newY = yOffset; i < 5; i++, newY += this.options.lineSpacing) {
      sp += "M0 " + newY.toString() + "L" + this.width + " " + newY.toString();
    }

    return sp;
  };

  /************************
  RENDERING
  *************************/

  /**
  * Renders the staff according to the current data
  ***/
  StaffPaper.prototype.draw = function() {

    //Draw BG
    if (this.drawBG) {
      this.drawBG = false;

      var staffHeight = this.options.lineSpacing * 4;
      this.height = ((staffHeight * this.staves.length) + (this.options.interStaffPadding * (this.staves.length - 1))) + (this.options.padding * 2);

      this.paper.setSize(this.width, this.height);

      this.ui.bg = this.paper.rect(0, 0, this.width, this.height, 4).attr({fill: "#efefef", stroke: "none"});

      var yOffset = this.options.padding;
      for (var i = 0; i < this.staves.length; i++) {
        this.ui.staves.push(this.paper.path(this.staffPathWithYOffset(yOffset)).attr({stroke: '#888', 'stroke-width': 2}));
        yOffset += staffHeight + this.options.interStaffPadding;
      }
    }

    //Draw notes
    //TODO move to rendering code
    // var noteVRad = Math.floor(this.options.lineSpacing * 0.5 - 2),
    //     noteHRad = Math.floor(noteVRad * 1.375),
    //     noteStartX = 40;

    //TODO move to rendering code
    //var noteX = noteStartX + (this.notes.length * ((noteHRad + noteHRad) + this.options.noteSpacing));

    //TODO move to rendering code
    //this.paper.ellipse(noteX, this.getYPosForNote(noteName, octave), noteHRad, noteVRad).attr({fill: '#000'}).rotate(-25);
  };

  /**
  * Removes all the graphics and resets the data
  **/
  StaffPaper.prototype.clear = function() {
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
  * duration - the metrical value of the note: 1 - whole, 2 - half, 4 - quarter, 8 - eighth... Defaults to 4.
  * octave - the octave of the note
  **/
  StaffPaper.Note = function(name, duration, octave) {
    this.name = name || "";
    this.duration = parseInt(duration, 10) || 4;
    this.octave = octave;
  };

  /**
  * Note object
  *
  * clef - the clef of the staff. 'g', 'f', or blank
  * octave - The number of octaves to raise or lower the staff. Defaults to 0, which means no transposition.
  **/
  StaffPaper.Staff = function(clef, octave) {
    this.clef = clef || "";
    this.notes = [];

    var octDelta = parseInt(octave, 10) || 0;
    if (this.clef === "g") {
      this.octave = 4 + octDelta; //The common g-clef staff is known as octave 4. e.g. C4
    } else if (this.clef === "f") {
      this.octave = 2 + octDelta; //The common f-clef staff is known as octave 3. e.g. G2
    }
  };

  /**
  * Adds a note to a staff
  *
  * noteIndex - The integer value of the line or space to add the note to.
  *             Each staff supports two leger lines above and below the
  *             staff, and their noteIndex values can be calculated by adding
  *             or subtracting from the boundary values. The chart below
  *             shows the values for the main staff. For example, if the staff
  *             below had a treble clef, the noteIndex value for middle C
  *             would be 11. If it were bass clef, middle C would be -2.
  *
  * Values    Staff
  *
  *    0      -------------
  *    1
  *    2      -------------
  *    3
  *    4      -------------
  *    5
  *    6      -------------
  *    7
  *    8      -------------
  ***/
  StaffPaper.Staff.prototype.addNote = function(noteIndex, duration) {
    var noteInfo = StaffPaper.getNoteInfo(this, noteIndex);
    var noteDuration = parseInt(duration, 10) || 4;

    this.notes.push(new StaffPaper.Note(noteInfo.name, noteDuration, noteInfo.octave));
  };

  StaffPaper.getNoteInfo = function(staff, noteIndex) {
    var name = "";
    var octave = staff.octave;

    if (staff.clef === "g") {

      if (noteIndex <= -4) {
        octave = 6;
      } else if (noteIndex >= -3 && noteIndex <= 3) {
        octave = 5;
      } else if (noteIndex >= 11) {
        octave = 3;
      }

      switch (noteIndex) {
        case -6: name = "E"; break;
        case -5: name = "D"; break;
        case -4: name = "C"; break;
        case -3: name = "B"; break;
        case -2: name = "A"; break;
        case -1: name = "G"; break;
        case 0: name = "F"; break;
        case 1: name = "E"; break;
        case 2: name = "D"; break;
        case 3: name = "C"; break;
        case 4: name = "B"; break;
        case 5: name = "A"; break;
        case 6: name = "G"; break;
        case 7: name = "F"; break;
        case 8: name = "E"; break;
        case 9: name = "D"; break;
        case 10: name = "C"; break;
        case 11: name = "B"; break;
        case 12: name = "A"; break;
      }
    } else if (staff.clef === "f") {
      if (noteIndex <= -2) {
        octave = 4;
      } else if (noteIndex <= 5) {
        octave = 3;
      }

      switch (noteIndex) {
        case -4: name = "E"; break;
        case -3: name = "D"; break;
        case -2: name = "C"; break;
        case -1: name = "B"; break;
        case 0: name = "A"; break;
        case 1: name = "G"; break;
        case 2: name = "F"; break;
        case 3: name = "E"; break;
        case 4: name = "D"; break;
        case 5: name = "C"; break;
        case 6: name = "B"; break;
        case 7: name = "A"; break;
        case 8: name = "G"; break;
        case 9: name = "F"; break;
        case 10: name = "E"; break;
        case 11: name = "D"; break;
        case 12: name = "C"; break;
      }
    }

    return {name: name, octave: octave};
  };

})(StaffPaper);
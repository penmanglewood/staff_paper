/*global QUnit:false, module:false, test:false, asyncTest:false, expect:false*/
/*global start:false, stop:false ok:false, equal:false, notEqual:false, deepEqual:false*/
/*global notDeepEqual:false, strictEqual:false, notStrictEqual:false, raises:false*/
(function() {

  /*
    ======== A Handy Little QUnit Reference ========
    http://docs.jquery.com/QUnit

    Test methods:
      expect(numAssertions)
      stop(increment)
      start(decrement)
    Test assertions:
      ok(value, [message])
      equal(actual, expected, [message])
      notEqual(actual, expected, [message])
      deepEqual(actual, expected, [message])
      notDeepEqual(actual, expected, [message])
      strictEqual(actual, expected, [message])
      notStrictEqual(actual, expected, [message])
      raises(block, [expected], [message])
  */

  module('StaffPaper', {
    setup: function() {
      this.paper = new StaffPaper('qunit-fixture', 800);
    }
  });

  test('setup', function() {
    equal(this.paper.constructor, StaffPaper, "should be a valid StaffPaper object");
  });

  module('Clear StaffPaper', {
    setup: function() {
      this.paper = new StaffPaper('qunit-fixture', 800);
    }
  });

  test('should reset all data', 3, function(){
    var gclef = this.paper.addStaff("g");
    var fclef = this.paper.addStaff("f");
    strictEqual(this.paper.staves.length, 2, "should have two staves");
    gclef.addNote(3);
    gclef.addNote(2);
    gclef.addNote(3);
    strictEqual(gclef.notes.length, 3, "should have 3 notes on g clef");

    this.paper.clear();

    strictEqual(this.paper.staves.length, 0, "should have 0 staves");
  });

  module('Staves', {
    setup: function() {
      this.paper = new StaffPaper('qunit-fixture', 800);
    }
  });

  test('g clef staff', function() {
    var staff = this.paper.addStaff("g");
    strictEqual(this.paper.staves.length, 1, "length should be 1");
    strictEqual(staff.clef, 'g', "clef should be g");
  });

  test('blank staff', function() {
    var staff = this.paper.addStaff();
    strictEqual(this.paper.staves.length, 1, "length should be 1");
    strictEqual(staff.clef, '', "clef should be an empty string");
  });

  test('g clef staff', function() {
    var staff = this.paper.addStaff("g");
    strictEqual(this.paper.staves.length, 1, "length should be 1");
    strictEqual(staff.clef, 'g', "clef should be g");
    strictEqual(staff.octave, 4, "octave should be 4");
  });

  test('f clef staff', function() {
    var staff = this.paper.addStaff("f");
    strictEqual(this.paper.staves.length, 1, "length should be 1");
    strictEqual(staff.clef, 'f', "clef should be f");
    strictEqual(staff.octave, 3, "octave should be 3");
  });

  module('Notes on one staff', {
    setup: function() {
      this.paper = new StaffPaper('qunit-fixture', 800);
      this.staff = this.paper.addStaff("g");
    },
    teardown: function() {
      this.paper.clear();
      this.paper = null;
    }
  });

  test('should be F5', 4, function() {
    this.paper.addNote(0, 0);
    strictEqual(this.staff.notes.length, 1, "length should be 1");
    strictEqual(this.staff.notes[0].name, "F", "name should be F");
    strictEqual(this.staff.notes[0].octave, 5, "octave should be 5");
    strictEqual(this.staff.notes[0].duration, 4, "duration should be 4");
  });

  test('should be E5', 4, function() {
    this.paper.addNote(0, 1);
    strictEqual(this.staff.notes.length, 1, "length should be 1");
    strictEqual(this.staff.notes[0].name, "E", "name should be E");
    strictEqual(this.staff.notes[0].octave, 5, "octave should be 5");
    strictEqual(this.staff.notes[0].duration, 4, "duration should be 4");
  });

  test('should be D5', 4, function() {
    this.paper.addNote(0, 2);
    strictEqual(this.staff.notes.length, 1, "length should be 1");
    strictEqual(this.staff.notes[0].name, "D", "name should be D");
    strictEqual(this.staff.notes[0].octave, 5, "octave should be 5");
    strictEqual(this.staff.notes[0].duration, 4, "duration should be 4");
  });

  test('should be C5', 4, function() {
    this.paper.addNote(0, 3);
    strictEqual(this.staff.notes.length, 1, "length should be 1");
    strictEqual(this.staff.notes[0].name, "C", "name should be C");
    strictEqual(this.staff.notes[0].octave, 5, "octave should be 5");
    strictEqual(this.staff.notes[0].duration, 4, "duration should be 4");
  });

  test('should be B4', function() {
    this.paper.addNote(0, 4);
    strictEqual(this.staff.notes.length, 1, "length should be 1");
    strictEqual(this.staff.notes[0].name, "B", "name should be B");
    strictEqual(this.staff.notes[0].octave, 4, "octave should be 4");
    strictEqual(this.staff.notes[0].duration, 4, "duration should be 4");
  });

  test('should be A4', function() {
    this.paper.addNote(0, 5);
    strictEqual(this.staff.notes.length, 1, "length should be 1");
    strictEqual(this.staff.notes[0].name, "A", "name should be A");
    strictEqual(this.staff.notes[0].octave, 4, "octave should be 4");
    strictEqual(this.staff.notes[0].duration, 4, "duration should be 4");
  });

  test('should be G4', function() {
    this.paper.addNote(0, 6);
    strictEqual(this.staff.notes.length, 1, "length should be 1");
    strictEqual(this.staff.notes[0].name, "G", "name should be G");
    strictEqual(this.staff.notes[0].octave, 4, "octave should be 4");
    strictEqual(this.staff.notes[0].duration, 4, "duration should be 4");
  });

  test('should be F4', function() {
    this.paper.addNote(0, 7);
    strictEqual(this.staff.notes.length, 1, "length should be 1");
    strictEqual(this.staff.notes[0].name, "F", "name should be F");
    strictEqual(this.staff.notes[0].octave, 4, "octave should be 4");
    strictEqual(this.staff.notes[0].duration, 4, "duration should be 4");
  });

  test('should be E4', function() {
    this.paper.addNote(0, 8);
    strictEqual(this.staff.notes.length, 1, "length should be 1");
    strictEqual(this.staff.notes[0].name, "E", "name should be E");
    strictEqual(this.staff.notes[0].octave, 4, "octave should be 4");
    strictEqual(this.staff.notes[0].duration, 4, "duration should be 4");
  });

  test('should be D4', function() {
    this.paper.addNote(0, 9);
    strictEqual(this.staff.notes.length, 1, "length should be 1");
    strictEqual(this.staff.notes[0].name, "D", "name should be D");
    strictEqual(this.staff.notes[0].octave, 4, "octave should be 4");
    strictEqual(this.staff.notes[0].duration, 4, "duration should be 4");
  });

  test('should be C4', function() {
    this.paper.addNote(0, 10);
    strictEqual(this.staff.notes.length, 1, "length should be 1");
    strictEqual(this.staff.notes[0].name, "C", "name should be C");
    strictEqual(this.staff.notes[0].octave, 4, "octave should be 4");
    strictEqual(this.staff.notes[0].duration, 4, "duration should be 4");
  });

  test('should be B3', function() {
    this.paper.addNote(0, 11);
    strictEqual(this.staff.notes.length, 1, "length should be 1");
    strictEqual(this.staff.notes[0].name, "B", "name should be B");
    strictEqual(this.staff.notes[0].octave, 3, "octave should be 3");
    strictEqual(this.staff.notes[0].duration, 4, "duration should be 4");
  });

  test('should be A3', function() {
    this.paper.addNote(0, 12);
    strictEqual(this.staff.notes.length, 1, "length should be 1");
    strictEqual(this.staff.notes[0].name, "A", "name should be A");
    strictEqual(this.staff.notes[0].octave, 3, "octave should be 3");
    strictEqual(this.staff.notes[0].duration, 4, "duration should be 4");
  });

}(StaffPaper));

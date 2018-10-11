const generators = require("yeoman-generator");
const { hasForbiddenCharacters, slugify } = require("../../helpers");

module.exports = generators.Base.extend({
  // The name `constructor` is important here
  constructor: function() {
    // Calling the super constructor is important so our generator is correctly set up
    generators.Base.apply(this, arguments);
  },

  prompting: function() {
    var questions = [
      {
        type: "input",
        name: "name",
        message:
          "What's the workout's name? (e.g. Syntax, Data Structures, Basics, etc.)",
        validate: (answer = "") =>
          (answer.length < 3 &&
            "Workout name must have at least 3 characters") ||
          (hasForbiddenCharacters(answer) &&
            "Workout name must have no forbidden characters") ||
          true
      }
    ];

    return this.prompt(questions).then(answers => {
      this.answers = answers;
      return Promise.resolve();
    });
  },

  writing: function() {
    this.fs.copyTpl(
      this.templatePath("workout.md"),
      this.destinationPath(slugify(this.answers.name) + "/README.md"),
      this.answers
    );
  }
});

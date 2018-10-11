const generators = require("yeoman-generator");
const { hasForbiddenCharacters, slugify } = require("../../helpers");

module.exports = generators.Base.extend({
  // The name `constructor` is important here
  constructor: function() {
    // Calling the super constructor is important so our generator is correctly set up
    generators.Base.apply(this, arguments);
  },

  prompting: function() {
    return this.prompt([
      {
        type: "input",
        name: "name",
        message: "What's the topic's name? (e.g. CSharp, JavaScript)",
        validate: (answer = "") =>
          (answer.length < 3 && "Topic name must have at least 3 characters") ||
          (hasForbiddenCharacters(answer) &&
            "Topic name must have no forbidden characters") ||
          true
      },
      {
        type: "input",
        name: "language",
        message:
          "What's the topic's language? (e.g. bash, sql, javascript, etc.)",
        validate: (answer = "") =>
          (answer.length < 1 &&
            "Topic language must have at least 1 character") ||
          (hasForbiddenCharacters(answer) &&
            "Topic language must have no forbidden characters") ||
          true
      },
      {
        type: "input",
        name: "color",
        message: "What's the topic's color (in hex)?",
        validate: function(answer) {
          if (answer.length !== 6) {
            return "Need to be in the shape of `xxxxxx` (without #)";
          }
          return true;
        }
      }
    ]).then(answers => {
      this.answers = answers;
      return Promise.resolve();
    });
  },

  writing: function() {
    this.fs.copyTpl(
      this.templatePath("topic.md"),
      this.destinationPath(slugify(this.answers.name) + "/README.md"),
      this.answers
    );
  }
});

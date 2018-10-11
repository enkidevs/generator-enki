const generators = require("yeoman-generator");

module.exports = generators.Base.extend({
  initializing: function() {
    return this.prompt([
      {
        type: "list",
        name: "subGenerator",
        message: "What type of content would you like to create?",
        choices: [
          { name: "A topic", value: "topic" },
          { name: "A course", value: "course" },
          { name: "A workout", value: "workout" },
          { name: "An insight, game or exercise", value: "insight" }
        ],
        default: 4
      }
    ]).then(answers => {
      switch (answers.subGenerator) {
        case "topic":
          this.composeWith("enki:topic");
          break;
        case "course":
          this.composeWith("enki:course");
          break;
        case "workout":
          this.composeWith("enki:workout");
          break;
        case "insight":
        default:
          this.composeWith("enki:insight");
      }
      return Promise.resolve();
    });
  }
});

const generators = require("yeoman-generator");
const { URL } = require("url");
const { hasForbiddenCharacters, slugify } = require("../../helpers");

module.exports = generators.Base.extend({
  constructor: function() {
    generators.Base.apply(this, arguments);
  },

  prompting: function() {
    return this.prompt([
      {
        type: "input",
        name: "username",
        message: "What's your Enki username?",
        store: true
      },
      {
        type: "input",
        name: "headline",
        message:
          "What's the insight's title (headline)? (e.g. 'How to use the Queue data structure?')",
        validate: answer =>
          (!answer && "Missing title") ||
          (answer.length < 4 &&
            "Headline is too short (must be longer than 4 characters).") ||
          (answer.length > 120 &&
            "Title is too long (must be less than 120 characters).") ||
          (hasForbiddenCharacters(answer) &&
            "Title must not contain forbidden characters") ||
          true
      },
      {
        type: "checkbox",
        name: "levels",
        message: "Select the relevant levels:",
        choices: ["beginner", "basic", "medium", "advanced"],
        validate: function(answer) {
          if (answer.length === 0) {
            return "Select at least one level.";
          }
          return true;
        }
      },
      {
        type: "checkbox",
        name: "aspects",
        message: "Select the relevant aspects:",
        choices: ["introduction", "new", "workout", "deep", "obscura"],
        validate: function(answer) {
          if (answer.length === 0) {
            return "Select at least one aspect.";
          }
          return true;
        }
      },
      {
        type: "list",
        name: "type",
        message: "Type of content:",
        choices: [
          { name: "Insight", value: "insight" },
          { name: "Game", value: "game" },
          { name: "Exercise", value: "exercise" }
        ],
        default: 0
      },
      {
        type: "list",
        name: "gameType",
        message: "Type of game:",
        choices: [
          "tetris",
          "refactor",
          "evaluateThis",
          "fillTheGap",
          "bugSpot",
          "bugScroll"
        ],
        when: function(answers) {
          return answers.type === "game";
        }
      },
      {
        type: "list",
        name: "linkType",
        message: "Type of Exercise:",
        choices: [
          "website",
          "github",
          "glitch",
          "exercism",
          "codewars",
          "sqlfiddle",
          "codepen"
        ],
        when: function(answers) {
          return answers.type === "exercise";
        }
      },
      {
        type: "input",
        name: "link",
        message: "Link to Exercise",
        validate: function(answer) {
          try {
            if (new URL(answer).host) {
              return true;
            }
          } catch (e) {
            return e;
          }
        },
        when: function(answers) {
          return answers.type === "exercise";
        }
      },
      {
        type: "list",
        name: "category",
        message: "Category of the insight:",
        choices: [
          "must-know",
          "best practice",
          "feature",
          "how to",
          "pattern",
          "caveats",
          "hack"
        ],
        when: function(answers) {
          return answers.type === "insight";
        }
      }
    ]).then(answers => {
      this.answers = answers;
    });
  },

  writing: function() {
    console.log(this.answers.type);
    const fileName = `${this.answers.type}.md`;
    let destinationPathName = slugify(this.answers.headline);

    switch (this.answers.type) {
      case "insight":
        this.answers.type = "normal";
        break;
      case "game":
        this.answers.type = this.answers.gameType;
        break;
      case "exercise":
        this.answers.type = "exercise";
        destinationPathName = `practice-${destinationPathName}`
        break;
    }
    this.fs.copyTpl(
      this.templatePath(fileName),
      this.destinationPath(destinationPathName + ".md"),
      this.answers
    );
  }
});

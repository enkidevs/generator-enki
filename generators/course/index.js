const generators = require("yeoman-generator");
const { slugify, hasForbiddenCharacters } = require("../../helpers");

module.exports = generators.Base.extend({
  // The name `constructor` is important here
  constructor: function() {
    // Calling the super constructor is important so our generator is correctly set up
    generators.Base.apply(this, arguments);
  },

  prompting: function() {
    let questions = [
      {
        type: "input",
        name: "name",
        message: "What's the course's name? (e.g. React, Fundamentals, etc.)",
        validate: (answer = "") =>
          (answer.length < 3 &&
            "Course name must have at least 3 characters") ||
          (hasForbiddenCharacters(answer) &&
            "Course name must have no forbidden characters") ||
          true
      },
      {
        type: "list",
        name: "core",
        message: "Is this the first course in the topic? (i.e. core course)",
        choices: [
          {
            name: "yes",
            value: true
          },
          {
            name: "no",
            value: false
          }
        ]
      },
      {
        type: "list",
        name: "hasNext",
        message: "Is this course followed by another one? (i.e. next course)",
        choices: [
          {
            name: "yes",
            value: true
          },
          {
            name: "no",
            value: false
          }
        ]
      },
      {
        type: "input",
        name: "nextTopicSlug",
        message: "What's the next course's topic slug? (e.g. javascript, etc.)",
        validate: (answer = "") =>
          (answer.length < 3 && "Topic slug must have at least 3 characters") ||
          (hasForbiddenCharacters(answer) &&
            "Course slug must have no forbidden characters") ||
          true,
        when: answers => !!answers.hasNext
      },
      {
        type: "input",
        name: "nextCourseSlug",
        message:
          "What's the next course's slug? (e.g. angular, fundamentals etc.)",
        validate: (answer = "") =>
          (answer.length < 3 &&
            "Course slug must have at least 3 characters") ||
          (hasForbiddenCharacters(answer) &&
            "Course slug must have no forbidden characters") ||
          true,
        when: answers => !!answers.hasNext && !!answers.nextTopicSlug
      }
    ];

    return this.prompt(questions).then(
      ({
        hasNext = false,
        nextTopicSlug = "",
        nextCourseSlug = "",
        ...answers
      }) => {
        const nextSection = !hasNext
          ? ""
          : `next:\n\t- ${slugify(nextTopicSlug)}:${slugify(nextCourseSlug)}`;
        this.answers = { ...answers, nextSection };
        return Promise.resolve();
      }
    );
  },

  writing: function() {
    this.fs.copyTpl(
      this.templatePath("course.md"),
      this.destinationPath(slugify(this.answers.name) + "/README.md"),
      this.answers
    );
  }
});

const generators = require('yeoman-generator')

module.exports = generators.Base.extend({
  // The name `constructor` is important here
  constructor: function () {
    // Calling the super constructor is important so our generator is correctly set up
    generators.Base.apply(this, arguments)
  },

  prompting: function () {
    return this.prompt([{
      type: 'input',
      name: 'name',
      message: 'What\'s the subtopic\'s name?'
    }]).then(function (answers) {
      this.answers = answers
    }.bind(this))
  },

  writing: function () {
    this.fs.copyTpl(
      this.templatePath('subtopic.md'),
      this.destinationPath(this.answers.name.replace(/#/g, 'sharp') + '/README.md'),
      this.answers
    )
  }
})

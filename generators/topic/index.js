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
      message: 'What\'s the topic\'s name?'
    }, {
      type: 'input',
      name: 'language',
      message: 'What\'s the topic\'s language?'
    }, {
      type: 'input',
      name: 'deviconsClass',
      message: 'What\'s the topic\'s devicons class?',
      validate: function (answer) {
        if (answer.indexOf('devicons-') !== 0) {
          return 'Need to start with `devicons-`'
        }
        return true
      }
    }, {
      type: 'input',
      name: 'color',
      message: 'What\'s the topic\'s color (in hex)?',
      validate: function (answer) {
        if (answer.length !== 7) {
          return 'Need to be in the shape of `#xxxxxx`'
        }
        return true
      }
    }]).then(function (answers) {
      this.answers = answers
    }.bind(this))
  },

  writing: function () {
    this.fs.copyTpl(
      this.templatePath('topic.md'),
      this.destinationPath(this.answers.name.replace(/#/g, 'sharp') + '/README.md'),
      this.answers
    )
  }
})

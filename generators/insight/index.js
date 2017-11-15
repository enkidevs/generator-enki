const generators = require('yeoman-generator')
const toSlugCase = require('to-slug-case')

module.exports = generators.Base.extend({
  // The name `constructor` is important here
  constructor: function () {
    // Calling the super constructor is important so our generator is correctly set up
    generators.Base.apply(this, arguments)
  },

  prompting: function () {
    return this.prompt([{
      type: 'input',
      name: 'username',
      message: 'What\'s your Enki username?',
      store: true
    }, {
      type: 'input',
      name: 'headline',
      message: 'What\'s the insight\'s headline?',
      validate: function (answer) {
        if (!answer) {
          return 'Missing headline.'
        }
        if (answer.length < 4) {
          return 'Headline is too short (must be longer than 4 characters).'
        }
        if (answer.length > 120) {
          return 'Title is too long (must be less than 120 characters).'
        }
        return true
      }
    }, {
      type: 'checkbox',
      name: 'levels',
      message: 'Select the relevant levels:',
      choices: ['beginner', 'basic', 'medium', 'advanced'],
      validate: function (answer) {
        if (answer.length === 0) {
          return 'Select at least one level.'
        }
        return true
      }
    },
    {
      type: 'checkbox',
      name: 'aspects',
      message: 'Select the relevant aspects:',
      choices: ['introduction', 'new', 'workout', 'deep', 'obscura'],
      validate: function (answer) {
        if (answer.length === 0) {
          return 'Select at least one aspect.'
        }
        return true
      }
    }, {
      type: 'list',
      name: 'type',
      message: 'Type of content:',
      choices: ['Insight', 'Game'],
      default: 0
    }, {
      type: 'list',
      name: 'gameType',
      message: 'Type of game:',
      choices: ['tetris', 'refactor', 'evaluateThis', 'fillTheGap', 'bugSpot', 'bugScroll'],
      when: function (answers) {
        return answers.type === 'Game'
      }
    }, {
      type: 'list',
      name: 'category',
      message: 'Category of the insight:',
      choices: ['must-know', 'best practice', 'feature', 'how to', 'pattern', 'caveats', 'hack'],
      when: function (answers) {
        return answers.type === 'Insight'
      }
    }]).then(function (answers) {
      this.answers = answers
    }.bind(this))
  },

  writing: function () {
    const fileName = this.answers.type + '.md'
    this.answers.type = this.answers.type === 'Insight' ? 'normal' : this.answers.gameType
    this.fs.copyTpl(
      this.templatePath(fileName),
      this.destinationPath(toSlugCase(this.answers.headline) + '.md'),
      this.answers
    )
  }
})

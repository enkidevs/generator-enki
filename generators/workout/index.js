const generators = require('yeoman-generator')
const yaml = require('js-yaml')
const fs = require('fs')
const path = require('path')
const toSlugCase = require('to-slug-case')

const typeMap = {
	'Insights list': 'insights-list',
	'Game': 'game',
	'Quiz': 'quiz'
}

module.exports = generators.Base.extend({
  // The name `constructor` is important here
  constructor: function () {
    // Calling the super constructor is important so our generator is correctly set up
    generators.Base.apply(this, arguments)
		this.sections = []
		try {
			this.sections = yaml.safeLoad(fs.readFileSync(path.join(process.cwd(), 'README.md'), 'utf8')).sections
			console.log(this.sections)
		} catch (e) {
			console.log(e)
		}
  },

  prompting: function () {
		var questions = [{
      type: 'input',
      name: 'name',
      message: 'What\'s the workout\'s name?'
    }, {
      type: 'list',
      name: 'type',
      message: 'Type of workout:',
      choices: ['Insights list'],
      default: 0
    }, {
      type: 'confirm',
      name: 'hasParent',
      message: 'Is this workout following another one?',
      default: false
    }, {
      type: 'input',
      name: 'parent',
      message: 'What\'s the slug of the parent workout?',
      when: function (answers) {
        return answers.hasParent
      }
    }]

		if (this.sections && this.sections.length) {
			questions.push({
				type: 'list',
				name: 'section',
				message: 'In which section is this workout?',
				choices: this.sections.concat('In no section'),
				default: 0
			})
		}
    return this.prompt(questions).then(function (answers) {
      this.answers = answers
    }.bind(this))
  },

  writing: function () {
		this.answers.section = typeof this.sections.indexOf(this.answers.section) !== undefined ? this.sections.indexOf(this.answers.section) : -1
		this.answers.type = typeMap[this.answers.type]
    this.fs.copyTpl(
      this.templatePath('workout.md'),
      this.destinationPath(toSlugCase(this.answers.name) + '/README.md'),
      this.answers
    )
  }
})

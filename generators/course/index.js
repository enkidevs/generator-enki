const generators = require('yeoman-generator')

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
      message: 'What\'s the course\'s name?'
    }, {
      type: 'input',
      name: 'name',
      message: 'How many sections in this course?'
    }]



    return this.prompt([]).then(function (answers) {
      this.answers = answers
    }.bind(this))
  },

  writing: function () {
		this.answers.section = typeof this.sections.indexOf(this.answers.section) !== undefined ? this.sections.indexOf(this.answers.section) : -1
    this.fs.copyTpl(
      this.templatePath('course.md'),
      this.destinationPath(this.answers.name.replace(/#/g, 'sharp') + '/README.md'),
      this.answers
    )
  }
})

const _ = require('lodash');
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const askName = require('inquirer-npm-name');
const path = require('path');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(`Welcome to the delightful ${chalk.red('generator-daojs')} generator!`));

    const prompts = [{
      type: 'input',
      name: 'description',
      message: 'Describe your project',
      default: '',
    }];

    this.props = {};

    return askName({
      name: 'name',
      default: path.basename(process.cwd()),
    }, this)
      .then((answer) => {
        _.assign(this.props, answer);
        return this.prompt(prompts);
      })
      .then(props => _.assign(this.props, props));
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('*'),
      this.destinationPath('.'),
      this.props,
    );
    this.fs.copyTpl(
      this.templatePath('engine/**/*'),
      this.destinationPath('engine'),
      this.props,
    );
    this.fs.copyTpl(
      this.templatePath('ui/**/*'),
      this.destinationPath('ui'),
      this.props,
    );
    this.fs.copy(
      this.templatePath('img/**/*'),
      this.destinationPath('img'),
    );
    _.forEach([
      '.babelrc',
      '.eslintrc.yaml',
    ], name => this.fs.copy(this.templatePath(name), this.destinationPath(name)));
  }
};

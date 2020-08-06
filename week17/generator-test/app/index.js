var Generator = require('yeoman-generator');

module.exports = class extends Generator {
    // The name `constructor` is important here
    constructor(args, opts) {
      // Calling the super constructor is important so our generator is correctly set up
      super(args, opts);
  
      // Next, add your custom code
      // this.option('babel'); // This method adds support for a `--babel` flag
      // this.helperMethod = function () {
      //   console.log('won\'t be called automatically');
      // };
    }
    // method1() {
    //   console.log('hey 1');
    // }

    // _private_method() {
    //   console.log('private hey');
    // }
    async prompting() {
      this.answers = await this.prompt([{
        type    : 'input',
        name    : 'title',
        message : 'Your project title',
      }]);
    }

    // installingLodash() {
    //   this.npmInstall(['lodash'], { 'save-dev': true });
    // }

    writing() {
      /*const pkgJson = {
        dependencies: {
          [this.dependencies.name]: '*'
        }
      };
  
      // Extend or create package.json file in destination path
      this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);*/
      this.fs.copyTpl(
        this.templatePath('index.html'),
        this.destinationPath('public/index.html'),
        { title: this.answers.title } // user answer `title` used
      );
    }

    
      
  
   /* install() {
      this.npmInstall();
    }*/
  };

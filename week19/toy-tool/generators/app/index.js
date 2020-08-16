var Generator = require('yeoman-generator');

module.exports = class extends Generator {
    constructor(args, opts) {
        // Calling the super constructor is important so our generator is correctly set up
        super(args, opts);
    
        // Next, add your custom code
        // this.option('babel'); // This method adds support for a `--babel` flag
      }
    collecting(){
        this.log("collecting!")
    }
    creating(){
        this.fs.copyTpl(
            this.templatePath('package.json'),
            this.destinationPath('package.json'),
            { title: 'Templating with Yeoman' }
          );
          this.fs.copyTpl(
            this.templatePath('createElement.js'),
            this.destinationPath('lib/createElement.js')
          );
          this.fs.copyTpl(
            this.templatePath('gusture.js'),
            this.destinationPath('lib/gusture.js')
          );
          this.fs.copyTpl(
            this.templatePath('main.js'),
            this.destinationPath('src/main.js')
          );
          this.fs.copyTpl(
            this.templatePath('index.html'),
            this.destinationPath('src/index.html')
          );
          this.fs.copyTpl(
            this.templatePath('webpack.config.js'),
            this.destinationPath('webpack.config.js')
          );
          
        this.npmInstall(['webpack',
        'webpack-cli',
        'webpack-dev-server',
        "@babel/core",
        "@babel/plugin-transform-react-jsx",
        "@babel/preset-env",
        "@babel/register",
        "babel-loader",
        "mocha",
        "@istanbuljs/nyc-config-babel",
        "babel-plugin-istanbul",
        "nyc"
    ], { 'save-dev': true });
        // this.fs.copyTpl(
        //     this.templatePath('index.html'),
        //     this.destinationPath('public/index.html'),
        //     { title: 'Templating with Yeoman' }
        //   );
    }
};
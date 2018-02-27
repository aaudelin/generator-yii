var Generator = require('yeoman-generator');
const upperCamelCase = require('uppercamelcase');


module.exports = class extends Generator {


    constructor(args, opts) {
        // Calling the super constructor is important so our generator is correctly set up
        super(args, opts);

        this.creationMethod = function(templateName, name, data, type) {
            this.fs.copyTpl(
                this.templatePath(templateName),
                this.destinationPath('public/' + this.options.pathName + '/' + name + type + '.php'), data
            );
        };

        this.parseName = function(path) {
            return upperCamelCase(path);
        }


    }
}
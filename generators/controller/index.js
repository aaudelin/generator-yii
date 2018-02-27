var Generator = require('yeoman-generator');
const upperCamelCase = require('uppercamelcase');

class ControllerGenerator extends Generator {


    constructor(args, opts) {
        // Calling the super constructor is important so our generator is correctly set up
        super(args, opts);

        this.creationControllerMethod = function(templateName, controllerName, dataController) {
            this.fs.copyTpl(
                this.templatePath(templateName),
                this.destinationPath('public/' + this.options.pathName + '/' + controllerName + 'Controller.php'), dataController
            );
        };

        this.parseAdvertiserName = function(controllerPath) {
            return upperCamelCase(controllerPath);
        }


    }
}

module.exports = class extends ControllerGenerator {
    prompting() {
        if (!this.options.crud) {
            return this.prompt([{
                type: 'input',
                name: 'name',
                message: 'Your controller name (example : AdvertiserController)',
                default: this.parseAdvertiserName(this.options.pathName)
            }]).then((answers) => {
                this.controllerName = answers.name;
                this.log('Generating controller ', this.controllerName + '.php');
            });
        } else {
            this.controllerName = this.parseAdvertiserName(this.options.pathName);
            this.prefix = this.options.prefix;
            this.saasRight = this.options.saasRight;
            this.enableSearch = this.options.enableSearch;

        }
        return true;
    }

    writing() {
        this.creationControllerMethod('Controller.php', this.controllerName, {
        	'controllerName': this.controllerName,
            'prefix': this.prefix,
            'saasRight': this.saasRight,
            'enableSearch': this.enableSearch}
        	);
    }


};
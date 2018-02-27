var Generator = require('yeoman-generator');

class CrudGenerator extends Generator {


    constructor(args, opts) {
        // Calling the super constructor is important so our generator is correctly set up
        super(args, opts);

        this.creationUrlManager = function() {
            this.fs.copyTpl(
                this.templatePath('urlManager.php'),
                this.destinationPath('public/' + this.controllerName + '/urlManager.php'), {
                    controller: this.controllerName,
                    prefix: this.prefix,
                    saasRight: this.saasRight,
                    method: this.method,
                    pluralize: this.pluralize,

                }
            );
        };

    }
}

module.exports = class extends CrudGenerator {
    end() {
        this.composeWith(require.resolve('../controller'), {
            crud: true,
            pathName: this.controllerName,
            prefix: this.prefix,
            saasRight: this.saasRight,
            method: this.method,

        });
    }

    prompting() {
        return this.prompt([{
                type: 'input',
                name: 'name',
                message: 'Your controller name (example : advertiser-creative)'
            }, {
                type: 'input',
                name: 'prefix',
                message: 'The prefix of the URL (example : )',
                default: '/advertisers/\<advid:\\\\d+\>'
            }, {
                type: 'confirm',
                name: 'saasRight',
                message: 'Check that the logged user has access to saas ?',
                default: true
            }, {
                type: 'input',
                name: 'method',
                message: 'The methods matching the http method inside the controller',
                default: 'index'
            },
            {
                type: 'confirm',
                name: 'pluralize',
                message: 'Do you want the URL to be pluralized (example : /advertiser-creatives)',
                default: true
            },


        ]).then((answers) => {
            this.controllerName = answers.name;
            this.prefix = answers.prefix;
            this.saasRight = answers.saasRight;
            this.method = answers.method;
            this.pluralize = answers.pluralize;
            this.log('Generating crud ');
        });
    }

    writing() {
        this.creationUrlManager();
    }


};
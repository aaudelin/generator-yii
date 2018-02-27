var Generator = require('yeoman-generator');



class MyBase extends Generator {
    helper() {
        console.log('methods on the parent generator won\'t be called automatically');
    }

    constructor(args, opts) {
        // Calling the super constructor is important so our generator is correctly set up
        super(args, opts)

        this.helperMethod = function() {
            console.log('method in constructor won\'t be called automatically');
        };

        // Argument in the command line, needs to be inside the constructor
        this.argument('appname', { type: String, required: true });

        // Option used to display more information ou chang the config
        this.option('coffee');


    }

}

module.exports = class extends MyBase {

    end() {
        this.log('That is done');
    }

    exec() {
        this.helper();
        this.helperMethod();
    }


    _private_method() {
        console.log('private method and appname ' + this.options.appname);
        console.log('private method and coffee ' + this.options.coffee);
    }

    method1() {
        this._private_method();
    }

    writing() {
        this.fs.copyTpl(
            this.templatePath('index.html'),
            this.destinationPath('public/index.html'), { title: this.options.appname }
        );
    }



};
var Generator = require('yeoman-generator');
const upperCamelCase = require('uppercamelcase');
const BaseGenerator = require('../base-generator');

module.exports = class extends BaseGenerator {
    prompting() {
        if (!this.options.crud) {
            return this.prompt([{
                type: 'input',
                name: 'name',
                message: 'Your controller name (example : Advertiser)',
                default: this.parseName(this.options.pathName)
            }]).then((answers) => {
                this.name = answers.name;
                this.log('Generating controller ', this.name + '.php');
            });
        } else {
            this.name = this.parseName(this.options.pathName);
            this.advertiserPrefix = this.options.advertiserPrefix;
            this.saasRight = this.options.saasRight;
            this.enableSearch = this.options.enableSearch;

        }
        return true;
    }

    writing() {
        this.creationMethod('Controller.php', this.name, {
        	'name': this.name,
            'advertiserPrefix': this.advertiserPrefix,
            'saasRight': this.saasRight,
            'enableSearch': this.enableSearch},
            'Controller'
        	);
    }


};
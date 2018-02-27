var Generator = require('yeoman-generator');
const upperCamelCase = require('uppercamelcase');
const BaseGenerator = require('../base-generator');


module.exports = class extends BaseGenerator {
    prompting() {
        if (!this.options.crud) {
            return this.prompt([{
                type: 'input',
                name: 'name',
                message: 'Your config name (example : Advertiser)',
                default: this.parseName(this.options.pathName)
            }]).then((answers) => {
                this.name = answers.name;
                this.log('Generating config ', this.name + '.php');
            });
        } else {
            this.name = this.parseName(this.options.pathName);
            this.advertiserPrefix = this.options.advertiserPrefix;
            this.saasRight = this.options.saasRight;
            this.enableSearch = this.options.enableSearch;

            return this.prompt([{
                    type: 'input',
                    name: 'field',
                    message: 'One database field to search for',
                },
                {
                    type: 'input',
                    name: 'typeField',
                    message: 'The type of the field',
                },
                {
                    type: 'confirm',
                    name: 'webScenario',
                    message: 'Use web scenario ?',
                    default: true
                },
                {
                    type: 'confirm',
                    name: 'cliScenario',
                    message: 'Use cli scenario ?',
                    default: true
                }

            ]).then((answers) => {
                this.field = answers.field;
                this.typeField = answers.typeField;
                this.webScenario = answers.webScenario;
                this.cliScenario = answers.cliScenario;
            });

        }
    }

    writing() {
        this.creationMethod('Config.php', this.name, {
                'name': this.name,
                'advertiserPrefix': this.advertiserPrefix,
                'saasRight': this.saasRight,
                'enableSearch': this.enableSearch,
                'tableName': this.tableName,
                'tableId': this.tableId,
                'field': this.field,
                'typeField': this.typeField,
                'webScenario': this.webScenario,
                'cliScenario': this.cliScenario
            },
            'Config'
        );
    }


};
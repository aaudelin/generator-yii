var Generator = require('yeoman-generator');
const upperCamelCase = require('uppercamelcase');
const BaseGenerator = require('../base-generator');


module.exports = class extends BaseGenerator {
    prompting() {
        if (!this.options.crud) {
            return this.prompt([{
                type: 'input',
                name: 'name',
                message: 'Your query name (example : Advertiser)',
                default: this.parseName(this.options.pathName)
            }]).then((answers) => {
                this.name = answers.name;
                this.log('Generating Query ', this.name + '.php');
            });
        } else {
            this.name = this.parseName(this.options.pathName);
            this.advertiserPrefix = this.options.advertiserPrefix;
            this.saasRight = this.options.saasRight;
            this.enableSearch = this.options.enableSearch;

            return this.prompt([{
                type: 'input',
                name: 'tableName',
                message: 'The main object table in database (example : advertiser_property)',
            },
            {
                type: 'input',
                name: 'tableId',
                message: 'The ID of the main table',
                default: 'id'
            }

            ]).then((answers) => {
                this.tableName = answers.tableName;
                this.tableId = answers.tableId;
            });

        }
    }

    writing() {
        this.creationMethod('Query.php', this.name, {
        	'name': this.name,
            'advertiserPrefix': this.advertiserPrefix,
            'saasRight': this.saasRight,
            'enableSearch': this.enableSearch,
            'tableName': this.tableName,
            'tableId': this.tableId },
            'Query'
        	);
    }


};
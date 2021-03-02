const prompt = require('async-prompt');

module.exports = async function() {


        console.log('1) clients');
        console.log('2) drivers');
        console.log('3) trips');
        console.log();
        await prompt('Enter table: ').then(choice=> {
            console.log(choice);
            console.log();

            if (choice < 1 && choice > 3) {
                console.error("\nWRONG INPUT\n");
            }

            switch (choice) {
                case 1:
                    return 'clients';
                case 2:
                    return 'drivers';
                case 3:
                    return 'trips';
                default:
                    break;
            }
        })



};

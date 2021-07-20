const argv = require('./argv');

module.exports = parseInt(process.env.PORT || argv.port || '3000', 10);

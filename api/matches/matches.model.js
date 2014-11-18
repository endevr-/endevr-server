var bookshelf = require('../../config/db');

var Matches = bookshelf.Model.extend({
  tableName: 'matches',
});

module.exports = Matches;
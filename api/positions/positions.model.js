var bookshelf = require('../../config/db');

var Position = bookshelf.Model.extend({
  tableName: 'positions',

  developers: function() {
    return this.hasMany(Developers).through('matches');
  }

});

module.exports = Position;
var bookshelf = require('bookshelf')(knex);

var Position = bookshelf.Model.extend({
  tableName: 'positions',

  developers: function() {
    return this.hasMany(Developers).through('matches');
  }

});
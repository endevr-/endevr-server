var bookshelf = require('bookshelf')(knex);

var Employer = bookshelf.Model.extend({
  tableName: 'employers'

  positions: function() {
    return this.hasMany(Positions).through('positions');
  }

});
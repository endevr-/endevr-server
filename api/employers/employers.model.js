var bookshelf = require('../../config/db');

var Employer = bookshelf.Model.extend({
  tableName: 'employers',

  positions: function() {
    return this.hasMany(Positions).through('positions');
  }

});

module.exports = Employer;

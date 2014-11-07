var bookshelf = require('../../config/db');

var Developer = bookshelf.Model.extend({
  tableName: 'developers',

  positions: function() {
    return this.hasMany(Positions).through('matches');
  }

});
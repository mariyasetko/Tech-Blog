const User = require('./User');
const Posts = require('./Posts');

User.hasMany(Posts, {
    foreignKey: 'creator_id',
    onDelete: 'CASCADE'
});

Posts.belongsTo(User, {
    foreignKey: 'creator_id'
});

module.exports = { User, Posts };

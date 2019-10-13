module.exports = (sequelize, Sequelize) => {
    const Content = sequelize.define('content', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING
        },
        done: {
            type: Sequelize.BOOLEAN,
            default: false
        },
		content: {
            type: Sequelize.TEXT
        },
        priority: {
            type: Sequelize.STRING,
            default: 'low'
        },
        user_id: {
            type: Sequelize.INTEGER
        },

    });

    return Content;
}

module.exports = function (sequelize, DataTypes) {
    var Menu = sequelize.define("Fooditem", {
        item_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        price: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
            allowNull: false
        },
        sales: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: true
        },
        createdAt: {
            type: DataTypes.DATE(3),
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP(3)')
        },
        updatedAt: {
            type: DataTypes.DATE(3),
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP(3)')
        }
    });
    return Menu;
}
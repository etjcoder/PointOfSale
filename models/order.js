module.exports = function (sequelize, DataTypes) {
    var Order = sequelize.define("Order", {
        orderSummary: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        sales: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
            allowNull: false
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
    return Order;
}
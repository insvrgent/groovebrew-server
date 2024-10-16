"use strict";

module.exports = (sequelize, DataTypes) => {
  const DailyReport = sequelize.define(
    "DailyReport",
    {
      dailyReportId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      reportDate: {
        type: DataTypes.DATEONLY, // Use DATEONLY for a date without time
        allowNull: false,
      },
      cafeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Cafe", // Name of the table in the database
          key: "cafeId",
        },
      },
      favoriteItemId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "Item", // Name of the table in the database
          key: "itemId",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL", // Or adjust based on your needs
      },
      totalIncome: {
        type: DataTypes.DECIMAL(10, 2), // Precision and scale for decimal values
        allowNull: false,
      },
      transactionCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      materialMutationIds: {
        type: DataTypes.STRING, // Consider using TEXT if the string can be very long
        allowNull: true,
      },
      otherFavorites: {
        type: DataTypes.STRING, // Comma-separated list of item IDs
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "DailyReport", // Ensures table name is used as-is
      freezeTableName: true,
      timestamps: true, // Ensure timestamps are enabled
    }
  );

  DailyReport.associate = function (models) {
    DailyReport.belongsTo(models.Cafe, { foreignKey: "cafeId" });
    DailyReport.belongsTo(models.Item, { foreignKey: "favoriteItemId" });
    // If you need to reference other items in 'otherFavorites',
    // you might need a more complex relationship, e.g., through a junction table
    // or handle it separately.
  };

  return DailyReport;
};

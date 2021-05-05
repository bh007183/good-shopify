module.exports = function (sequelize, DataTypes) {
    const Image = sequelize.define("Image", {
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      title:{
        type: DataTypes.STRING,
        allowNull: false,
      },

      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      public:{
          type: DataTypes.BOOLEAN,
          
      }

    });
    Image.associate = function (models){
        Image.belongsTo(models.User, {foreignKeyConstraint: true, onDelete: 'cascade'})
    }
    return Image
  };
  
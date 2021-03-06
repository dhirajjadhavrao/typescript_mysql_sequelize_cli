import {
  Model,
  DataTypes,
  UUIDV4,
  Sequelize
} from 'sequelize';

interface UserAttributes {
  id:string,
  name:string,
  email:string,
  password:string
}

module.exports = (sequelize: any ) => {
  class User extends Model<UserAttributes> 
      implements UserAttributes {
    id!: string;
    name!: string;
    email!: string;
    password!: string;
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
      User.belongsToMany(models.Project, {
        through: "ProjectAssignments"
      })
    }
  };


  User.init({
    id:{
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email:{
      type: DataTypes.STRING,
      allowNull:true
    },
    password:{
      type: DataTypes.STRING,
      allowNull:true
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
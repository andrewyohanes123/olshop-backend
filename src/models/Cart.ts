import Sequelize from 'sequelize';
import { SequelizeAttributes } from './typings/SequelizeAttributes';
import { Factory } from './typings/ModelInterface';
import ModelFactoryInterface from './typings/ModelFactoryInterface';

export interface CartAttributes {
	id?: number;
  quantity: number;
  user_id?: number;
  item_id?: number;
	created_at?: Date;
	updated_at?: Date;
}

export interface CartInstance extends Sequelize.Instance<CartAttributes>, CartAttributes {
}

export interface Associate {
	(models: ModelFactoryInterface): void;
}

export const CartFactory: Factory<CartInstance, CartAttributes> = (
	sequelize: Sequelize.Sequelize,
	DataTypes: Sequelize.DataTypes,
): Sequelize.Model<CartInstance, CartAttributes> => {
	const attributes: SequelizeAttributes<CartAttributes> = {
    quantity: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      defaultValue: 1
    }
	};
	const Cart: Sequelize.Model<CartInstance, CartAttributes> = sequelize.define<
		CartInstance,
		CartAttributes
	>('cart', attributes, { underscored: true });

	Cart.associate = (models: ModelFactoryInterface): void => {
		Cart.belongsTo(models.User, { onDelete: 'cascade' });
		Cart.belongsTo(models.Item, { onDelete: 'cascade' });
	};

	return Cart;
};

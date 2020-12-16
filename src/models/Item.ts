import Sequelize from 'sequelize';
import { SequelizeAttributes } from './typings/SequelizeAttributes';
import { Factory } from './typings/ModelInterface';
import ModelFactoryInterface from './typings/ModelFactoryInterface';

export interface ItemAttributes {
	id?: number;
  name: string;
  price: number;
  description: string;
  category_id?: number;
  store_front_id?: number;
  shop_id?: number;
  user_id?: number;
	created_at?: Date;
	updated_at?: Date;
}

export interface ItemInstance extends Sequelize.Instance<ItemAttributes>, ItemAttributes {
}

export interface Associate {
	(models: ModelFactoryInterface): void;
}

export const ItemFactory: Factory<ItemInstance, ItemAttributes> = (
	sequelize: Sequelize.Sequelize,
	DataTypes: Sequelize.DataTypes,
): Sequelize.Model<ItemInstance, ItemAttributes> => {
	const attributes: SequelizeAttributes<ItemAttributes> = {
		name: {
			type: DataTypes.STRING(191),
			allowNull: false,
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    }
	};
	const Item: Sequelize.Model<ItemInstance, ItemAttributes> = sequelize.define<
		ItemInstance,
		ItemAttributes
	>('item', attributes, { underscored: true });

	Item.associate = (models: ModelFactoryInterface): void => {
    Item.belongsTo(models.Store, { onDelete: 'cascade' });
    Item.belongsTo(models.User, { onDelete: 'cascade' });
    Item.belongsTo(models.Category, { onDelete: 'cascade' });
    Item.hasMany(models.ItemPicture, { onDelete: 'cascade' });
    Item.hasMany(models.ItemComment, { onDelete: 'cascade' });
    Item.hasMany(models.ItemReview, { onDelete: 'cascade' })
	};

	return Item;
};

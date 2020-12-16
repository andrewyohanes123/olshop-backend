import Sequelize from 'sequelize';
import { SequelizeAttributes } from './typings/SequelizeAttributes';
import { Factory } from './typings/ModelInterface';
import ModelFactoryInterface from './typings/ModelFactoryInterface';

export interface ItemPictureAttributes {
	id?: number;
	picture: string;
	created_at?: Date;
	updated_at?: Date;
}

export interface ItemPictureInstance extends Sequelize.Instance<ItemPictureAttributes>, ItemPictureAttributes {
}

export interface Associate {
	(models: ModelFactoryInterface): void;
}

export const ItemPictureFactory: Factory<ItemPictureInstance, ItemPictureAttributes> = (
	sequelize: Sequelize.Sequelize,
	DataTypes: Sequelize.DataTypes,
): Sequelize.Model<ItemPictureInstance, ItemPictureAttributes> => {
	const attributes: SequelizeAttributes<ItemPictureAttributes> = {
		picture: {
			type: DataTypes.TEXT,
			allowNull: false,
		}
	};
	const ItemPicture: Sequelize.Model<ItemPictureInstance, ItemPictureAttributes> = sequelize.define<
		ItemPictureInstance,
		ItemPictureAttributes
	>('item_picture', attributes, { underscored: true });

	ItemPicture.associate = (models: ModelFactoryInterface): void => {
		ItemPicture.belongsTo(models.Item, { onDelete: 'cascade' });
	};

	return ItemPicture;
};

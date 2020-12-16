import Sequelize from 'sequelize';
import { SequelizeAttributes } from './typings/SequelizeAttributes';
import { Factory } from './typings/ModelInterface';
import ModelFactoryInterface from './typings/ModelFactoryInterface';

export interface ItemCommentAttributes {
	id?: number;
  content: string;
  item_id?: number;
  user_id?: number;
	created_at?: Date;
	updated_at?: Date;
}

export interface ItemCommentInstance extends Sequelize.Instance<ItemCommentAttributes>, ItemCommentAttributes {
}

export interface Associate {
	(models: ModelFactoryInterface): void;
}

export const ItemCommentFactory: Factory<ItemCommentInstance, ItemCommentAttributes> = (
	sequelize: Sequelize.Sequelize,
	DataTypes: Sequelize.DataTypes,
): Sequelize.Model<ItemCommentInstance, ItemCommentAttributes> => {
	const attributes: SequelizeAttributes<ItemCommentAttributes> = {
		content: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
	};
	const ItemComment: Sequelize.Model<ItemCommentInstance, ItemCommentAttributes> = sequelize.define<
		ItemCommentInstance,
		ItemCommentAttributes
	>('item_comment', attributes, { underscored: true });

	ItemComment.associate = (models: ModelFactoryInterface): void => {
    ItemComment.belongsTo(models.User, { onDelete: 'cascade' });    
    ItemComment.belongsTo(models.Item, { onDelete: 'cascade' });    
    ItemComment.hasMany(models.ItemCommentReply, { onDelete: 'cascade' });    
	};

	return ItemComment;
};

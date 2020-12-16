import Sequelize from 'sequelize';
import { SequelizeAttributes } from './typings/SequelizeAttributes';
import { Factory } from './typings/ModelInterface';
import ModelFactoryInterface from './typings/ModelFactoryInterface';

export interface ItemCommentReplyAttributes {
	id?: number;
  content: string;
  user_id?: number;
  item_comment_id?: number;
	created_at?: Date;
	updated_at?: Date;
}

export interface ItemCommentReplyInstance extends Sequelize.Instance<ItemCommentReplyAttributes>, ItemCommentReplyAttributes {
}

export interface Associate {
	(models: ModelFactoryInterface): void;
}

export const ItemCommentReplyFactory: Factory<ItemCommentReplyInstance, ItemCommentReplyAttributes> = (
	sequelize: Sequelize.Sequelize,
	DataTypes: Sequelize.DataTypes,
): Sequelize.Model<ItemCommentReplyInstance, ItemCommentReplyAttributes> => {
	const attributes: SequelizeAttributes<ItemCommentReplyAttributes> = {
		content: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
	};
	const ItemCommentReply: Sequelize.Model<ItemCommentReplyInstance, ItemCommentReplyAttributes> = sequelize.define<
		ItemCommentReplyInstance,
		ItemCommentReplyAttributes
	>('item_comment_reply', attributes, { underscored: true });

	ItemCommentReply.associate = (models: ModelFactoryInterface): void => {
		ItemCommentReply.belongsTo(models.User, { onDelete: 'cascade' });
		ItemCommentReply.belongsTo(models.ItemComment, { onDelete: 'cascade' });
	};

	return ItemCommentReply;
};

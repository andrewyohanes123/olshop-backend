import Sequelize from 'sequelize';
import { UserInstance, UserAttributes } from '../User';
import { TokenInstance, TokenAttributes } from '../Token';
import { ItemAttributes, ItemInstance } from '../Item';
import { ItemPictureAttributes, ItemPictureInstance } from '../ItemPicture';
import { StoreAttributes, StoreInstance } from '../Store';
import { CategoryAttributes, CategoryInstance } from '../Category';
import { ItemCommentAttributes, ItemCommentInstance } from '../ItemComment';
import { ItemCommentReplyAttributes, ItemCommentReplyInstance } from '../ItemCommentReply';
import { CartAttributes, CartInstance } from '../Cart';
import { TransactionAttributes, TransactionInstance } from '../Transaction';
import { ItemReviewAttributes, ItemReviewInstance } from '../ItemReview';

interface Obj {
	[s: string]: any;
}

export default interface ModelFactoryInterface extends Obj {
	sequelize: Sequelize.Sequelize;
	Sequelize: Sequelize.SequelizeStatic;
	User: Sequelize.Model<UserInstance, UserAttributes>;
	Token: Sequelize.Model<TokenInstance, TokenAttributes>;
	Item: Sequelize.Model<ItemInstance, ItemAttributes>;
	ItemPicture: Sequelize.Model<ItemPictureInstance, ItemPictureAttributes>;
	Store: Sequelize.Model<StoreInstance, StoreAttributes>;
	Category: Sequelize.Model<CategoryInstance, CategoryAttributes>;
	ItemComment: Sequelize.Model<ItemCommentInstance, ItemCommentAttributes>;
	ItemCommentReply: Sequelize.Model<ItemCommentReplyInstance, ItemCommentReplyAttributes>;
	Cart: Sequelize.Model<CartInstance, CartAttributes>;
	Transaction: Sequelize.Model<TransactionInstance, TransactionAttributes>;
	ItemReview: Sequelize.Model<ItemReviewInstance, ItemReviewAttributes>;
}

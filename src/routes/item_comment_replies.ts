
import express from 'express';
import ModelFactoryInterface from '../models/typings/ModelFactoryInterface';
import { Routes } from './typings/RouteInterface';
import a from '../middlewares/wrapper/a';
import { OkResponse } from './typings/BodyBuilderInterface';
import { PaginatedResult } from './typings/QueryInterface';
import sequelize from 'sequelize';
import { Parser } from '../helpers/Parser';
import NotFoundError from '../classes/NotFoundError';
import { ItemCommentReplyInstance, ItemCommentReplyAttributes } from '../models/ItemCommentReply';

const itemcommentreplysRoutes: Routes = (
    app: express.Application,
    models: ModelFactoryInterface,
): express.Router => {
    const router: express.Router = express.Router();

    router.get(
        '/',
        Parser.validateQ(),
        a(
            async (req: express.Request, res: express.Response): Promise<void> => {
                const parsed: sequelize.FindOptions<ItemCommentReplyInstance> = Parser.parseQuery<ItemCommentReplyInstance>(
                    (req.query as any).q,
                    models,
                );
                const data: PaginatedResult<ItemCommentReplyInstance> = await models.ItemCommentReply.findAndCountAll(parsed);
                const body: OkResponse = { data };

                res.json(body);
            },
        ),
    );

    router.get(
        '/:id',
        a(
            async (req: express.Request, res: express.Response): Promise<void> => {
                const { id }: any = req.params;
                const itemcommentreply: ItemCommentReplyInstance | null = await models.ItemCommentReply.findByPk(id);
                if (!itemcommentreply) throw new NotFoundError('ItemCommentReply tidak ditemukan');
                const body: OkResponse = { data: itemcommentreply };

                res.json(body);
            },
        ),
    );

    router.post(
        '/',
        // validation,
        a(
            async (req: express.Request, res: express.Response): Promise<void> => {
                const attributes: ItemCommentReplyAttributes = req.body;
                const itemcommentreply: ItemCommentReplyInstance = await models.ItemCommentReply.create(attributes);
                const body: OkResponse = { data: itemcommentreply };

                res.json(body);
            },
        ),
    );

    router.put(
        '/:id',
        // validation,
        a(
            async (req: express.Request, res: express.Response): Promise<void> => {
                const { id }: any = req.params;
                const attributes: ItemCommentReplyAttributes = req.body;
                const itemcommentreply: ItemCommentReplyInstance | null = await models.ItemCommentReply.findByPk(id);
                if (!itemcommentreply) throw new NotFoundError('ItemCommentReply tidak ditemukan');
                const updatedItemCommentReply: ItemCommentReplyInstance = await itemcommentreply.update(attributes);
                const body: OkResponse = { data: updatedItemCommentReply };

                res.json(body);
            },
        ),
    );

    router.delete(
        '/:id',
        a(
            async (req: express.Request, res: express.Response): Promise<void> => {
                const { id }: any = req.params;
                const itemcommentreply: ItemCommentReplyInstance | null = await models.ItemCommentReply.findByPk(id);
                if (!itemcommentreply) throw new NotFoundError('ItemCommentReply tidak ditemukan');
                await itemcommentreply.destroy();
                const body: OkResponse = { data: itemcommentreply };

                res.json(body);
            },
        ),
    );

    return router;
};

export default itemcommentreplysRoutes;
    
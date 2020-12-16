
import express from 'express';
import ModelFactoryInterface from '../models/typings/ModelFactoryInterface';
import { Routes } from './typings/RouteInterface';
import a from '../middlewares/wrapper/a';
import { OkResponse } from './typings/BodyBuilderInterface';
import { PaginatedResult } from './typings/QueryInterface';
import sequelize from 'sequelize';
import { Parser } from '../helpers/Parser';
import NotFoundError from '../classes/NotFoundError';
import { ItemCommentInstance, ItemCommentAttributes } from '../models/ItemComment';

const itemcommentsRoutes: Routes = (
    app: express.Application,
    models: ModelFactoryInterface,
): express.Router => {
    const router: express.Router = express.Router();

    router.get(
        '/',
        Parser.validateQ(),
        a(
            async (req: express.Request, res: express.Response): Promise<void> => {
                const parsed: sequelize.FindOptions<ItemCommentInstance> = Parser.parseQuery<ItemCommentInstance>(
                    (req.query as any).q,
                    models,
                );
                const data: PaginatedResult<ItemCommentInstance> = await models.ItemComment.findAndCountAll(parsed);
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
                const itemcomment: ItemCommentInstance | null = await models.ItemComment.findByPk(id);
                if (!itemcomment) throw new NotFoundError('ItemComment tidak ditemukan');
                const body: OkResponse = { data: itemcomment };

                res.json(body);
            },
        ),
    );

    router.post(
        '/',
        // validation,
        a(
            async (req: express.Request, res: express.Response): Promise<void> => {
                const attributes: ItemCommentAttributes = req.body;
                const itemcomment: ItemCommentInstance = await models.ItemComment.create(attributes);
                const body: OkResponse = { data: itemcomment };

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
                const attributes: ItemCommentAttributes = req.body;
                const itemcomment: ItemCommentInstance | null = await models.ItemComment.findByPk(id);
                if (!itemcomment) throw new NotFoundError('ItemComment tidak ditemukan');
                const updatedItemComment: ItemCommentInstance = await itemcomment.update(attributes);
                const body: OkResponse = { data: updatedItemComment };

                res.json(body);
            },
        ),
    );

    router.delete(
        '/:id',
        a(
            async (req: express.Request, res: express.Response): Promise<void> => {
                const { id }: any = req.params;
                const itemcomment: ItemCommentInstance | null = await models.ItemComment.findByPk(id);
                if (!itemcomment) throw new NotFoundError('ItemComment tidak ditemukan');
                await itemcomment.destroy();
                const body: OkResponse = { data: itemcomment };

                res.json(body);
            },
        ),
    );

    return router;
};

export default itemcommentsRoutes;
    
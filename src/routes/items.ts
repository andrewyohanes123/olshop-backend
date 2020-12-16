
import express from 'express';
import ModelFactoryInterface from '../models/typings/ModelFactoryInterface';
import { Routes } from './typings/RouteInterface';
import a from '../middlewares/wrapper/a';
import { OkResponse } from './typings/BodyBuilderInterface';
import { PaginatedResult } from './typings/QueryInterface';
import sequelize from 'sequelize';
import { Parser } from '../helpers/Parser';
import NotFoundError from '../classes/NotFoundError';
import { ItemInstance, ItemAttributes } from '../models/Item';

const itemsRoutes: Routes = (
    app: express.Application,
    models: ModelFactoryInterface,
): express.Router => {
    const router: express.Router = express.Router();

    router.get(
        '/',
        Parser.validateQ(),
        a(
            async (req: express.Request, res: express.Response): Promise<void> => {
                const parsed: sequelize.FindOptions<ItemInstance> = Parser.parseQuery<ItemInstance>(
                    (req.query as any).q,
                    models,
                );
                const data: PaginatedResult<ItemInstance> = await models.Item.findAndCountAll(parsed);
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
                const item: ItemInstance | null = await models.Item.findByPk(id);
                if (!item) throw new NotFoundError('Item tidak ditemukan');
                const body: OkResponse = { data: item };

                res.json(body);
            },
        ),
    );

    router.post(
        '/',
        // validation,
        a(
            async (req: express.Request, res: express.Response): Promise<void> => {
                const attributes: ItemAttributes = req.body;
                const item: ItemInstance = await models.Item.create(attributes);
                const body: OkResponse = { data: item };

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
                const attributes: ItemAttributes = req.body;
                const item: ItemInstance | null = await models.Item.findByPk(id);
                if (!item) throw new NotFoundError('Item tidak ditemukan');
                const updatedItem: ItemInstance = await item.update(attributes);
                const body: OkResponse = { data: updatedItem };

                res.json(body);
            },
        ),
    );

    router.delete(
        '/:id',
        a(
            async (req: express.Request, res: express.Response): Promise<void> => {
                const { id }: any = req.params;
                const item: ItemInstance | null = await models.Item.findByPk(id);
                if (!item) throw new NotFoundError('Item tidak ditemukan');
                await item.destroy();
                const body: OkResponse = { data: item };

                res.json(body);
            },
        ),
    );

    return router;
};

export default itemsRoutes;
    
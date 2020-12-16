
import express from 'express';
import ModelFactoryInterface from '../models/typings/ModelFactoryInterface';
import { Routes } from './typings/RouteInterface';
import a from '../middlewares/wrapper/a';
import { OkResponse } from './typings/BodyBuilderInterface';
import { PaginatedResult } from './typings/QueryInterface';
import sequelize from 'sequelize';
import { Parser } from '../helpers/Parser';
import NotFoundError from '../classes/NotFoundError';
import { ItemPictureInstance, ItemPictureAttributes } from '../models/ItemPicture';

const itempicturesRoutes: Routes = (
    app: express.Application,
    models: ModelFactoryInterface,
): express.Router => {
    const router: express.Router = express.Router();

    router.get(
        '/',
        Parser.validateQ(),
        a(
            async (req: express.Request, res: express.Response): Promise<void> => {
                const parsed: sequelize.FindOptions<ItemPictureInstance> = Parser.parseQuery<ItemPictureInstance>(
                    (req.query as any).q,
                    models,
                );
                const data: PaginatedResult<ItemPictureInstance> = await models.ItemPicture.findAndCountAll(parsed);
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
                const itempicture: ItemPictureInstance | null = await models.ItemPicture.findByPk(id);
                if (!itempicture) throw new NotFoundError('ItemPicture tidak ditemukan');
                const body: OkResponse = { data: itempicture };

                res.json(body);
            },
        ),
    );

    router.post(
        '/',
        // validation,
        a(
            async (req: express.Request, res: express.Response): Promise<void> => {
                const attributes: ItemPictureAttributes = req.body;
                const itempicture: ItemPictureInstance = await models.ItemPicture.create(attributes);
                const body: OkResponse = { data: itempicture };

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
                const attributes: ItemPictureAttributes = req.body;
                const itempicture: ItemPictureInstance | null = await models.ItemPicture.findByPk(id);
                if (!itempicture) throw new NotFoundError('ItemPicture tidak ditemukan');
                const updatedItemPicture: ItemPictureInstance = await itempicture.update(attributes);
                const body: OkResponse = { data: updatedItemPicture };

                res.json(body);
            },
        ),
    );

    router.delete(
        '/:id',
        a(
            async (req: express.Request, res: express.Response): Promise<void> => {
                const { id }: any = req.params;
                const itempicture: ItemPictureInstance | null = await models.ItemPicture.findByPk(id);
                if (!itempicture) throw new NotFoundError('ItemPicture tidak ditemukan');
                await itempicture.destroy();
                const body: OkResponse = { data: itempicture };

                res.json(body);
            },
        ),
    );

    return router;
};

export default itempicturesRoutes;
    
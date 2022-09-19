<?php

namespace app\controllers;

use app\models\domain\RepositoryLikeModel;
use app\models\domain\RepositoryModel;
use app\models\domain\UserProfileModel;
use app\models\identity\IdentityUser;
use app\viewmodels\RepositoryCreateViewModel;
use app\viewmodels\RepositoryListViewModel;
use app\viewmodels\RepositoryViewViewModel;
use Yii;
use yii\data\Pagination;
use yii\data\Sort;
use yii\db\Query;
use yii\filters\VerbFilter;
use yii\helpers\ArrayHelper;
use yii\helpers\StringHelper;
use yii\helpers\Url;
use yii\web\Controller;
use yii\web\Response;

class RepositoryController extends Controller
{
    public function behaviors(): array
    {
        return [
            'verbs' => [
                'class' => VerbFilter::class,
                'actions' => [
                    'like' => ['GET', 'POST'],
                ],
            ],
        ];
    }


    public function actionList(string $sort = null): string
    {
        $pages = new Pagination([
            'totalCount' => RepositoryModel::find()->count(),
        ]);
        $pages->route = 'repository/list';
        $pages->defaultPageSize = 10;

        $sorting = new Sort([
            'attributes' => [
                'rating',
            ],
        ]);

        $rawSql = <<< SQL
SELECT *
FROM `repository`
LEFT JOIN (
    SELECT `repositoryid` as `id`, AVG(`rating`) as `rating`
    FROM `repositorylike`
    GROUP BY `id`
) as ratingTemp USING (id)
WHERE `isCreated` == true AND `categories` LIKE :filter
ORDER BY :orders
LIMIT :limit
OFFSET :offset
SQL;
        $rawSql = str_replace(
            ':orders',
            is_null($sort) ? "''" :
                implode(',', array_map(
                    fn($orderKey, $orderValue): string => "`$orderKey` " . ($orderValue === 3 ? 'DESC' : 'ASC'),
                    array_keys($sorting->getOrders()),
                    array_values($sorting->getOrders()))),
            $rawSql);

        $repositories = Yii::$app->db->createCommand($rawSql)
            ->bindValues([
                ':limit' => $pages->getLimit(),
                ':offset' => $pages->getOffset(),
                ':filter' => '%' . Yii::$app->request->get('filter') . '%'
            ])
            ->queryAll(\PDO::FETCH_CLASS);

        return $this->render('list', [
            'models' => $repositories,
            'pagination' => $pages,
            'sort' => $sorting
        ]);
    }

    public function actionView(int $id): string
    {
        $repository = RepositoryModel::findOne($id);
        $identityUser = IdentityUser::findOne(['id' => $repository->userid]);

        $rootPath = Yii::getAlias(Yii::$app->params['git_data'])
            . "/" . $repository->name;

        if (!is_dir($rootPath . "/.git")) {
            return $this->render('notfound', [
                'model' => $repository
            ]);
        }

        if ($repository->isCreated === false) {
            $repository->isCreated = true;
            $repository->save();
        }

        return $this->render('view', [
            'model' => $repository,
            'user' => UserProfileModel::findOne(['userid' => $identityUser->id]),
            'rootPath' => $rootPath,
        ]);
    }

    public function actionCreate(): string|Response
    {
        switch (Yii::$app->request->getMethod()) {
            case 'GET':
                return $this->render('create', [
                    'model' => new RepositoryCreateViewModel(),
                ]);
            case 'POST':
                $vm = new RepositoryCreateViewModel();
                $vm->name = Yii::$app->request->post('RepositoryCreateViewModel')['name'];
                $vm->description = Yii::$app->request->post('RepositoryCreateViewModel')['description'];
                $vm->categories = Yii::$app->request->post('RepositoryCreateViewModel')['categories'];

                $repository = new RepositoryModel();
                $repository->name = $vm->name;
                $repository->description = $vm->description;
                $repository->userid = Yii::$app->getUser()->getId();
                $repository->categories = $vm->categories;
                $repository->save();
                return $this->redirect(Url::toRoute(['repository/view', 'id' => $repository->id]));
        }

        throw new yii\web\MethodNotAllowedHttpException();
    }

    public function actionLike(int $id)
    {
        $rating = Yii::$app->request->post('rating');

        $like = RepositoryLikeModel::findOne([
            'userid' => Yii::$app->getUser()->getId(),
            'repositoryid' => $id,
        ]);

        if (is_null($like)) {
            $like = new RepositoryLikeModel();
            $like->userid = Yii::$app->getUser()->getId();
            $like->repositoryid = $id;
        }

        $like->rating = $rating;
        $like->save();

        return $this->redirect(Url::toRoute(Yii::$app->request->post('sourceRoute')));
    }

    public function actionDelete(int $id): Response
    {
        RepositoryModel::deleteAll(['id' => $id]);
        return $this->goBack();
    }
}
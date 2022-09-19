<?php

namespace app\controllers;

use app\models\domain\UserProfileModel;
use app\models\domain\RepositoryModel;
use app\models\identity\IdentityUser;
use Yii;
use yii\data\Pagination;
use yii\data\Sort;
use yii\web\Controller;

class ProfileController extends Controller
{
    public function actionView(int $id = null, string $sort = null): string
    {
        $identityUser = is_null($id)
            ? IdentityUser::findOne(\Yii::$app->getUser()->id)
            : IdentityUser::findOne($id);

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
WHERE (`userid` == :loginuserid AND `userid` == :userid) OR (`isCreated` == true AND `userid` == :userid)
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
                ':userid' => $identityUser->getId(),
                ':loginuserid' => Yii::$app->getUser()->getId(),
            ])
            ->queryAll(\PDO::FETCH_CLASS);

        return $this->render('view', [
            'models' => $repositories,
            'pagination' => $pages,
            'sort' => $sorting,
            'user' => UserProfileModel::findOne(['userid' => $identityUser->getId()]),
        ]);
    }
}

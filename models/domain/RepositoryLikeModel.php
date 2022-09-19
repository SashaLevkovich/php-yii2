<?php

namespace app\models\domain;

use yii\db\ActiveRecord;

/**
 * @property int $userid
 * @property int $repositoryid
 * @property float $rating
 */
class RepositoryLikeModel extends ActiveRecord
{
    public static function tableName(): string
    {
        return '{{repositorylike}}';
    }

    public function rules()
    {
        return [
            [['userid', 'repositoryid', 'rating'], 'required'],
        ];
    }

    public static function primaryKey()
    {
        return ['userid', 'repositoryid'];
    }
}
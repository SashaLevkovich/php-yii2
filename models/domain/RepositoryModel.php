<?php

namespace app\models\domain;

use yii\db\ActiveRecord;

/**
 * @property int $id
 * @property int $userid
 * @property string $name
 * @property string $description
 * @property string $categories
 * @property bool $isPrivate
 * @property bool $isCreated
 */
class RepositoryModel extends ActiveRecord
{
    public static function tableName(): string
    {
        return '{{repository}}';
    }
}

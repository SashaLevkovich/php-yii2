<?php

namespace app\models\domain;

use yii\db\ActiveRecord;

/**
 * @property int $id
 * @property int $userid
 * @property string $nickname
 */
class UserProfileModel extends ActiveRecord
{
    public static function tableName(): string
    {
        return '{{userprofile}}';
    }
}

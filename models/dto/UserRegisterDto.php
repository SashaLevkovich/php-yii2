<?php

namespace app\models\dto;

use yii\base\Model;

class UserRegisterDto extends Model
{
    public $nickname;
    public $username;
    public $password;

    public function rules(): array
    {
        return [
            [['nickname', 'username', 'password'], 'required'],
            ['rememberMe', 'boolean'],
        ];
    }
}
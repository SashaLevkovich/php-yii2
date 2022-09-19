<?php

namespace app\viewmodels;

use yii\base\Model;

class RepositoryCreateViewModel extends Model
{
    public $name;
    public $description;
    public $categories;

    public function rules(): array
    {
        return [
            [['username'], 'required']
        ];
    }
}

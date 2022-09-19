<?php

namespace app\controllers;

use yii\web\Controller;

class ErrorController extends Controller
{
    public function actions()
    {
        return [
            'index' => [
                'class' => 'yii\web\ErrorAction',
            ],
        ];
    }
}
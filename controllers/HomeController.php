<?php

namespace app\controllers;

use Yii;
use yii\web\Controller;
use yii\web\Response;

class HomeController extends Controller
{
    public function actionIndex(): string | Response
    {
        if (Yii::$app->user->isGuest) {
            return $this->redirect('auth/login');
        }

        return $this->redirect('profile/view');
    }
}
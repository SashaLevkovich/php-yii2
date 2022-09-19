<?php

namespace app\controllers;

use app\models\domain\UserProfileModel;
use app\models\dto\UserLoginDto;
use app\models\dto\UserRegisterDto;
use app\models\identity\IdentityUser;
use Yii;
use yii\filters\AccessControl;
use yii\filters\VerbFilter;
use yii\web\Controller;
use yii\web\Response;

class AuthController extends Controller
{
    public $layout = "auth";

    public function behaviors(): array
    {
        return [
            'access' => [
                'class' => AccessControl::class,
                'only' => ['login', 'logout'],
                'rules' => [
                    [
                        'allow' => true,
                        'actions' => ['login'],
                        'roles' => ['?'],
                    ],
                    [
                        'allow' => true,
                        'actions' => ['logout'],
                        'roles' => ['@'],
                    ],
                ],
            ]
        ];
    }

    public function actionLogin() : string | Response
    {
        switch (Yii::$app->request->getMethod())
        {
            case 'GET':
                return $this->render('login', [
                    'model' => new UserLoginDto(),
                ]);
            case 'POST':
                $userLoginDto = new UserLoginDto();
                $userLoginDto->load(Yii::$app->request->post());

                $identityUser = IdentityUser::findOne([
                    'username' => $userLoginDto->username
                ]);

                if (is_null($identityUser)
                    || !Yii::$app->security->validatePassword($userLoginDto->password, $identityUser->password_hash)) {
                    $userLoginDto->addError('password', 'Incorrect username or password');

                    $userLoginDto->password = '';
                    return $this->render('login', [
                        'model' => $userLoginDto
                    ]);
                }

                Yii::$app->user->login($identityUser, $userLoginDto->rememberMe ? 3600*24*30 : 0);
                return $this->goHome();
        }

        return $this->goHome();
    }

    public function actionLogout(): Response
    {
        Yii::$app->user->logout();

        return $this->goHome();
    }

    public function actionRegister(): string | Response
    {
        switch (Yii::$app->request->getMethod())
        {
            case 'GET':
                $model = new UserRegisterDto();
                return $this->render('register', [
                    'model' => $model
                ]);
            case 'POST':
                $userRegisterDto = new UserRegisterDto();
                $userRegisterDto->load(Yii::$app->request->post());

                $identityUser = IdentityUser::findOne([
                    'username' => $userRegisterDto->username
                ]);

                if (!is_null($identityUser)) {
                    $userRegisterDto->addError('username', 'The username already exists.');

                    $userRegisterDto->password = '';
                    return $this->render('register', [
                        'model' => $userRegisterDto
                    ]);
                }

                $identityUser = new IdentityUser();
                $identityUser->username = $userRegisterDto->username;
                $identityUser->password_hash =  Yii::$app->security->generatePasswordHash($userRegisterDto->password);
                $identityUser->save();

                $userProfile = new UserProfileModel();
                $userProfile->userid = $identityUser->id;
                $userProfile->nickname = $userRegisterDto->nickname;
                $userProfile->save();

                Yii::$app->user->login($identityUser, 3600*24*30);
                return $this->goHome();
        }

        return $this->goHome();
    }
}
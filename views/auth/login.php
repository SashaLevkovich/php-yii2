<?php

/** @var yii\web\View $this */
/** @var yii\bootstrap5\ActiveForm $form */
/** @var app\models\dto\UserLoginDto $model */

use yii\bootstrap5\ActiveForm;
use yii\widgets\Pjax;
use yii\bootstrap5\Html;
use yii\helpers\Url;

$this->title = 'Sign in to devHub';
?>

<div class="row text-left justify-content-between align-items-center mb-2">
    <div class="col-auto">
        <h3><?= Html::encode($this->title) ?></h3>
    </div>
</div>

<?php Pjax::begin([]); $form = ActiveForm::begin([
    'id' => 'login-form',
    'class' => 'card-body',
    'options' => ['data' => ['pjax' => true]],
    'fieldConfig' => [
        'template' => "{label}\n{input}\n{error}",
        'labelOptions' => ['class' => 'col col-form-label mr-lg-3'],
        'inputOptions' => ['class' => 'col form-control'],
        'errorOptions' => ['class' => 'col invalid-feedback'],
    ],
]); ?>

<?= $form->field($model, 'username')->textInput(['autofocus' => true]) ?>

<?= $form->field($model, 'password')->passwordInput() ?>

<?= $form->field($model, 'rememberMe')->checkbox([
    'template' => "<div class=\"col custom-control custom-checkbox\">{input} {label}</div>\n<div class=\"col-lg-8\">{error}</div>",
]) ?>

<div class="form-group mt-3">
    <?= Html::submitButton('Login', ['class' => 'btn btn-primary btn-block', 'name' => 'login-button']) ?>
</div>

<?php ActiveForm::end(); Pjax::end(); ?>

<hr class="h-100">

<div class="w-100 d-flex align-items-center justify-content-center gap-1">
    New to devHub? <?= Html::a('Create an account.', Url::toRoute('auth/register')) ?>
</div>

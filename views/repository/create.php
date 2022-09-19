<?php

/** @var yii\web\View $this */
/** @var yii\bootstrap5\ActiveForm $form */

/** @var app\viewmodels\RepositoryCreateViewModel $model */

use yii\bootstrap5\ActiveForm;
use yii\bootstrap5\Html;
use yii\helpers\Url;

$this->title = 'Add new repository';

?>

<?php $form = ActiveForm::begin([
    'id' => 'add-repo',
    'class' => 'card',
    'fieldConfig' => [
        'template' => "{label}\n{input}\n{error}",
        'labelOptions' => ['class' => 'col col-form-label mr-lg-3'],
        'inputOptions' => ['class' => 'col form-control'],
        'errorOptions' => ['class' => 'col invalid-feedback'],
    ],
]);
?>
    <div class="card-header">
        <h5 class="mb-0"><?= Html::encode($this->title) ?></h5>
    </div>

<div class="card-body bg-light">
    <?= $form->field($model, 'name')->textInput(['autofocus' => true]) ?>

    <?= $form->field($model, 'description')->textarea() ?>

    <?= $form->field($model, 'categories')->textInput([
        'title' => 'Use "," to divide by category',
        'placeholder' => 'Use "," to divide by category'
    ]) ?>
</div>

<div class="card-footer">
    <div class="d-flex justify-content-end">
        <a href="<?= Url::previous() ?>" class="btn btn-falcon-default btn-sm mr-2">
            Cancel
        </a>

        <?= Html::submitButton('Add', ['class' => 'btn btn-falcon-primary btn-sm']) ?>
    </div>
</div>

<?php ActiveForm::end(); ?>
<?php

/** @var yii\web\View $this */
/** @var yii\bootstrap5\ActiveForm $form */

/** @var app\models\domain\UserProfileModel $user */
/** @var array $models */
/** @var yii\data\Pagination $pagination */
/** @var yii\data\Sort $sort */

use rmrevin\yii\fontawesome\FA;
use yii\bootstrap5\Html;
use yii\helpers\Url;

$this->title = $user->nickname . '\'s profile';
?>

<div class="row text-left justify-content-between align-items-center mb-2">
    <div class="col-auto">
        <h2><?= Html::encode($this->title) ?></h2>
    </div>
</div>


<div class="card mb-3">
    <div class="card-header">
        <div class="row align-items-center">
            <div class="col">
                <h4 class="mb-0 d-inline">
                    Repositories
                    <a href="<?= Url::toRoute('repository/create') ?>" data-toggle="tooltip" title="Add repository"
                       class="ml-1">
                        <?= FA::icon('plus') ?>
                    </a>
                </h4>
            </div>
        </div>
    </div>

    <?= $this->render('@app/views/shared/_repositoryListView', [
        'models' => $models,
        'pagination' => $pagination,
        'sort' => $sort

    ]) ?>
</div>
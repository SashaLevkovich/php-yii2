<?php

/** @var yii\web\View $this */
/** @var yii\bootstrap5\ActiveForm $form */

/** @var array $models */
/** @var yii\data\Pagination $pagination */
/** @var yii\data\Sort $sort */

use rmrevin\yii\fontawesome\FA;
use yii\helpers\Url;

$this->title = 'Repositories';
?>

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
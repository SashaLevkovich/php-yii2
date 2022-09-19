<?php

/** @var yii\web\View $this */
/** @var app\models\domain\UserProfileModel $user */
/** @var array $models */
/** @var yii\data\Pagination $pagination */

/** @var yii\data\Sort $sort */

use app\models\domain\RepositoryModel;
use yii\bootstrap5\Html;
use yii\helpers\Url;

?>

<div class="card-body border-top row">
    <div class="col">
        <div class="col mb-4">
            <?= $this->render('@app/views/shared/_sortingRepositories', [
                'sort' => $sort,
            ]) ?>
        </div>

        <?php if (!empty($models)) : ?>

            <?php foreach ($models as $model): ?>
                <div class="row">
                    <div class="col">
                        <div class="row border-bottom w-100 p-0 m-0">
                            <a class="col-auto d-block"
                               href="<?= Url::toRoute(['repository/view', 'id' => $model->id]) ?>">
                                <div class="row">
                                    <h4 class="col-auto"
                                        style="color: var(--bs-link-color)">
                                        <?= Html::encode($model->name) ?>
                                    </h4>
                                </div>
                            </a>
                            <div class="col">
                                <?php
                                $categories = explode(',', RepositoryModel::findOne($model->id)->categories); ?>
                                <?= Html::ul($categories, [
                                    'class' => 'm-0 p-0',
                                    'item' => fn($item) => Html::a(
                                        $item,
                                        Url::toRoute(['repository/list', 'filter' => $item]),
                                        ['class' => "badge badge-pill btn btn-outline-info fs--2"]),
                                ]) ?>
                            </div>
                            <?= $this->render('@app/views/shared/_repositoryRating', [
                                'model' => $model,
                            ]) ?>
                        </div>

                        <div class="p-3">
                            <dl class="row mb-3 fs--1">
                                <dt class="col-sm-4">Description</dt>
                                <dd class="col-sm-8"><?= Html::encode(
                                        empty($model->description)
                                            ? "No description, website, or topics provided."
                                            : $model->description) ?></dd>
                            </dl>
                        </div>
                    </div>
                </div>
            <?php endforeach; ?>

        <?php else: ?>

            <div class="row">
                <div class="col alert alert-warning">Oops... required repositories not found!</div>
            </div>

        <?php endif; ?>
    </div>
</div>
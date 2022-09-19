<?php

/** @var yii\web\View $this */
/** @var yii\bootstrap5\ActiveForm $form */
/** @var app\models\domain\RepositoryModel $model */
/** @var app\models\domain\UserProfileModel $user */

/** @var string $rootPath */

use rmrevin\yii\fontawesome\FA;
use yii\bootstrap5\Breadcrumbs;
use yii\bootstrap5\Html;
use yii\helpers\Markdown;
use yii\helpers\StringHelper;
use yii\helpers\Url;

$path = (string)(Yii::$app->request->get('path'));
$filename = $rootPath . "/$path";
$breadcrumbsLinks = explode('/', $path);

$this->title = Html::a($user->nickname, Url::toRoute(['profile/view', 'id' => $user->userid])) . " / " . $model->name;
$this->params['breadcrumbs'] = empty($path) ? null :
    array_map(function ($link, int $index) use ($model, $breadcrumbsLinks) {
        return [
            'label' => $link,
            'url' => $index != count($breadcrumbsLinks) - 1
                ? Url::toRoute([
                    'repository/view',
                    'id' => $model->id,
                    'path' => implode('/', array_splice($breadcrumbsLinks, 0, $index + 1))
                ])
                : null,
        ];
    }, $breadcrumbsLinks, range(0, count($breadcrumbsLinks) - 1));
?>

<div class="card mb-3">
    <div class="card-header d-flex align-items-center justify-content-between">
        <h5 class="mb-0"><?= $this->title ?></h5>

        <?= $this->render('@app/views/shared/_repositoryRating', [
            'model' => $model,
        ]) ?>
    </div>

    <div class="card-body bg-light">
        <dl class="row mb-3 fs--1">
            <dt class="col-sm-4">Description</dt>
            <dd class="col-sm-8"><?= Html::encode(
                    empty($model->description)
                        ? "No description, website, or topics provided."
                        : $model->description) ?></dd>
        </dl>

        <dl class="row mb-3 fs--1">
            <dt class="col-sm-4">Categories</dt>
            <dd class="col-sm-8">
                <?= Html::ul(explode(',', $model->categories), [
                    'class' => 'm-0 p-0',
                    'item' => fn($item) => Html::a(
                        $item,
                        Url::toRoute(['repository/list', 'filter' => $item]),
                        ['class' => "badge badge-pill btn btn-outline-info fs--2"]),
                ]) ?></dd>
        </dl>
    </div>
</div>

<div class="card mb-3">

    <div class="card-header d-flex align-items-center">
        <?= Breadcrumbs::widget([
            'itemTemplate' => "<li>/</li><li>{link}</li>\n",
            'activeItemTemplate' => "<li>/</li><li>{link}</li>\n",
            'homeLink' => [
                'label' => $model->name,
                'url' => Url::toRoute(['repository/view', 'id' => $model->id])
            ],
            'links' => isset($this->params['breadcrumbs']) ? $this->params['breadcrumbs'] : [],
            'options' => [
                'class' => ['d-flex', 'gap-1', 'list-unstyled']
            ]
        ]) ?>
    </div>

    <div class="card-body bg-light ">

        <?php if (is_dir($filename)): ?>
            <?php
            $folder = scandir($filename);
            $folder = array_splice($folder, count(array_filter($folder, fn($item) => StringHelper::startsWith($item, '.'))));
            $folder = array_merge(
                array_filter($folder, fn($item) => is_dir($rootPath . "/$path" . "/$item")),
                array_filter($folder, fn($item) => !is_dir($rootPath . "/$path" . "/$item")),
            );

            ?>

            <?= Html::ul($folder, [
                'class' => 'list-unstyled',
                'item' => function ($item, $index) use ($rootPath, $path) {
                    return Html::tag(
                        'li',
                        Html::a(
                            FA::icon(is_dir($rootPath . "/$path" . "/$item") ? 'folder' : 'file') . " $item",
                            Url::toRoute([
                                'repository/view',
                                'id' => Yii::$app->request->get('id'),
                                'path' => implode('/', array_filter([$path, $item], fn($item) => !empty($item))),
                            ])
                        )
                    );
                },
            ]) ?>

        <?php else: ?>

            <pre><?= Html::encode(file_get_contents($filename)) ?></pre>

        <?php endif; ?>

    </div>
</div>

<div class="card mb-3">
    <?php if (empty($path)): ?>
        <?php if (file_exists($rootPath . "/README.md")): ?>
            <div class="card-body bg-light m-0">
                <?= Markdown::process(file_get_contents($rootPath . "/README.md")) ?>
            </div>
        <?php else: ?>
            <p class="card-header card-body bg-info text-white m-0">
                Help people interested in this repository understand your project by adding a README.
            </p>
        <?php endif; ?>
    <?php endif; ?>
</div>

<div class="card mb-3">
    <?= $this->render('@app/views/shared/_repositoryViewFooter', [
        'model' => $model
    ]) ?>
</div>
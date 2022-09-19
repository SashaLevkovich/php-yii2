<?php

use app\models\domain\RepositoryModel;
use rmrevin\yii\fontawesome\FA;
use yii\bootstrap5\Html;
use yii\helpers\Url;

$categories = array_unique(array_reduce(
    RepositoryModel::find()
        ->select('categories')
        ->where('isCreated == true')
        ->groupBy('categories')
        ->all(),
    fn($carry, $item) => !empty($item->categories)
        ? array_merge($carry, explode(',', str_replace(' ', '', $item->categories)))
        : $carry,
    []));

?>

<nav class="navbar navbar-vertical navbar-expand-xl navbar-light">
    <div class="d-flex align-items-center">
        <div class="toggle-icon-wrapper">
            <button class="btn navbar-toggler-humburger-icon navbar-vertical-toggle"><span
                        class="navbar-toggle-icon"><span class="toggle-line"></span></span></button>
        </div>

        <a class="navbar-brand" href="/">
            <div class="d-flex align-items-center py-3">
                <span class="text-sans-serif">devHub</span>
            </div>
        </a>
    </div>

    <div class="collapse navbar-collapse" id="navbarVerticalCollapse">
        <div class="navbar-vertical-content perfect-scrollbar scrollbar">

            <ul class="navbar-nav flex-column">
                <li class="nav-item">
                    <a class="nav-link" href="<?= Url::toRoute('profile/view') ?>">
                        <div class="d-flex align-items-center fs-6">
                            <span class="nav-link-icon"><?= FA::icon('user') ?></span>
                            <span class="nav-link-text">Profile</span>
                        </div>
                    </a>
                </li>

                <li class="nav-item">
                    <a class="nav-link" href="<?= Url::toRoute('repository/list') ?>">
                        <div class="d-flex align-items-center fs-6">
                            <span class="nav-link-icon"><?= FA::icon('book') ?></span>
                            <span class="nav-link-text">Repositories</span>
                        </div>
                    </a>
                    <ul class="navbar-nav flex-column border-top">
                        <?= Html::ul($categories, [
                            'item' => function ($item, $index) {
                                return Html::a(
                                    Html::tag(
                                        'div',
                                        Html::tag('span', $item, ['class' => 'nav-link-text']),
                                        ['class' => "d-flex align-items-center fs--4"]
                                    ),
                                    Url::toRoute(['repository/list', 'filter' => $item]),
                                    ['class' => "nav-link aa"]
                                );
                            }
                        ]) ?>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</nav>

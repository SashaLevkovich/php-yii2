<?php
/** @var yii\data\Sort $sort */

use rmrevin\yii\fontawesome\FA;
use yii\helpers\StringHelper;

$sortParam = Yii::$app->request->get('sort');
$sortIcon = is_null($sortParam) ? '' : (StringHelper::startsWith( $sortParam, '-')
    ? FA::icon('sort-amount-desc')
    : FA::icon('sort-amount-asc'));

?>

<div class="row col">
    <div class="col">
        Сортировка:
        <h6 class="d-inline">
            <?= $sort->link('rating', ['label' => "По рейтингу " . $sortIcon]) ?>
        </h6>
    </div>
</div>


<?php

/** @var yii\web\View $this */
/** @var app\models\domain\RepositoryModel $model */
/** @var float $projectRating */

/** @var string[] $btnOptions */

use rmrevin\yii\fontawesome\FA;
use yii\bootstrap5\ActiveForm;
use yii\bootstrap5\Html;
use yii\db\Query;
use yii\helpers\Url;
use yii\widgets\Pjax;

?>

<div class="col-xl-2 col-md-3 col-sm-4">
    <?php Pjax::begin([]);
    $form = ActiveForm::begin([
        'action' => Url::toRoute(['repository/like', 'id' => $model->id]),
        'options' => ['data' => ['pjax' => true]],
    ]);
    $projectRating = floatval((new Query())
        ->from('repositorylike')
        ->where(['repositoryid' => $model->id])
        ->average('rating'));
    $btnOptions = ['value' => "{value}", 'name' => 'rating', 'class' => 'btn btn-link p-1']; ?>
    <input type="hidden" name="sourceRoute" value="<?= Url::current() ?>">
    <h6 class="m-0" title="<?= $projectRating ?>">
        <?= implode(
            array_map(
                fn($ind, $btn): string => str_replace('{value}', strval($ind), $btn),
                range(1, 5),
                array_merge(
                    array_fill(0, floor($projectRating),
                        Html::submitButton(FA::icon('star'), $btnOptions)),
                    array_fill(0, 5 - floor($projectRating),
                        Html::submitButton(FA::icon('star-o'), $btnOptions))
                )
            )
        ); ?>
    </h6>
    <?php ActiveForm::end();
    Pjax::end(); ?>
</div>


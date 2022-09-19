<?php

/** @var yii\web\View $this */
/** @var app\models\domain\RepositoryModel $model */

use yii\helpers\Url;

?>
<div class="card-header card-body">
    <div class="d-flex justify-content-between">
        <div>
            <?php if ($model->userid === Yii::$app->getUser()->getId()): ?>
                <a href="<?= Url::toRoute(['repository/delete', 'id' => $model->id]) ?>"
                   class="btn btn-falcon-danger btn-sm mr-2">
                    Delete repository
                </a>
            <?php endif; ?>
        </div>
        <div>
        </div>
    </div>
</div>
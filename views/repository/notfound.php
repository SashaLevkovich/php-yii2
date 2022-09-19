<?php

/** @var yii\web\View $this */
/** @var yii\bootstrap5\ActiveForm $form */

/** @var app\models\domain\RepositoryModel $model */

use yii\bootstrap5\ActiveForm;
use yii\bootstrap5\Html;
use yii\helpers\Url;

$this->title = $model->name;

?>

<div class="card mb-3">
    <div class="card-header d-flex align-items-center">
        <h4 class="mb-0"><?= Html::encode($this->title) ?></h4>
    </div>

    <div class="card-body bg-light">
        <dl class="mb-3">
            <dt class="row-sm-4">
                <div class="col">
                    Quick setup
                </div>
            </dt>
            <dd class="row-sm-8 fs--1">
                <div class="col">
                    Get started by creating a new file or uploading an existing file. We recommend every
                    repository include a README, LICENSE, and .gitignore.
                </div>
            </dd>
        </dl>
    </div>
</div>

<div class="card mb-3">
    <div class="card-header d-flex align-items-center">
        <h5 class="mb-0">Сreate a new repository on the command line</h5>
    </div>

    <div class="card-body bg-light">
        <div class="row">
                <pre class="col">
echo "# test" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin {{url}}
git push -u origin main
                </pre>
        </div>
    </div>
</div>

<div class="card mb-3">
    <div class="card-header d-flex align-items-center">
        <h5 class="mb-0">…or push an existing repository from the command line</h5>
    </div>

    <div class="card-body bg-light">
        <div class="row">
                <pre class="col">
git remote add origin {{url}}
git branch -M main
git push -u origin main
                </pre>
        </div>
    </div>
</div>

<div class="card mb-3">
    <?= $this->render('@app/views/shared/_repositoryViewFooter', [
        'model' => $model
    ]) ?>
</div>
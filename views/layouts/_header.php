<?php

use rmrevin\yii\fontawesome\FA;
use app\models\identity\IdentityUser;
use yii\helpers\Url;

$user = IdentityUser::findOne(Yii::$app->getUser()->getId());

?>

<nav class="navbar navbar-light navbar-glass navbar-top sticky-kit navbar-expand">
    <button class="btn navbar-toggler-humburger-icon navbar-toggler mr-1 mr-sm-3" type="button" data-toggle="collapse" data-target="#navbarVerticalCollapse" aria-controls="navbarVerticalCollapse" aria-expanded="false" aria-label="Toggle Navigation"><span class="navbar-toggle-icon"><span class="toggle-line"></span></span></button>

    <ul class="navbar-nav navbar-nav-icons ml-auto flex-row align-items-center">
        <li class="nav-item dropdown dropdown-on-hover">
            <a class="dropdown-item" href="<?= Url::toRoute('auth/logout')?>">
                <?= FA::icon('sign-out') ?> Logout
            </a>
        </li>
    </ul>
</nav>
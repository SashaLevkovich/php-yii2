<?php

namespace app\viewmodels;

use app\models\domain\UserProfileModel;

class ProfileIndexViewModel
{
    public UserProfileModel $userProfile;

    public array $projects;
}
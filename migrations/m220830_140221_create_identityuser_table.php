<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%identityuser}}`.
 */
class m220830_140221_create_identityuser_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('{{%identityuser}}', [
            'id' => $this->primaryKey(),
            'username' => $this->string()->notNull()->unique(),
            'password' => $this->string()->notNull(),
            'authKey' => $this->string(),
            'accessTolen' => $this->string()
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('{{%identityuser}}');
    }
}

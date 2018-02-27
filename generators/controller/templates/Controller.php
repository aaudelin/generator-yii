<?php
namespace app\controllers;

/**
 * Controller to handler CRUD requests for 
 *
 * @author tradelab
 * @see TradelabController
 *
 */
class <%= controllerName %> extends TradelabController
{

	public function actionIndex()
	{
		<% if (saasRight) {%>
		// Checks user's rights
        self::isSaasAllowed(/* Add Rule Here*/);

        // Check user's rights
        $this->checkSaasUserRight();
        <% }%>

        // Check if the advertiser exists with the id advertiser
        $advertiser = $this->getAdvertiser();

        // load data
        $request = \Yii::$app->request;
	}

}
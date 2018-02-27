<?php
namespace app\controllers;

/**
 * Controller to handler CRUD requests for 
 *
 * @author tradelab
 * @see TradelabController
 *
 */
class <%= name %>Controller extends TradelabController
{

	/**
	 * Description
	 * 
	 * @return array
	 */
	public function actionIndex()
	{
		$psize = (int) $this->getQSParameterInteger('psize', 20, 1, 100);
        $pcursor = (int) $this->getQSParameterInteger('pcursor', 0, 0);
        $search = [];

		<% if (saasRight) {%>
		// Checks user's rights
        self::isSaasAllowed(/* Add Rule Here*/);

        // Check user's rights
        $this->checkSaasUserRight();
        <% } %>

        // Check if the advertiser exists with the id advertiser
        $advertiser = $this->getAdvertiser();

        // load data
        $request = \Yii::$app->request;

        <% if (enableSearch) { %>
        // Enable search for a user 
        try {
            $search = Json::decode($request->get('search'), true);
        }
        catch (InvalidParamException $e)
        {
            $message = \Yii::t('http_exception', 'BadRequest__<%= name %>__InvalidSearchParameter');
            throw new BadRequestHttpException($message);
        }
		<% } %>

        // Create config to search data
        $config = new <%= name %>Config();
        $config->setScenario(<%= name %>Config::SCENARIO__WEB);
        $config->load($search, '');
        <% if (advertiserPrefix) { %>
        $config->advertiser_id = $advertiser->usr_id;
        <% } %>

		// validate data
        if (!$config->validate())
        {
            $errors = $config->getErrors();
            $message = Json::encode($errors);
            throw new BadRequestHttpException($message);
        }

        // Launch query to rtrieve data
        $query = <%= name %>::getSearchQuery($config);
        $queryCount = clone $query;
        $queryCount->orderBy(null)->limit(null)->offset(null);
        $query->limit($psize)->offset($pcursor);

        // Fetch results
		$results = $query->all();
        $resultsCount = $queryCount->count();

        // Display results
        $displayResults = [];
        foreach ($results as $item)
        {
            /* @var $item <%= name %> */
            $displayResults[] = $item->getExportableAttributes();
        }

        return [
            'objects' => ResponseFormat::buildResponseFormat($this->getResponseFormat(), $displayResults, 'id'),
            'pagination' => Pagination::getInfos($psize, $pcursor, $resultsCount)
        ];



	}

}
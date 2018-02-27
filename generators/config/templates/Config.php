<?php

namespace app\models\queries;

/**
 * This class defines all parameters that can be used to filter
 * objects in a search query.
 * 
 * @author tradelab
 *
 */
class <%= name %>Config extends AbstractQueryConfig
{

    <% if (advertiserPrefix) { %>
    /**
     * Value to filter by advertiser ids
     * @var int
     */
    public $advertiser_id;
    <% } %>

    /**
     * Value to filter by <%= field %>
     * @var <%= typeField %>
     */
    public $<%= field %>;

    /**
     * {@inheritDoc}
     * @see \yii\base\Model::scenarios()
     */
    public function scenarios()
    {
        return [
            <% if (webScenario) { %>
            self::SCENARIO__WEB => [
                <% if (advertiserPrefix) { %>
                '!advertiser_id',// advertiser ids cannot be massively assigned
                <% } %>  
                '<%= field %>',
            ],
            <% } %>
            <% if (cliScenario) { %>
            self::SCENARIO__CLI => [
                <% if (advertiserPrefix) { %>
                'advertiser_id',// advertiser ids can be massively assigned
                <% } %> 
                '<%= field %>'
            <% } %>
        ];
    }

    /**
     * {@inheritDoc}
     * @see \yii\base\Model::rules()
     */
    public function rules()
    {
        return [
            
        ];
    }
}

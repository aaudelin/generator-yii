<?php
namespace app\models\queries;

/**
 * Helps create query to fetch objects
 *
 * @author tradelab
 * @see AbstractQuery
 *
 */
class <%= name %>Query extends AbstractQuery
{

	/** Name of the main table */
	const MAIN_TABLE_ALIAS = '<%=tableName%>';

    /**
     * Constructor
     * Initialize the query
     */
    public function __construct()
    {
        $this->query = <%= name %>::find();

        $table = self::MAIN_TABLE_ALIAS;
        $model = new <%= name %>();
        $aliasedColumns = array_map(
            function($col) use ($table) {
                return "$table.$col";
            },
            array_keys($model->attributeLabels())
        );

        $this->query->select($aliasedColumns);
        $this->query->from([$table => <%= name %>::tableName()]);
        $this->query->groupBy(["{$table}.<%= tableId %>"]);
        $this->query->orderBy(["{$table}.<%= tableId %>" => SORT_ASC]);
    }
}
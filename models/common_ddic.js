var Sequelize = require('sequelize');
var db = require('./db');

// 通用－字典表－国家
module.exports.CommonDDICCountry = db.define('common_ddic_country', {
    code: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: "国家代码",
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: "国家名称",
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false,
        comment: "说明",
    },
}, {
    freezeTableName: true, // Model tableName will be the same as the model name
    timestamps: false,
    comment: "通用－字典表－国家"
});

// 通用－字典表－省份城市
module.exports.CommonDDICRegion = db.define('common_ddic_region', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: "id",
        primaryKey: true,
    },
    code: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: "地区代码",
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: "地区名称",
    },
    parent_id: {
        type: Sequelize.INTEGER,
        comment: "上层id",
    },
    level: {
        type: Sequelize.INTEGER,
        comment: "层级",
    },
    order: {
        type: Sequelize.INTEGER,
        comment: "排序",
    },
    region_name_en: {
        type: Sequelize.STRING,
        comment: "英文名",
    },
    region_shortname_en: {
        type: Sequelize.STRING,
        comment: "英文简写",
    },
}, {
    freezeTableName: true, // Model tableName will be the same as the model name
    timestamps: false,
    comment: "通用－字典表－区域"
});


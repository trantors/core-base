var Sequelize = require('sequelize');
var db = require('./db');

module.exports.Client = db.define('client', {
    client: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        comment: "客户编码"
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: "客户名称"
    },
    org_type: {
        type: Sequelize.STRING,
        comment: "组织类型－不同的组织类型对应不同的界面标签元素"
    },
    // 以下信息作为用户申请试用时的纪录
    industry: {
        type: Sequelize.STRING,
        comment: "行业"
    },
    address: {
        type: Sequelize.STRING,
        comment: "地址"
    },
    website: {
        type: Sequelize.STRING,
        comment: "网站"
    },
    tel: {
        type: Sequelize.STRING,
        comment: "电话"
    },
    fax: {
        type: Sequelize.STRING,
        comment: "传真"
    },
    origin: {
        type: Sequelize.STRING,
    },
    attr: {
        type: Sequelize.JSON
    }
}, {
    freezeTableName: true, // Model tableName will be the same as the model name
    paranoid: true, // 逻辑删除。彻底删除时，需要 destroy({force:true})
    comment: "客户总控表"
});

// 客户的联系人表
module.exports.ClientContact = db.define('client_contact', {
    client: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: "客户编码"
    },
    contact_title: {
        type: Sequelize.STRING,
        comment: "称呼"
    },
    contact_name: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: "联系人姓名"
    },
    position: {
        type: Sequelize.STRING,
        comment: "职位"
    },
    ou: {
        type: Sequelize.STRING,
        comment: "部门"
    },
    tel: {
        type: Sequelize.STRING,
        comment: "电话"
    },
    cell: {
        type: Sequelize.STRING,
        comment: "手机"
    },
    address: {
        type: Sequelize.STRING,
        comment: "地址"
    },
    postcode: {
        type: Sequelize.STRING,
        comment: "邮编"
    },
}, {
    freezeTableName: true, // Model tableName will be the same as the model name
    comment: "客户联系人表"
});

// 客户账户类型字典表
module.exports.ClientAccountDDIC = db.define('client_account_ddic', {
    account: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        comment: "账户代码",
    },
    name: {
        type: Sequelize.STRING,
        comment: "账户名称",
    },
    unit: {
        type: Sequelize.STRING,
        comment: "单位",
    },
    scale: {
        type: Sequelize.INTEGER,
        defaultValue: 2, // 默认2位小数。 如果为0，则代表取为整数.
        comment: "小数位数", // 
    },
    comment: {
        type: Sequelize.STRING,
        comment: "说明",
    }
}, {
    freezeTableName: true, // Model tableName will be the same as the model name
    comment: "客户账户类型字典表"
});
// 客户账户表
module.exports.ClientAccount = db.define('client_account', {
    client: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: "客户编码",
        unique: 'client_account',
    },
    account: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: "账户",
        unique: 'client_account',
    },
    balance: {
        type: Sequelize.DECIMAL(15, 2).ZEROFILL,
        comment: "余额－保留2位小数。 计算后近似保留2位小数。"
    },

}, {
    freezeTableName: true, // Model tableName will be the same as the model name
    paranoid: true, // 逻辑删除。彻底删除时，需要 destroy({force:true})
    comment: "客户账户表"
});

// 客户账户流水表
module.exports.ClientAccountTransaction = db.define('client_account_transaction', {
    client: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: "客户编码",
    },
    account: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: "账户",
    },
    transaction_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: "交易编号 client_transaction.id",
    },
    tm: {
        type: Sequelize.DATE,
        comment: "发生时间戳"
    },
    amount: {
        type: Sequelize.DECIMAL(15, 2).ZEROFILL,
        comment: "发生额"
    },
    action: {
        type: Sequelize.STRING,
        comment: "动作"
    },
    product_code: {
        type: Sequelize.STRING,
        comment: "系统商品代码"
    },
}, {
    freezeTableName: true, // Model tableName will be the same as the model name
    paranoid: true, // 逻辑删除。彻底删除时，需要 destroy({force:true})
    comment: "客户账户流水表"
});

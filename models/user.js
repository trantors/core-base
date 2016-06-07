var Sequelize = require('sequelize');
var crypto = require('crypto');
var db = require('./db');
var datetools = require('../utils/datetools');

module.exports.People = db.define('people', {
    client: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: "客户代码",
        unique: 'client_username',
    },
    //- 传统用户名＋密码登陆
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: '用户名（工号），可以自动给号或者手工编号',
        unique: 'client_username',
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: '密码，给默认密码',
        set: function(val) {
            // 加密原始密码
            var sha = crypto.createHash('sha512');
            sha.update(val);
            this.setDataValue('password', sha.digest('hex').toUpperCase());
        }
    },
    sys_user: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        comment: '系统用户，不占用用户数的额度',
    },
    //- open auth
    wx_unionid: {
        type: Sequelize.STRING,
        comment: '微信开放平台授予的unionid，用来唯一标示一个微信的用户。可以用作扫码登录来使用。'
    },
    //- 基本信息
    first_name: {
        type: Sequelize.STRING,
        comment: '姓',
        set: function(val) {
            this.setDataValue('first_name', val);
            // 设置full_name的值
            var full_name = this.getDataValue('first_name') + this.getDataValue('last_name');
            this.setDataValue('full_name', full_name);
        }
    },
    last_name: {
        type: Sequelize.STRING,
        comment: '名',
        set: function(val) {
            this.setDataValue('last_name', val);
            // 设置full_name的值
            var full_name = this.getDataValue('first_name') + this.getDataValue('last_name');
            this.setDataValue('full_name', full_name);
        }
    },
    full_name: {
        type: Sequelize.STRING,
        comment: '全名'
    },
    first_name_py: {
        type: Sequelize.STRING,
        comment: '姓－拼音'
    },
    last_name_py: {
        type: Sequelize.STRING,
        comment: '名－拼音'
    },
    full_name_py: {
        type: Sequelize.STRING,
        comment: '全名－拼音'
    },
    gender: {
        type: Sequelize.STRING(2),
        comment: '性别。 M 男 F 女'
    },
    birthday: {
        type: Sequelize.DATEONLY,
        comment: '出生日期',
        set: function(val) {
            // 设置自己的值
            this.setDataValue('birthday', val);
            // 计算星座，计算属相
            try {
                var d = new Date(val);
                this.setDataValue('constellation', datetools.getAstro(d.getMonth() + 1, d.getDate()));
                this.setDataValue('zodiac', datetools.getZodiac(d.getFullYear(), d.getMonth() + 1, d.getDate()));
            } catch (e) {
                console.log('set constellation and zodiac failed, pass safely.');
            }
        }
    },
    constellation: {
        type: Sequelize.STRING(10),
        comment: '星座，写汉字（1个词）'
    },
    zodiac: {
        type: Sequelize.STRING(2),
        comment: '属相，写汉字（1个字）'
    },
    avatar: {
        type: Sequelize.STRING,
        comment: '头像－URL'
    },
    idcard: {
        type: Sequelize.STRING,
        comment: '证件号码，默认身份证'
    },
    mobile: {
        type: Sequelize.STRING,
        comment: '手机'
    },
    weixin: {
        type: Sequelize.STRING,
        comment: '微信号'
    },
    qq: {
        type: Sequelize.STRING,
        comment: 'QQ号'
    },
    weibo: {
        type: Sequelize.STRING,
        comment: 'sina weibo号'
    },
    email: {
        type: Sequelize.STRING,
        comment: '邮箱'
    },
    address: {
        type: Sequelize.STRING,
        comment: '地址'
    },

    //- 自然信息
    nationality: {
        type: Sequelize.STRING,
        comment: '国籍'
    },
    province: {
        type: Sequelize.STRING,
        comment: '省份'
    },
    city: {
        type: Sequelize.STRING,
        comment: '城市'
    },
    ethnic: {
        type: Sequelize.STRING,
        comment: '民族'
    },
    religion: {
        type: Sequelize.STRING,
        comment: '宗教信仰'
    },
    marriage: {
        type: Sequelize.STRING,
        comment: '婚姻状态'
    },
    party: {
        type: Sequelize.STRING,
        comment: '政治面貌'
    },
    //- 附加信息
    manual: {
        type: Sequelize.TEXT,
        comment: '我的使用说明书'
    },

    attr: {
        type: Sequelize.JSON
    }
}, {
    freezeTableName: true, // Model tableName will be the same as the model name
    paranoid: true, // 逻辑删除
    comment: "人员主数据表",
    instanceMethods: {
        comparePassword: function(pwd) {
            // 校验密码
            var sha = crypto.createHash('sha512');
            sha.update(pwd);
            return (this.password == sha.digest('hex').toUpperCase())
        }
    }
});

module.exports.PeopleRole = db.define('people_role', {
    people: {
        type: Sequelize.INTEGER,
        comment: "people id",
    },
    role: {
        type: Sequelize.STRING,
        comment: "role code",
    },
}, {
    freezeTableName: true, // Model tableName will be the same as the model name
    comment: "人员主数据表-角色－关系表"
});

module.exports.PeopleFunc = db.define('people_function', {
    people: {
        type: Sequelize.INTEGER,
        comment: "people id",
    },
    fsign: {
        type: Sequelize.STRING,
        comment: "功能id， 对应到 sys_landscape 的 pk",
    },
}, {
    freezeTableName: true, // Model tableName will be the same as the model name
    comment: "人员主数据表-角色－关系表，通过程序生成，鉴权的时候直接读取本表"
});

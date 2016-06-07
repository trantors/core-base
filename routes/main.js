// main route interface

var router = require('koa-router')();
var _ = require('lodash');
// var auth = require('./auth');

// 默认进入用户平台
router.get('/', function * (next) {
	console.log(this.headers);
	this.body = this.url
	// this.redirect('/site/user/dashboard');
});

// router.use('/', require('./auth').routes());
// router.use('/', require('./alidayu').routes());
// router.use('/', require('./sms_verify').routes());
// router.use('/mp/', require('./user').routes());
// router.use('/mp/', require('./gateway').routes());
// router.use('/mp/', require('./api_cmds').routes());
// router.use('/mp/', require('./zhaopin').routes());
// router.use('/mp/', require('./activity').routes()); // 活跃度
// router.use('/mp/', require('./appraisal').routes()); // 评价体系

// router.use('/im/', require('./im_rongcloud').routes());
// router.use('/fs/', require('./qiniu').routes());
// router.use('/alioss/', require('./ali_oss').routes());

// router.use('/site/', require('./website/site').routes());
// router.use('/', require('./portal/main').routes());

// console.log(router);

module.exports = router;

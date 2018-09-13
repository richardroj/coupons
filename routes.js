const routes = require('next-routes')();

routes
  .add('/campaigns/new', '/campaigns/new')
  .add('/campaigns/:address', '/campaigns/show')
  .add('/campaigns/:address/requests', '/campaigns/requests/index')
  .add('/campaigns/:address/requests/new', '/campaigns/requests/new')
  .add('/cryptoCoupons/new', '/cryptoCoupons/new')
  .add('/cryptoCoupons/advancedcoupon/new', '/cryptoCoupons/advancedcoupon/new')
  .add('/cryptoCoupons/:address', '/cryptoCoupons/show')
  .add('/cryptoCoupons/:address/coupons', '/cryptoCoupons/coupons/index')
  .add('/cryptoCoupons/:address/couponsSale', '/cryptoCoupons/couponsSale/index')
  .add('/cryptoCoupons/:address/coupons/new', '/cryptoCoupons/coupons/new')
  .add('/cryptoCoupons/:address/couponsSale/buy/:serialNumber', '/cryptoCoupons/couponsSale/buy')
  .add('/cryptoCoupons/:address/lottery', '/cryptoCoupons/lottery/show')
  .add('/cryptoCoupons/:address/lottery/players/new', '/cryptoCoupons/lottery/players/new');
module.exports = routes;

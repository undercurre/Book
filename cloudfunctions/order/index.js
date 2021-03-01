// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: 'theone-dux6t',
})
const db = cloud.database()
const _ = db.command


// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const openid = wxContext.OPENID
  const userCollection = db.collection('user')
  const user = userCollection.where({'openid': openid})
  var now = new Date(); //创建一个Date对象
  var year = now.getFullYear() ; //年
  var month = now.getMonth()+1 ; //月份（从0开始），所以+1
  var date = now.getDate()
  var d_str = year+'/'+month+'/'+date
  return user.update({
    data:{
      buylist: _.push(
        {
          goods: event.goods,
          image: event.image,
          storeid: event.storeid,
          storename: event.storename,
          sum: event.sum,
          time: d_str,
        }
        )
    }
  })
}
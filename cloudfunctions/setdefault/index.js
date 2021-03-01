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
  return user.update({
    data:{
      address: event.newlist,
    } 
  })
}
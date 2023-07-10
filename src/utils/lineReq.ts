import agent from 'superagent'



const replyMessage = async (replyToken: string, channelAccessToken: string, messages: [Object]) => {

    const postData = JSON.stringify({
        replyToken: replyToken,
        messages: messages
    });

    const result = await agent.post("https://api.line.me/v2/bot/message/reply")
        .set("Authorization", `Bearer ${channelAccessToken}`)
        .set("Content-Type", `application/json`)
        .send(postData)
        .catch(console.error)
}
export default { replyMessage }
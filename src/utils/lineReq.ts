import agent from 'superagent'

const simpleImglinkMsgGenerator = (imgUrl: string, linktoUrl: string, altText: string = "none", label: string | null = null) => {
    const message = {
        "type": "template",
        "altText": altText,
        "template": {
            "type": "image_carousel",
            "columns": [
                {
                    "imageUrl": imgUrl,
                    "action": {
                        "type": "uri",
                        "uri": linktoUrl,
                    }
                }
            ]
        }
    }
    if (label !== null) { message.template.columns[0].action["label"] = label }

    return message
}

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

const getUserName = async (userId: string, channelAccessToken: string) => {
    const result = await agent.get(`https://api.line.me/v2/bot/profile/${userId}`)
        .set("Authorization", `Bearer ${channelAccessToken}`)
        .send()
        .catch(console.error)
    return result.body["displayName"]
}
export default {
    replyMessage,
    getUserName,
    simpleImglinkMsgGenerator
}
import lineReq from '../utils/lineReq'

const replyPreRegisterForm = async (replyToken: string, lineId: string, messageToken: string) => {
    const flex = {
        "type": "bubble",
        "body": {
            "type": "box",
            "layout": "vertical",
            "contents": [
                {
                    "type": "text",
                    "text": "Pre-Register",
                    "size": "3xl",
                    "align": "center",
                    "color": "#ffffff"
                }
            ],
            "action": {
                "type": "uri",
                "label": "action",
                "uri": `https://forms.clickup.com/3669379/f/3fzc3-33522/VSEIZR8TAHQ3JXWAE3?Line%20ID=${lineId}`
            },
            "background": {
                "type": "linearGradient",
                "angle": "45deg",
                "startColor": "#56B1A6",
                "endColor": "#41BAEE"
            }
        }
    }
    const message = {
        type: "flex",
        altText: `Pre-Register Form`,
        contents: flex
    }
    await lineReq.replyMessage(replyToken, String(messageToken), [message])
}

export default { replyPreRegisterForm }

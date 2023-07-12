export type MessageBuilder = {
    type: string,
    targetUrl?: string,
    imgs: [ImageUrl]
}
export type ImageUrl = {
    url: string
    altText: string
    label?: string
}

const a: MessageBuilder = {
    "type": "simpleImgLink",
    "targetUrl": "https://forms.clickup.com/3669379/f/3fzc3-33522/VSEIZR8TAHQ3JXWAE3",
    "imgs": [{
        "url": "https://cdn.pic.in.th/file/picinth/test-line-img1040x1040.jpeg",
        "altText": "Pre-Register Here",
        "label": "คลิก"
    }
    ]
}
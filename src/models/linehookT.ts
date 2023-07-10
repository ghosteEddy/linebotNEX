export type LineWebhook = {
    destination: string;
    events: Event[];
}

export type Event = {
    type: string;
    message?: Message;
    webhookEventId?: string;
    deliveryContext?: DeliveryContext;
    timestamp?: number;
    source: Source;
    replyToken?: string;
    mode?: string;
    postback?: { data: string }
}

export type DeliveryContext = {
    isRedelivery?: boolean;
}

export type Message = {
    type?: string;
    id?: string;
    text?: string;
}

export type Source = {
    type: string;
    userId: string;
}
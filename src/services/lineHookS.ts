import db from '../services/db'
import lineReq from '../utils/lineReq'

const checkOAClient = async (oaId: string) => {
    const oaBids = await db('oa_clients')
        .where('line_oa_uid', oaId)
    if (oaBids.length > 0) {
        return [true, oaBids[0]]
    } else {
        return [false, null]
    }
}

const userHandler = async (lineId: string, oaBid, channelAccessToken: string) => {
    // find if user exist create new if no record

    const result = await db('line_users').where({
        'line_uid': lineId,
        'oa_id_bin': oaBid
    })
    if (result.length > 0) {
        // pass
        return result[0]["line_id_bin"]
    } else {
        const displayname = await lineReq.getUserName(lineId, channelAccessToken)
        const newUserBid = await createNewUser(lineId, oaBid, displayname)
        return newUserBid
    }
}

const logActivity = async (userBid, oaBid, activity: string, activityLabel: string | null = null) => {
    await db("line_user_activities").insert({
        "line_oa_id_bin": oaBid,
        "line_id_bin": userBid,
        "activity": activity,
        "activity_label": activityLabel
    })
}

// TODO: If project got larger move these stuff to model / class
const createNewUser = async (lineId: string, oaBid, displayname: string) => {
    const truncated = lineId.substring(1)
    const result = await db("line_users").insert({
        "oa_id_bin": oaBid,
        "line_uid": lineId,
        "line_id": truncated,
        "initial_line_display_name": displayname
    })
    // mysql no natively support return id on insert
    const bid = await db('line_users').where('line_uid', lineId)
    console.info(`Congrats you got new user`)
    return bid[0].line_id_bin
}

const greeting = async (userId, messageBid, replyToken, channelAccessToken) => {
    // BECAREFUL: will always send user id as query parameter
    const result = await db("line_messages").where("message_id_bin", messageBid)
    const msgBuilder = JSON.parse(result[0].message_json_spec)
    msgBuilder.targetUrl = `${msgBuilder.targetUrl}?line%20ID=${userId}`
    const message = lineReq.lineMsgGenerator(msgBuilder)
    await lineReq.replyMessage(replyToken, channelAccessToken, [message])
    return
}

export default {
    userHandler,
    logActivity,
    checkOAClient,
    greeting
}
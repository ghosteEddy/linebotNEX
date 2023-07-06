import db from '../services/db'

const userHandler = async (lineId: string) => {
    // find if user exist create new if no record
    const result = await db('line_users').where('line_uid', lineId)
    if (result.length > 0) {
        // pass
        return result[0]["line_id_bin"]
    } else {
        const newUserBid = await createNewUser(lineId)
        return newUserBid
    }
}

const logActivity = async (userBid, activity: string) => {
    await db("line_user_activities").insert({
        "line_uid_bin": userBid,
        "activity": activity
    })
}

// TODO: If project got larger move these stuff to model / class
const createNewUser = async (lineId: string) => {
    const fullId = lineId
    const truncated = lineId.substring(1)
    const result = await db("line_users").insert({
        "line_uid": lineId,
        "line_id": truncated
    })
    const bid = await db('line_users').where('line_uid', lineId)
    console.info(`Congrats you got new user`)
    return bid[0].line_id_bin
}

export default {
    userHandler,
    logActivity
}
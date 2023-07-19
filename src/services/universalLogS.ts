import db from './db'

type UniversalLogDB = {
    identifier_1?: string
    identifier_1_value?: string
    identifier_2?: string
    identifier_2_value?: string | null
    activity: string,
    activity_detail?: string
    remark?: string
}

const log = async (logData: UniversalLogDB) => {
    // // support up to two data type per log each data => {key : value}
    // const log: UniversalLogDB = { activity: activity }
    // if (activityDetail != null) { log.activityDetail = activityDetail }
    // if (remark != null) { log.remark = remark }
    try {
        // const keys = Object.keys(datas)
        // log.id1 = keys[0]
        // log.id1val = datas[keys[0]]
        // log.id2 = keys[1]
        // log.id2val = datas[keys[1]]

        //    // insert into db
        await db("universal_logs").insert(logData)
    } catch (err) {
        console.error(err)
        // pass nothing could go wrong here
    }

}
export default { log }
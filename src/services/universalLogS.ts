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
    try {
        await db("universal_logs").insert(logData)
    } catch (err) {
        console.error(err)
        // pass nothing could go wrong here
    }

}
export default { log }
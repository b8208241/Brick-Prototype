export const getTopicData = (state) => state.topicData
export const getTopicThis = (state, topicId) => state.topicData[topicId]
export const getMemoRecords = (state, topicId) => state.topicData[topicId].memoRecords

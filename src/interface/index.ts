export interface ValueLabelInterface {
  value: String | Number | Boolean
  label: String
}

export interface SingerDetailInterface {
  name: String | null
  nickname: String | null
  identifyTag: Array<any>
  identities: Array<any>
  description: String | null
  briefDesc: String | null
}

export interface SingerInfoInterface {
  briefDesc: string | null
  topicData: Array<any>
  introduction: Array<any>
}

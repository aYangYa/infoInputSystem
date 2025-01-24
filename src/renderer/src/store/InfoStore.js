import { defineStore } from 'pinia'

export const useInfoStore = defineStore('info', {
  state: () => {
    return {
      questionIdList: [],
      studentAnswerNumberList: [],
      standardAnswerList: [],
      studentAnswerList: [],
      questionTypeList: ['平面几何', '解析几何', '函数', '代数']
    }
  },
  getters: {
    getQuestionIdList: (state) => {
      const questionIdList = [{ value: '' }]
      state.questionIdList.forEach((item) => {
        questionIdList.push({ value: item })
      })
      return questionIdList
    },
    getStudentAnswerNumberList: (state) => {
      const studentAnswerNumberList = [{ value: 0 }]
      state.studentAnswerNumberList.forEach((item) => {
        studentAnswerNumberList.push({ value: item })
      })
      return studentAnswerNumberList
    },
    getStandardAnswerList: (state) => {
      const standardAnswerList = []
      state.standardAnswerList.forEach((item, index) => {
        standardAnswerList.push({ value: index, label: item })
      })
      return standardAnswerList
    },
    getStudentAnswerList: (state) => {
      const studentAnswerList = []
      state.studentAnswerList.forEach((item, index) => {
        studentAnswerList.push({ value: index, label: item })
      })
      return studentAnswerList
    },
    getQuestionTypeList: (state) => {
      const questionTypeList = []
      state.questionTypeList.forEach((item) => {
        questionTypeList.push({ value: item })
      })
      return questionTypeList
    }
  },
  actions: {}
})

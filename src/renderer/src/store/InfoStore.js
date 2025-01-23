import { defineStore } from 'pinia'

export const useInfoStore = defineStore('info', {
  state: () => {
    return {
      questionIdList: [],
      studentAnswerNumberList: [],
      standardAnswerList: [],
      studentAnswerList: []
    }
  },
  getters: {
    getQuestionIdList: (state) => {
      const questionIdList = []
      state.questionIdList.forEach((item) => {
        questionIdList.push({ value: item })
      })
      return questionIdList
    },
    getStudentAnswerNumberList: (state) => {
      const studentAnswerNumberList = []
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
    }
  },
  actions: {}
})

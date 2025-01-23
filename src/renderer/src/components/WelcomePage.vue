<script setup>
import { onMounted, reactive, ref, watch } from 'vue'
import { useInfoStore } from '../store/InfoStore.js'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons-vue'
import PairInput from './pairInput.vue'

const InfoStore = useInfoStore()

const formItemLayout = {
  labelCol: {
    span: 5
  },
  wrapperCol: {
    span: 15
  }
}
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    span: 15,
    offset: 5
  }
}

const questionFormStateRef = ref(null)
const questionFormState = reactive({
  questionId: '',
  questionType: '',
  questionStem: '',
  configInfo: '',
  questionList: []
})

const standardFormStateRef = ref(null)
const standardFormState = reactive({
  questionId: '',
  standardAnswerList: []
})

const studentFormStateRef = ref(null)
const studentFormState = reactive({
  questionId: '',
  number: 0,
  studentAnswerList: [],
  semanticRelation: {
    matchPairs: [],
    conflictPairs: []
  }
})

const submitForm = (formRef, formState, type, url) => {
  formRef
    .validate()
    .then(() => {
      console.log('values', formState)
      updateData(formState, url, type)
    })
    .catch((error) => {
      console.log('error', error)
    })
}

const retrieveQuestionIdList = () => {
  fetch('http://localhost:8080/question/all')
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      InfoStore.questionIdList = data.data
    })
    .catch((error) => {
      console.error('Error:', error)
    })
}
const retrieveData = (type, questionId) => {
  let url, formState
  switch (type) {
    case 'question': {
      url = `http://localhost:8080/question/${questionId}`
      formState = questionFormState
      break
    }
    case 'standard': {
      url = `http://localhost:8080/standardAnswer/${questionId}`
      formState = standardFormState
      break
    }
  }
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      Object.assign(formState, data.data)
    })
    .catch((error) => {
      console.error('Error:', error)
    })
}
const retrieveStudentData = (questionId, number) => {
  fetch(`http://localhost:8080/studentAnswer/${questionId}/${number}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      Object.assign(studentFormState, data.data)
    })
    .catch((error) => {
      console.error('Error:', error)
    })
}
const retrieveStudentAnswerNumberList = (questionId) => {
  console.log(`http://localhost:8080/studentAnswer/${questionId}/all`)
  fetch(`http://localhost:8080/studentAnswer/${questionId}/all`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      InfoStore.studentAnswerNumberList = data.data
    })
    .catch((error) => {
      console.error('Error:', error)
    })
}
const retrieveStandardAnswerList = (questionId) => {
  fetch(`http://localhost:8080/standardAnswer/${questionId}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      InfoStore.standardAnswerList = data.data.standardAnswerList
    })
    .catch((error) => {
      console.error('Error:', error)
    })
}
const updateData = (data, url, type) => {
  fetch(url, {
    method: type,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
    })
    .catch((error) => {
      console.error('Error:', error)
    })
}

const removeItem = (index, list) => {
  list.splice(index, 1)
}
const addItem = (item, list) => {
  list.push(item)
}

const filterOptionQuestion = (input, option) => {
  questionFormState.questionId = input
  return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
}
const filterOptionStandard = (input, option) => {
  standardFormState.questionId = input
  return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
}
const filterOptionStudent = (input, option) => {
  studentFormState.questionId = input
  return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
}
const filterOptionStudentNumber = (input, option) => {
  studentFormState.number = parseInt(input, 10)
  console.log(input, option)
  return option.value === parseInt(input, 10)
}
onMounted(() => {
  watch(
    () => studentFormState.studentAnswerList,
    (newValue) => {
      InfoStore.studentAnswerList = newValue
    },
    { deep: true }
  )
  watch(
    () => standardFormState.standardAnswerList,
    (newValue) => {
      InfoStore.standardAnswerList = newValue
    },
    { deep: true }
  )
})
</script>

<template>
  <div
    style="
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: row;
    "
  >
    <div
      style="
        width: 50%;
        height: 100%;
        flex-direction: column;
        display: flex;
        justify-content: center;
        align-items: center;
      "
    >
      <div style="width: 50%; height: 4%">
        <a-button style="width: 100%; margin: 3px" type="primary" @click="retrieveQuestionIdList"
          >查询题目id列表
        </a-button>
      </div>
      <div style="width: 100%; height: 48%" class="form-container">
        <div class="title">题目信息录入</div>
        <div class="form-content">
          <a-form
            ref="questionFormStateRef"
            :model="questionFormState"
            name="basic"
            autocomplete="off"
            v-bind="formItemLayout"
          >
            <a-form-item
              label="题目id"
              name="questionId"
              :rules="[{ required: true, message: 'Please input your questionId!' }]"
            >
              <a-select
                v-model:value="questionFormState.questionId"
                :options="InfoStore.getQuestionIdList"
                show-search
                placeholder="选择或输入题目Id"
                :filter-option="filterOptionQuestion"
              ></a-select>
            </a-form-item>

            <a-form-item
              label="题目类型"
              name="questionType"
              :rules="[{ required: true, message: 'Please input your questionType!' }]"
            >
              <a-input v-model:value="questionFormState.questionType" />
            </a-form-item>

            <a-form-item
              label="总题干"
              name="questionStem"
              :rules="[{ required: true, message: 'Please input your questionStem!' }]"
            >
              <a-textarea
                v-model:value="questionFormState.questionStem"
                placeholder="总题干"
                :rows="4"
              />
            </a-form-item>

            <a-form-item
              label="配置文件信息"
              name="configInfo"
              :rules="[{ required: false, message: 'Please input your configInfo!' }]"
            >
              <a-textarea
                v-model:value="questionFormState.configInfo"
                placeholder="配置文件信息"
                :rows="4"
              />
            </a-form-item>

            <a-form-item
              v-for="(question, index) in questionFormState.questionList"
              :key="index"
              v-bind="index === 0 ? formItemLayout : formItemLayoutWithOutLabel"
              :label="index === 0 ? '小问列表' : ''"
              :name="['questionList', index]"
              :rules="{
                required: true,
                message: 'question can not be null',
                trigger: 'change'
              }"
            >
              <div style="width: 100%; display: flex; flex-direction: row; align-items: center">
                <strong>{{ index }}&emsp;</strong>
                <a-input
                  v-model:value="questionFormState.questionList[index]"
                  placeholder="please input question"
                  style="width: 90%; margin-right: 8px"
                />
                <MinusCircleOutlined @click="removeItem(index, questionFormState.questionList)" />
              </div>
            </a-form-item>
            <a-form-item v-bind="formItemLayoutWithOutLabel">
              <a-button
                type="dashed"
                style="width: 60%"
                @click="addItem('', questionFormState.questionList)"
              >
                <PlusOutlined />
                添加小问
              </a-button>
            </a-form-item>
            <a-form-item v-bind="formItemLayoutWithOutLabel">
              <a-button
                type="primary"
                @click="
                  submitForm(
                    questionFormStateRef,
                    questionFormState,
                    'POST',
                    'http://localhost:8080/question'
                  )
                "
                >录入
              </a-button>
              <a-button
                type="primary"
                style="margin-left: 10px"
                @click="
                  submitForm(
                    questionFormStateRef,
                    questionFormState,
                    'PUT',
                    'http://localhost:8080/question'
                  )
                "
                >更新
              </a-button>
              <a-button
                style="margin-left: 10px"
                @click="retrieveData('question', questionFormState.questionId)"
                >查询
              </a-button>
            </a-form-item>
          </a-form>
        </div>
      </div>
      <div style="width: 100%; height: 48%" class="form-container">
        <div class="title">标准答案录入</div>
        <div class="form-content">
          <a-form
            ref="standardFormStateRef"
            :model="standardFormState"
            name="basic"
            autocomplete="off"
            v-bind="formItemLayout"
          >
            <a-form-item
              label="题目id"
              name="questionId"
              :rules="[{ required: true, message: 'Please input your questionId!' }]"
            >
              <a-select
                v-model:value="standardFormState.questionId"
                :options="InfoStore.getQuestionIdList"
                show-search
                placeholder="选择或输入题目Id"
                :filter-option="filterOptionStandard"
              ></a-select>
            </a-form-item>

            <a-form-item
              v-for="(answer, index) in standardFormState.standardAnswerList"
              :key="index"
              v-bind="index === 0 ? formItemLayout : formItemLayoutWithOutLabel"
              :label="index === 0 ? '答案列表' : ''"
              :name="['standardAnswerList', index]"
              :rules="{
                required: true,
                message: 'answer can not be null',
                trigger: 'change'
              }"
            >
              <div style="width: 100%; display: flex; flex-direction: row; align-items: center">
                <strong>{{ index }}&emsp;</strong>
                <a-input
                  v-model:value="standardFormState.standardAnswerList[index]"
                  placeholder="please input answer"
                  style="width: 90%; margin-right: 8px"
                />
                <MinusCircleOutlined
                  @click="removeItem(index, standardFormState.standardAnswerList)"
                />
              </div>
            </a-form-item>
            <a-form-item v-bind="formItemLayoutWithOutLabel">
              <a-button
                type="dashed"
                style="width: 60%"
                @click="addItem('', standardFormState.standardAnswerList)"
              >
                <PlusOutlined />
                添加答案
              </a-button>
            </a-form-item>
            <a-form-item v-bind="formItemLayoutWithOutLabel">
              <a-button
                type="primary"
                @click="
                  submitForm(
                    standardFormStateRef,
                    standardFormState,
                    'POST',
                    'http://localhost:8080/standardAnswer'
                  )
                "
                >录入
              </a-button>
              <a-button
                type="primary"
                style="margin-left: 10px"
                @click="
                  submitForm(
                    standardFormStateRef,
                    standardFormState,
                    'PUT',
                    'http://localhost:8080/standardAnswer'
                  )
                "
                >更新
              </a-button>
              <a-button
                style="margin-left: 10px"
                @click="retrieveData('standard', standardFormState.questionId)"
                >查询
              </a-button>
            </a-form-item>
          </a-form>
        </div>
      </div>
    </div>
    <div style="width: 50%; height: 100%" class="form-container">
      <div class="title" style="height: 3%">学生答案录入</div>
      <div class="form-content" style="height: 97%">
        <a-form
          ref="studentFormStateRef"
          :model="studentFormState"
          name="basic"
          autocomplete="off"
          v-bind="formItemLayout"
        >
          <a-form-item
            label="题目id"
            name="questionId"
            :rules="[{ required: true, message: 'Please input your questionId!' }]"
          >
            <a-select
              v-model:value="studentFormState.questionId"
              :options="InfoStore.getQuestionIdList"
              show-search
              placeholder="选择或输入题目Id"
              :filter-option="filterOptionStudent"
            ></a-select>
          </a-form-item>

          <a-form-item
            label="答案序号"
            name="number"
            :rules="[{ required: true, message: 'Please input your number!' }]"
          >
            <a-select
              v-model:value="studentFormState.number"
              :options="InfoStore.getStudentAnswerNumberList"
              show-search
              placeholder="选择或输入答案序号"
              :filter-option="filterOptionStudentNumber"
            ></a-select>
          </a-form-item>

          <a-form-item v-bind="formItemLayoutWithOutLabel">
            <a-button
              style="width: 60%"
              @click="retrieveStudentAnswerNumberList(studentFormState.questionId)"
              >查询答案序号列表
            </a-button>
          </a-form-item>

          <a-form-item
            v-for="(answer, index) in studentFormState.studentAnswerList"
            :key="index"
            v-bind="index === 0 ? formItemLayout : formItemLayoutWithOutLabel"
            :label="index === 0 ? '答案列表' : ''"
            :name="['studentAnswerList', index]"
            :rules="{
              required: true,
              message: 'answer can not be null',
              trigger: 'change'
            }"
          >
            <div style="width: 100%; display: flex; flex-direction: row; align-items: center">
              <strong>{{ index }}&emsp;</strong>
              <a-input
                v-model:value="studentFormState.studentAnswerList[index]"
                placeholder="please input answer"
                style="width: 90%; margin-right: 8px"
              />
              <MinusCircleOutlined @click="removeItem(index, studentFormState.studentAnswerList)" />
            </div>
          </a-form-item>
          <a-form-item v-bind="formItemLayoutWithOutLabel">
            <a-button
              type="dashed"
              style="width: 60%"
              @click="addItem('', studentFormState.studentAnswerList)"
            >
              <PlusOutlined />
              添加答案
            </a-button>
          </a-form-item>
          <a-divider orientation="left">语义关系</a-divider>
          <a-form-item v-bind="formItemLayoutWithOutLabel">
            <a-button
              style="width: 60%"
              @click="retrieveStandardAnswerList(studentFormState.questionId)"
            >
              查询标准答案列表
            </a-button>
          </a-form-item>
          <a-form-item
            v-for="(matchPair, index) in studentFormState.semanticRelation.matchPairs"
            :key="index"
            v-bind="index === 0 ? formItemLayout : formItemLayoutWithOutLabel"
            :label="index === 0 ? '匹配对' : ''"
            :name="['semanticRelation', 'matchPairs', index]"
            :rules="{
              required: true,
              message: 'matchPair can not be null',
              trigger: 'change'
            }"
          >
            <pair-input
              v-model:value="studentFormState.semanticRelation.matchPairs[index]"
              :standard-answer-list="InfoStore.getStandardAnswerList"
              :student-answer-list="InfoStore.getStudentAnswerList"
            />
            <MinusCircleOutlined
              @click="removeItem(index, studentFormState.semanticRelation.matchPairs)"
            />
          </a-form-item>
          <a-form-item v-bind="formItemLayoutWithOutLabel">
            <a-button
              type="dashed"
              style="width: 60%"
              @click="
                addItem(
                  {
                    standardId: 0,
                    studentId: 0
                  },
                  studentFormState.semanticRelation.matchPairs
                )
              "
            >
              <PlusOutlined />
              添加匹配对
            </a-button>
          </a-form-item>
          <a-form-item
            v-for="(conflictPair, index) in studentFormState.semanticRelation.conflictPairs"
            :key="index"
            v-bind="index === 0 ? formItemLayout : formItemLayoutWithOutLabel"
            :label="index === 0 ? '冲突对' : ''"
            :name="['semanticRelation', 'conflictPairs', index]"
            :rules="{
              required: true,
              message: 'conflictPair can not be null',
              trigger: 'change'
            }"
          >
            <pair-input
              v-model:value="studentFormState.semanticRelation.conflictPairs[index]"
              :standard-answer-list="InfoStore.getStandardAnswerList"
              :student-answer-list="InfoStore.getStudentAnswerList"
            />
            <MinusCircleOutlined
              @click="removeItem(index, studentFormState.semanticRelation.conflictPairs)"
            />
          </a-form-item>
          <a-form-item v-bind="formItemLayoutWithOutLabel">
            <a-button
              type="dashed"
              style="width: 60%"
              @click="
                addItem(
                  {
                    standardId: 0,
                    studentId: 0
                  },
                  studentFormState.semanticRelation.conflictPairs
                )
              "
            >
              <PlusOutlined />
              添加冲突对
            </a-button>
          </a-form-item>
          <a-form-item v-bind="formItemLayoutWithOutLabel">
            <a-button
              type="primary"
              @click="
                submitForm(
                  studentFormStateRef,
                  studentFormState,
                  'POST',
                  'http://localhost:8080/studentAnswer'
                )
              "
              >录入
            </a-button>
            <a-button
              type="primary"
              style="margin-left: 10px"
              @click="
                submitForm(
                  studentFormStateRef,
                  studentFormState,
                  'PUT',
                  'http://localhost:8080/studentAnswer'
                )
              "
              >更新
            </a-button>
            <a-button
              style="margin-left: 10px"
              @click="retrieveStudentData(studentFormState.questionId, studentFormState.number)"
              >查询
            </a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.form-container {
  border: 1px solid #1b1b1f;
}

.form-content {
  height: 94%;
  width: 100%;
  overflow: auto;
}

.title {
  height: 6%;
  width: 100%;
  background: #808080;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

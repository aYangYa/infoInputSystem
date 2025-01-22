<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useInfoStore } from '../store/InfoStore.js'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons-vue'
import PairInput from './pairInput.vue'

const InfoStore = useInfoStore()

const formItemLayout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 12
  }
}
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    span: 12,
    offset: 8
  }
}

const questionFormStateRef = ref(null)
const questionFormState = reactive({
  questionId: 'xdfvsdaf',
  questionType: '平面几何',
  questionStem: '',
  configInfo: '',
  questionList: []
})

const standardFormStateRef = ref(null)
const standardFormState = reactive({
  questionId: 'xdfvsdaf',
  standardAnswerList: []
})

const studentFormStateRef = ref(null)
const studentFormState = reactive({
  questionId: 'xdfvsdaf',
  number: 1,
  studentAnswerList: [],
  semanticRelation: {
    matchPairs: [
      {
        standardId: 1,
        studentId: 2
      },
      {
        standardId: 2,
        studentId: 1
      }
    ],
    conflictPairs: [
      {
        standardId: 3,
        studentId: 3
      }
    ]
  }
})

const submitForm = (formRef, formState) => {
  formRef
    .validate()
    .then(() => {
      console.log('values', formState)
    })
    .catch((error) => {
      console.log('error', error)
    })
}

const removeItem = (index, list) => {
  list.splice(index, 1)
}
const addItem = (item, list) => {
  list.push(item)
}
onMounted(() => {})
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
    <div style="width: 50%; height: 100%; flex-direction: column">
      <div style="width: 100%; height: 50%" class="form-container">
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
              <a-input v-model:value="questionFormState.questionId" />
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
              <a-input v-model:value="questionFormState.questionStem" />
            </a-form-item>

            <a-form-item
              label="配置文件信息"
              name="configInfo"
              :rules="[{ required: false, message: 'Please input your configInfo!' }]"
            >
              <a-input v-model:value="questionFormState.configInfo" />
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
              <a-input
                v-model:value="questionFormState.questionList[index]"
                placeholder="please input question"
                style="width: 80%; margin-right: 8px"
              />
              <MinusCircleOutlined @click="removeItem(index, questionFormState.questionList)" />
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
                html-type="submit"
                @click="submitForm(questionFormStateRef, questionFormState)"
                >录入
              </a-button>
              <a-button style="margin-left: 10px">查询</a-button>
            </a-form-item>
          </a-form>
        </div>
      </div>
      <div style="width: 100%; height: 50%" class="form-container">
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
              <a-input v-model:value="standardFormState.questionId" />
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
              <a-input
                v-model:value="standardFormState.standardAnswerList[index]"
                placeholder="please input answer"
                style="width: 80%; margin-right: 8px"
              />
              <MinusCircleOutlined
                @click="removeItem(index, standardFormState.standardAnswerList)"
              />
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
                html-type="submit"
                @click="submitForm(standardFormStateRef, standardFormState)"
                >录入
              </a-button>
              <a-button style="margin-left: 10px">查询</a-button>
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
            <a-input v-model:value="studentFormState.questionId" />
          </a-form-item>

          <a-form-item
            label="答案序号"
            name="number"
            :rules="[{ required: true, message: 'Please input your number!' }]"
          >
            <a-input v-model:value="studentFormState.number" />
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
            <a-input
              v-model:value="studentFormState.studentAnswerList[index]"
              placeholder="please input answer"
              style="width: 80%; margin-right: 8px"
            />
            <MinusCircleOutlined @click="removeItem(index, studentFormState.studentAnswerList)" />
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
          <a-divider />
          <a-form-item
            label="语义关系"
            name="semanticRelation"
            :rules="[{ required: false, message: 'Please input your number!' }]"
          >
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
            <pair-input v-model:value="studentFormState.semanticRelation.matchPairs[index]" />
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
            <pair-input v-model:value="studentFormState.semanticRelation.conflictPairs[index]" />
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
              html-type="submit"
              @click="submitForm(studentFormStateRef, studentFormState)"
              >录入
            </a-button>
            <a-button style="margin-left: 10px">查询</a-button>
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
  background: #498ecc;
}

.title {
  height: 6%;
  width: 100%;
  background: #42d392;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

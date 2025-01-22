<template>
  <span>
    <a-select
      :value="value.standardId"
      style="width: 43%"
      :options="standardAnswerList"
      @change="onStandardIdChange"
    ></a-select>
    <a-select
      :value="value.studentId"
      style="width: 43%; margin: 0 8px"
      :options="studentAnswerList"
      @change="onStudentIdChange"
    ></a-select>
  </span>
</template>

<script>
import { defineComponent } from 'vue'
import { Form } from 'ant-design-vue'

export default defineComponent({
  props: {
    value: {
      standardId: Number,
      studentId: Number,
      type: Object
    },
    standardAnswerList: {
      type: Array
    },
    studentAnswerList: {
      type: Array
    }
  },
  emits: ['update:value'],
  setup(props, { emit }) {
    const formItemContext = Form.useInjectFormItemContext()
    const triggerChange = (changedValue) => {
      emit('update:value', { ...props.value, ...changedValue })
      formItemContext.onFieldChange()
    }
    const onStandardIdChange = (newStandardId) => {
      triggerChange({ standardId: newStandardId })
    }
    const onStudentIdChange = (newStudentId) => {
      triggerChange({ studentId: newStudentId })
    }

    return {
      onStandardIdChange,
      onStudentIdChange
    }
  }
})
</script>

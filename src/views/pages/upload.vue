<route lang="yaml">
  meta:
    title: 导航2-2-1
</route>

<script setup lang="ts">
import { ElMessage } from 'element-plus'

const files = ref([
  {
    name: 'Fantastic-admin.png',
    url: 'https://fantastic-admin.hurui.me/logo.png',
  },
])

function handleSuccess3(res: any, file: any, fileList: any) {
  if (res.error === '') {
    files.value.push({
      name: file.name,
      url: res.error === '' ? res.data.path : '',
    })
  }
  else {
    fileList.pop()
    ElMessage.warning(res.error)
  }
}
</script>

<template>
  <div>
    <PageMain title="上传文件">
      <FileUpload :files="files" :ext="['md', 'text']" :size="100" :max="100" action="/api/file/upload" @on-success="handleSuccess3" />
    </PageMain>
  </div>
</template>

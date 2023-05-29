<script lang="ts" setup>
import { reactive, ref } from "vue";
import { speck } from "ttspeech";

const speechUttrOptions = reactive({
  text: "如果你也和我一样，那我觉得，这个事情，真的太酷啦！",
  lang: "zh-CN",
  rate: 1,
  pitch: 1,
  voice: null,
});

const specking = ref(false);

const onplay = async () => {
  specking.value = true;
  await speck(speechUttrOptions);
  specking.value = false;
};
</script>

<template>
  <div class="container">
    <el-card class="container__box-card">
      <template #header>
        <h2>Ttspeech Demo</h2>
      </template>
      <el-input
        v-model="speechUttrOptions.text"
        :rows="4"
        type="textarea"
        placeholder="Please input"
      />
      <div class="mt-4">
        <span>Pitch</span>
        <el-slider
          v-model="speechUttrOptions.pitch"
          :min="0"
          :max="2"
          :step="0.1"
        />
      </div>
      <div class="mt-4">
        <span>Rate</span>
        <el-slider
          v-model="speechUttrOptions.rate"
          :min="0.1"
          :max="10"
          :step="0.1"
        />
      </div>
      <el-button class="mt-4" type="primary" @click="onplay" :loading="specking">Play</el-button>
    </el-card>
  </div>
</template>

<style lang="less" scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .container__box-card {
    width: 60vw;
  }
}

.mt-4 {
  margin-top: 16px;
}
</style>

<template>
  <main class="main-content mx-auto flex max-w-300 flex-col gap-2.5 px-1 pt-9 px-5 lg:flex-row">
    <!--    <div>去水印（涂抹水印所在区域）</div>-->
    <section class="editor">
      <div class="flex-1 mr-20">
        <section class="toolbar whitespace-nowrap justify-between lg:justify-center">
          <el-radio-group v-model="compare" @change="handleRadioChange">
            <el-radio-button value="before">before</el-radio-button>
            <el-radio-button value="after">after</el-radio-button>
          </el-radio-group>
          <el-upload
            :show-file-list="false"
            :limit="1"
            :before-upload="handleBeforeUpload"
            action="https://ai.photoes.ai/user/img/updateImg"
          >
            <el-button
              type="primary"
              class="flex h-[44px] lg:w-[144px] items-center justify-center text-4 text-white transition"
            >
              Upload
            </el-button>
          </el-upload>
        </section>
        <div class="canvas-container pos-relative">
          <canvas id="canvas" ref="canvasRef"></canvas>
        </div>

      </div>
      <div class="sidebar w-75 hidden lg:block">
        <el-button type="primary" class="mt-24 text-6 h-22 w-75" @click="downLoad">{{
            downloadImg ? "Download HD free" : "生成照片"
          }}
        </el-button>
        <p class="mt-4 text-center text-18px fw-900 text-[#777777]">Full {{ w + "*" + h }}</p>
      </div>

    </section>

    <!--    <el-drawer v-model="colorDrawerVisible" direction="btt" :show-close="false" :with-header="false">-->
    <!--      <span>Hi, there!</span>-->
    <!--    </el-drawer>-->

    <Mask v-show="isMask" @close-mask="isMask = false" type="detail" @done="renderCanvas"></Mask>
  </main>
</template>

<script setup lang="ts">
import {onMounted, ref, onBeforeUnmount} from "vue";
import {useRoute} from "vue-router";

import {uploadImage, removeBackGround} from '@/api/modules/ai';
import useFile, {Action} from "@/hooks/useFile";
import useSnapshot from "@/hooks/useSnapshot";

const {handleAction} = useFile();
const {getDrawData,getLastDrawData, getLength, pushDrawData, clearDrawData, popDrawData} = useSnapshot("drawStack");
const {
  getLastDrawData: getSubLastDrawData,
  getLength: getSubLength,
  pushDrawData: pushSubDrawData,
  popDrawData: popSubDrawData,
  clearDrawData: clearSubData
} = useSnapshot("subStack");

const downloadImg = ref(true);
const compare = ref("after");

const resultMain = ref();
const resultMark = ref();

onMounted(async () => {
   renderCanvas()
});

onBeforeUnmount(async () => {
  await clearSubData();
  await clearDrawData();
});

const isMask = ref(false);

const readImportedImage = (img) => {
  fetch(img)
    .then(response => response.blob())
    .then(async blob => {
      // 上传图片并绘制
      return blob
    })
    .catch(error => console.error("Error reading imported image:", error));
};

/* upload */
const handleBeforeUpload = async file => {
  await clearSubData();
  await clearDrawData();
  handleAction(file, Action["UPLOAD"], renderCanvas, 2);
  // getWmImg(file)
  return false;
};

/* radio */
const handleRadioChange = async () => {
 renderCanvas()
};

/* canvas */
const canvasRef = ref();

const w = ref(0);
const h = ref(0);

async function renderCanvas() {
  let target;
  target = await getDrawData();
  const {main, mask, color, draw, bg, restore,result} = target[target.length-1];
  drawCanvas(main, mask, color, draw, bg, restore,result);
}

const drawCanvas = async (main, mask, color, draw, bg, restore, result) => {
  const canvas = canvasRef.value;
  const ctx = canvas.getContext("2d");
  ctx.save();
  const mainImage = new Image();
  mainImage.src = compare.value === "after" ? mask :main;
  await imgLoaded(mainImage);

  const canvasWidth = mainImage.width;
  const canvasHeight = mainImage.height;
  w.value = canvasWidth;
  h.value = canvasHeight;

  const scale = canvasHeight/500
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  const mainAspectRatio = mainImage.width / mainImage.height;
  const canvasAspectRatio = canvasWidth / canvasHeight;
  // let drawWidth, drawHeight, offsetX, offsetY;

  console.log(scale)
  ctx.drawImage(mainImage, 0, 0, canvasWidth, canvasHeight);

  const mainImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  ctx.putImageData(mainImageData, 0, 0);
};

const imgLoaded = (img): Promise<void> => {
  return new Promise(resolve => {
    img.onload = () => {
      resolve();
    };
  });
};

/**
 * 下载图片
 */
function downLoad() {
  // 生成照片 下载生成后的照片
  downloadImage();
}

function downloadImage() {
  const canvas = canvasRef.value;
  const link = document.createElement("a");
  link.href = canvas.toDataURL("image/png");
  link.download = "cropped-image.png";
  link.click();
}

</script>

<style scoped lang="scss">
.main-content {
  display: flex;
  background: rgb(247 246 246);
  flex-direction: column;
  height: 100%;
  box-sizing: border-box;
  align-items: center;
}

.toolbar {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.toolbar button {
  margin: 0 10px;
  padding: 10px 20px;
  cursor: pointer;
}

.re-upload {
  background-color: blue;
  color: white;
}

.tools {
  display: flex;

  margin-left: 20px;
}

.editor {
  display: flex;
  width: 100%;
  justify-content: space-between;
}

.sidebar {
  padding-top: 80px;
  flex-direction: column;
  align-items: center;
}

.color-picker,
.picture-picker {
  margin-bottom: 20px;
}

.colors,
.pictures {
  display: flex;
  flex-wrap: wrap;
  margin-top: 12px;
}

.color {
  border-radius: 100px;
  width: 40px;
  height: 40px;
  margin: 5px;
}

.picture {
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  border: 1px solid #333;
  width: 70px;
  height: 70px;
  margin: 5px;
}

.canvas-container {
  border: 0.1px solid #ccc;

  --board-black-color: #f8f9f9;
  --board-white-color: transparent;
  // background-color: red;
  background-image: linear-gradient(45deg, var(--board-black-color) 25%, var(--board-white-color) 25%),
  linear-gradient(-45deg, var(--board-black-color) 25%, var(--board-white-color) 25%),
  linear-gradient(45deg, var(--board-white-color) 75%, var(--board-black-color) 75%),
  linear-gradient(-45deg, var(--board-white-color) 75%, var(--board-black-color) 75%);
  background-size: 20px 20px;
  background-position: 0 0,
  0 10px,
  10px -10px,
  -10px 0;
  border-radius: 20px;
  overflow: hidden;

  canvas {
    width: 100%;
    height: 100%;
    border-radius: 20px;
  }
}

.erase,
.restore {
  margin: 10px 0;
  padding: 10px 20px;
  cursor: pointer;
}

.erase {
  background-color: #ccc;
}

.restore {
  background-color: blue;
  color: white;
}

.download {
  background-color: blue;
  color: white;
}

.brush-size {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
}

:deep(.el-radio-button__inner) {
  height: 40px;
  background: #e2e3e8;
  border-radius: 8px !important;
  color: #777;
  font-size: 16px;
  border: #e2e3e8;
  font-weight: 800;
  line-height: normal;
}

:deep(.el-radio-group) {
  background-color: #e2e3e8;
  border-radius: 8px !important;
  border: white;
  font-weight: 800;
  white-space: nowrap !important;
}

:deep(.el-radio-button__original-radio:checked + .el-radio-button__inner) {
  background: white;
  color: #000;
  border-color: #e2e3e8;
  box-shadow: none;
  font-weight: 800;
}

:deep(.el-slider) {
  --el-slider-border-radius: 10px;
  --el-slider-height: 17px;
  --el-slider-button-size: 20px;
  --el-slider-button-wrapper-size: 48px;
}
</style>

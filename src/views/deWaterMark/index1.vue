<template>
  <main class="main-content mx-auto flex max-w-300 flex-col gap-2.5 px-1 pt-9 px-5 lg:flex-row">
<!--    <div>去水印（涂抹水印所在区域）</div>-->
    <section class="editor">
      <div>
        <section class="toolbar whitespace-nowrap justify-between lg:justify-center">
          <el-radio-group v-model="compare" @change="handleRadioChange">
            <el-radio-button value="before">before</el-radio-button>
            <el-radio-button value="after">after</el-radio-button>
          </el-radio-group>
          <el-upload
            :show-file-list="false"
            :limit="1"
            :before-upload="handleBeforeUpload"
            action="http://34.46.51.161/api/remove"
          >
            <el-button
              type="primary"
              class="flex h-[44px] lg:w-[144px] items-center justify-center text-4 text-white transition"
            >
              Upload
            </el-button>
          </el-upload>
          <div class="tools items-center fixed right-4 top-6 lg:static">
            <svg-icon
              name="jian"
              :icon-style="{ height: '30px', width: '30px' }"
              class="mr-2.5 cursor-pointer"
              @click="handleZoomOut"
            ></svg-icon>
            <svg-icon
              name="jia"
              :icon-style="{ height: '30px', width: '30px' }"
              class="mr-2.5 cursor-pointer"
              @click="handleZoomIn"
            ></svg-icon>
<!--            <el-divider direction="vertical" class="h-7 border-#888"></el-divider>-->
<!--            <svg-icon-->
<!--              name="chehui"-->
<!--              :icon-style="{ height: '30px', width: '30px' }"-->
<!--              class="mx-2.5 cursor-pointer"-->
<!--              :class="{ 'opacity-20%': isRecallDisable }"-->
<!--              @click="handleRecall"-->
<!--            ></svg-icon>-->

<!--            <svg-icon-->
<!--              name="zhongzuo"-->
<!--              :icon-style="{ height: '30px', width: '30px' }"-->
<!--              class="cursor-pointer"-->
<!--              :class="{ 'opacity-20%': isRedoDisable }"-->
<!--              @click="handleRedo"-->
<!--            ></svg-icon>-->
          </div>
        </section>
        <div class="canvas-container pos-relative">
          <canvas id="canvas" ref="canvasRef"></canvas>
          <canvas class="pos-absolute top-0 left-0" id="deMark" ref="deMarkRef" ></canvas>
        </div>
        <div class="lg:hidden mt-5 flex justify-evenly">
          <div
            v-for="(item, index) in toolbar"
            :key="item.prop"
            class="flex flex-col justify-center items-center"
            @click="handleToolbarClick(item.prop)"
          >
            <span
              :style="{ backgroundColor: index === 0 ? '#4a4af4' : 'white' }"
              class="inline-block w-12 h-12 border-#d6d4d4 border-solid border-1 rounded-25 flex justify-center items-center"
            >
              <svg-icon :name="item.icon" :icon-style="{ width: '25px', height: '25px' }"></svg-icon>
            </span>
            <span class="mt-1 text-3 fw-800">{{ item.prop }}</span>
          </div>
        </div>

<!--        <p class="my-20 whitespace-pre-wrap text-center text-14px font-medium text-[#777777ee]">-->
<!--          Don't forget to download your file. Auto-deletes in 30 minutes.-->
<!--        </p>-->
      </div>
      <div class="sidebar w-75 hidden lg:block">
<!--        <div class="flex flex-row items-center gap-5">-->
<!--          <el-button-->
<!--            class="h-[60px] w-[135px] border border-black text-5 text-black fw-600"-->
<!--            :type="isErase ? 'primary' : 'default'"-->
<!--            :class="{'text-white': isErase }"-->
<!--            @click="handleEraseClick"-->
<!--          >Erase-->
<!--          </el-button>-->
<!--          <el-button-->
<!--            class="h-[60px] w-[135px]  border border-black text-5 text-black fw-600"-->
<!--            :type="isRestore ? 'primary' : 'default'"-->
<!--            :class="{ 'text-white': isRestore }"-->
<!--            @click="handleRestoreClick"-->
<!--          >Restore-->
<!--          </el-button>-->
<!--        </div>-->
<!--        <el-button-->
<!--          class="h-[60px] w-[135px]  border border-black text-5 text-black fw-600"-->
<!--          :type="isRestore ? 'primary' : 'default'"-->
<!--          :class="{ 'text-white': isRestore }"-->
<!--          @click="sureRemoveArea"-->
<!--        >生成照片-->
<!--        </el-button>-->
<!--        <div class="mt-20 w-full">-->
<!--          <h3 class="text-5 text-#000 text-center">Brush Size</h3>-->
<!--          <el-slider v-model="brushSize" size="large" :show-tooltip="false" :min="5" :max="50" class="w-full" />-->
<!--        </div>-->
        <el-button type="primary" class="mt-24 text-6 h-22 w-75" @click="downLoad">{{ downloadImg? 'Download HD free':'生成照片' }}</el-button>
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
import { onMounted, ref, onBeforeUnmount } from "vue";
import one from "@/assets/images/home/1.png";
import two from "@/assets/images/home/2.jpg";
import three from "@/assets/images/home/3.jpg";
import four from "@/assets/images/home/4.jpg";
import Mask from "@/components/Mask/index.vue";
import { useRoute } from "vue-router";
import bg1 from "@/assets/images/detail/bg-1.jpg";
import bg2 from "@/assets/images/detail/bg-2.jpg";
import bg3 from "@/assets/images/detail/bg-3.jpg";
import bg4 from "@/assets/images/detail/bg-4.jpg";
import bg5 from "@/assets/images/detail/bg-5.jpg";

import useSnapshot from "@/hooks/useSnapshot";
// import {removeBackGround} from "@/api/modules/ai"

const { handleAction } = useFile();
const { getLength, pushDrawData, clearDrawData, popDrawData } = useSnapshot("drawDeMark");
const { getLastDrawData,getDrawData} = useSnapshot("deMark");
const {
  getLastDrawData: getSubLastDrawData,
  getLength: getSubLength,
  pushDrawData: pushSubDrawData,
  popDrawData: popSubDrawData,
  clearDrawData: clearSubData
} = useSnapshot("subDeMark");

const bgArr = [bg1, bg2, bg3, bg4, bg5];

const toolbar = [
  {
    icon: "xiazai",
    prop: "Download"
  },
  {
    icon: "Color",
    prop: "Color"
  },
  {
    icon: "tupian",
    prop: "Picture"
  },
  {
    icon: "xiangpica",
    prop: "Erase"
  },
  {
    icon: "mofabang",
    prop: "Restore"
  }
];

const colorDrawerVisible = ref(false);

const downloadImg = ref(true)

const handleToolbarClick = type => {
  if (type == "Download") {
    downloadImage();
  } else if (type == "Color") {
    colorDrawerVisible.value = true;
  } else if (type == "Picture") {
  } else if (type === "Erase") {
  } else if (type == "Restore") {
  }
};

const imgSrc = ref('http://localhost:3000/downloadImage/watered/20240912105729dog.jpg')

const route = useRoute();
const imgArr = [one, two, three, four];

/* compare */
const compare = ref("after");
const brushSize = ref(30);
onMounted(async () => {

  // // index静态图片 from上传图片
  // const { index, from } = route.query;
  //
  // await clearSubData();
  // if (from) {
  //   renderCanvas();
  // } else {
  //   // 清理数据
  //   await clearDrawData();
  // }
  //
  // if (index) readImportedImage(imgArr[index], Action["UPLOAD"]);
  // document.addEventListener("dragenter", handleDragEnter);
  // document.addEventListener("dragover", handleDragOver);
  // document.addEventListener("dragleave", hanleDragLeave);
});

const isMask = ref(false);

const handleDragEnter = e => {
  e.preventDefault();
  e.stopPropagation();
  isMask.value = true;
};
const handleDragOver = e => {
  e.preventDefault();
  e.stopPropagation();
};
const hanleDragLeave = e => {
  console.log(e.target.classList);

  e.preventDefault();
  if (e.target.classList.contains("mask")) {
    isMask.value = false;
  }
};

onBeforeUnmount(async () => {
  await clearSubData();
  await clearDrawData();
  document.removeEventListener("dragenter", handleDragEnter);
  document.removeEventListener("dragover", handleDragOver);
  document.removeEventListener("dragleave", hanleDragLeave);
});

const readImportedImage = (img, action) => {
  fetch(img)
    .then(response => response.blob())
    .then(async blob => {
      // 上传图片并绘制
      handleAction(blob, action, renderCanvas);
    })
    .catch(error => console.error("Error reading imported image:", error));
};

/* upload */
const handleBeforeUpload = file => {
  handleAction(file, Action["UPLOAD"], renderBefore);
  return false;
};

const sureRemoveArea = () => {

  const canvas = deMarkRef.value;
  const link = document.createElement("a");
  link.href = canvas.toDataURL("image/png");
  link.download = "cropped-image.png";
  link.click();
}

/* radio */
const handleRadioChange = val => {
  if (val == "before") {
    renderBefore();
  } else {
    renderCanvas();
  }
};
let scale = 1;
const handleZoomIn = () => {
  scale += 0.1;
  const canvas = canvasRef.value;
  canvas.style.transform = `scale(${scale})`;
  deMarkRef.value.style.transform = `scale(${scale})`;
};

const handleZoomOut = () => {
  scale -= 0.1;
  const canvas = canvasRef.value;
  canvas.style.transform = `scale(${scale})`;
  deMarkRef.value.style.transform = `scale(${scale})`;
};

/* color */

const colorArr = [
  [255, 255, 255],
  [0, 0, 0],
  [254, 247, 134],
  [240, 150, 91],
  [237, 106, 101],
  [246, 195, 67],
  [237, 107, 44],
  [95, 207, 69]
];
const changeColor = val => {
  handleAction(val, Action["COLOR"], renderCanvas);
};

/* pic */
const handlePicClick = item => {
  readImportedImage(item, Action["BG"]);
};

/* canvas */
const canvasRef = ref();
/* 涂抹图层canvas */
const deMarkRef = ref()

const w = ref(0);
const h = ref(0);

const renderBefore = async () => {
  const { main } = await getLastDrawData();
  const canvas = canvasRef.value;
  const canvasDeMark = deMarkRef.value;
  const ctx = canvas.getContext("2d");
  ctx.save();
  const mainImage = new Image();
  mainImage.src = main;
  await imgLoaded(mainImage);

  const canvasWidth = mainImage.width;
  const canvasHeight = mainImage.height;
  w.value = canvasWidth;
  h.value = canvasHeight;
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  canvasDeMark.width = canvasWidth;
  canvasDeMark.height = canvasHeight;

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  const mainAspectRatio = mainImage.width / mainImage.height;
  const canvasAspectRatio = canvasWidth / canvasHeight;
  let drawWidth, drawHeight, offsetX, offsetY;

  // 缩放
  if (mainAspectRatio > canvasAspectRatio) {
    drawWidth = canvasWidth;
    drawHeight = canvasWidth / mainAspectRatio;
    offsetX = 0;
    offsetY = (canvasHeight - drawHeight) / 2;
  } else {
    drawWidth = canvasHeight * mainAspectRatio;
    drawHeight = canvasHeight;
    offsetX = (canvasWidth - drawWidth) / 2;
    offsetY = 0;
  }

  ctx.drawImage(mainImage, offsetX, offsetY, drawWidth, drawHeight);

  const mainImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  ctx.putImageData(mainImageData, 0, 0);
};

const renderCanvasWithBg = async (main, mask, color, draw, bg, restore) => {
  const canvas = canvasRef.value;
  const ctx = canvas.getContext("2d");
  const maskImage = new Image();
  const mainImage = new Image();
  const bgImage = new Image();
  maskImage.src = mask;
  mainImage.src = main;
  bgImage.src = bg;

  await Promise.all([imgLoaded(maskImage), imgLoaded(mainImage), imgLoaded(bgImage)]);

  const canvasWidth = mainImage.width;
  const canvasHeight = mainImage.height;
  w.value = canvasWidth;
  h.value = canvasHeight;
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  const mainAspectRatio = mainImage.width / mainImage.height;
  const canvasAspectRatio = canvasWidth / canvasHeight;
  let drawWidth, drawHeight, offsetX, offsetY;

  if (mainAspectRatio > canvasAspectRatio) {
    drawWidth = canvasWidth;
    drawHeight = canvasWidth / mainAspectRatio;
    offsetX = 0;
    offsetY = (canvasHeight - drawHeight) / 2;
  } else {
    drawWidth = canvasHeight * mainAspectRatio;
    drawHeight = canvasHeight;
    offsetX = (canvasWidth - drawWidth) / 2;
    offsetY = 0;
  }

  ctx.drawImage(bgImage, offsetX, offsetY, drawWidth, drawHeight);
  const bgImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  ctx.drawImage(mainImage, offsetX, offsetY, drawWidth, drawHeight);
  const mainImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const copyData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  ctx.drawImage(maskImage, offsetX, offsetY, drawWidth, drawHeight);
  const maskImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < mainImageData.data.length; i += 4) {
    if (maskImageData.data[i] === 0 && maskImageData.data[i + 1] === 0) {
      mainImageData.data[i] = bgImageData.data[i];
      mainImageData.data[i + 1] = bgImageData.data[i + 1];
      mainImageData.data[i + 2] = bgImageData.data[i + 2];
    }
  }
  // 笔刷 恢复
  const applyBrush = (data, path, brush, sourceData, isDraw?) => {
    const radius = Math.floor(brush / 2);
    for (let i = 0; i < path.length; i++) {
      const x = Math.floor(path[i].x);
      const y = Math.floor(path[i].y);
      for (let dx = -radius; dx <= radius; dx++) {
        for (let dy = -radius; dy <= radius; dy++) {
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance <= radius) {
            const nx = x + dx;
            const ny = y + dy;
            if (nx >= 0 && nx < canvas.width && ny >= 0 && ny < canvas.height) {
              const index = (ny * canvas.width + nx) * 4;
              data[index] = sourceData[index];
              data[index + 1] = sourceData[index + 1];
              data[index + 2] = sourceData[index + 2];
              if (!isDraw) {
                data[index + 3] = sourceData[index + 3];
              }
            }
          }
        }
      }
    }
  };

  if (isErase.value) {
    if (restore) {
      for (let k = 0; k < restore.length; k++) {
        applyBrush(mainImageData.data, restore[k].path, restore[k].brush, copyData.data);
      }
    }
    if (draw) {
      for (let k = 0; k < draw.length; k++) {
        applyBrush(mainImageData.data, draw[k].path, draw[k].brush, bgImageData.data, true);
      }
    }
  } else {
    if (draw) {
      for (let k = 0; k < draw.length; k++) {
        applyBrush(mainImageData.data, draw[k].path, draw[k].brush, bgImageData.data, true);
      }
    }
    if (restore) {
      for (let k = 0; k < restore.length; k++) {
        applyBrush(mainImageData.data, restore[k].path, restore[k].brush, copyData.data);
      }
    }
  }

  ctx.putImageData(mainImageData, 0, 0);
};

const renderCanvasNormal = async (main, mask, color, draw, bg, restore) => {
  const canvas = canvasRef.value;
  // console.log( '221122121122222222' );
  const ctx = canvas.getContext("2d");
  // const maskImage = new Image();
  const mainImage = new Image();
  // maskImage.src = mask;
  mainImage.src = main;
  await imgLoaded(mainImage)
  // await Promise.all([imgLoaded(maskImage), imgLoaded(mainImage)]);

  const canvasWidth = mainImage.width;
  const canvasHeight = mainImage.height;
  w.value = canvasWidth;
  h.value = canvasHeight;
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  const mainAspectRatio = mainImage.width / mainImage.height;
  const canvasAspectRatio = canvasWidth / canvasHeight;
  let drawWidth, drawHeight, offsetX, offsetY;
  // 缩放
  if (mainAspectRatio > canvasAspectRatio) {
    drawWidth = canvasWidth;
    drawHeight = canvasWidth / mainAspectRatio;
    offsetX = 0;
    offsetY = (canvasHeight - drawHeight) / 2;
  } else {
    drawWidth = canvasHeight * mainAspectRatio;
    drawHeight = canvasHeight;
    offsetX = (canvasWidth - drawWidth) / 2;
    offsetY = 0;
  }

  ctx.drawImage(mainImage,canvas.width, canvas.height);

  const mainImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  // const copyData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  // ctx.drawImage(maskImage, offsetX, offsetY, drawWidth, drawHeight);
  //
  // const maskImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  //
  // for (let i = 0; i < mainImageData.data.length; i += 4) {
  //   if (maskImageData.data[i] === 0 && maskImageData.data[i + 1] === 0) {
  //     if (color) {
  //       mainImageData.data[i] = color[0];
  //       mainImageData.data[i + 1] = color[1];
  //       mainImageData.data[i + 2] = color[2];
  //     } else {
  //       mainImageData.data[i + 3] = 0;
  //     }
  //   }
  // }
  // 笔刷
  const applyBrush = (data, path, brush, _data, isDraw?) => {
    const radius = Math.floor(brush / 2);
    for (let i = 0; i < path.length; i++) {
      const x = Math.floor(path[i].x);
      const y = Math.floor(path[i].y);
      for (let dx = -radius; dx <= radius; dx++) {
        for (let dy = -radius; dy <= radius; dy++) {
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance <= radius) {
            const nx = x + dx;
            const ny = y + dy;
            if (nx >= 0 && nx < canvas.width && ny >= 0 && ny < canvas.height) {
              const index = (ny * canvas.width + nx) * 4;
              if (isDraw) {
                if (_data) {
                  data[index] = _data[0];
                  data[index + 1] = _data[1];
                  data[index + 2] = _data[2];
                } else {
                  data[index + 3] = 0;
                }
              } else {
                data[index] = _data[index];
                data[index + 1] = _data[index + 1];
                data[index + 2] = _data[index + 2];
                data[index + 3] = _data[index + 3];
              }
            }
          }
        }
      }
    }
  };
  // 擦除
  if (isErase.value) {
    if (restore) {
      for (let k = 0; k < restore.length; k++) {
        applyBrush(mainImageData.data, restore[k].path, restore[k].brush, copyData.data);
      }
    }
    if (draw) {
      for (let k = 0; k < draw.length; k++) {
        applyBrush(mainImageData.data, draw[k].path, draw[k].brush, color, true);
      }
    }
  } else {
    if (draw) {
      for (let k = 0; k < draw.length; k++) {
        applyBrush(mainImageData.data, draw[k].path, draw[k].brush, color, true);
      }
    }
    if (restore) {
      for (let k = 0; k < restore.length; k++) {
        applyBrush(mainImageData.data, restore[k].path, restore[k].brush, copyData.data);
      }
    }
  }

  ctx.putImageData(mainImageData, 0, 0);
};

const isRecallDisable = ref(false);
const isRedoDisable = ref(true);

async function renderCanvas(flag?) {

  let target;
  // flag判断是否撤回
  if (flag) {
    target = await getSubLastDrawData();
    await pushDrawData(await popSubDrawData());
  } else {
    target = await getLastDrawData();
  }
  // 左右撤回是否显示
  if (!(await getSubLength())) {
    isRedoDisable.value = true;
  } else {
    isRedoDisable.value = false;
  }
  if ((await getLength()) < 2) {
    isRecallDisable.value = true;
  } else {
    isRecallDisable.value = false;
  }
  const { main, mask, color, draw, bg, restore } = target;
  renderCanvasNormal(main, mask, color, draw, bg, restore);
}

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
function downLoad(){
  // 生成照片 下载生成后的照片
  downloadImg.value ? downloadImage():sureRemoveArea()
}

function downloadImage() {
  const canvas = canvasRef.value;
  const link = document.createElement("a");
  link.href = canvas.toDataURL("image/png");
  link.download = "cropped-image.png";
  link.click();
}

/* operation */

const handleRecall = async () => {
  if ((await getLength()) < 2) return;
  await pushSubDrawData(await popDrawData());
  renderCanvas();
};

const handleRedo = async () => {
  if (!(await getSubLength())) return;
  renderCanvas(true); //是否重做
};

const isErase = ref(false);
const isRestore = ref(false);
const handleEraseClick = () => {
  isRestore.value = false;
  isErase.value = !isErase.value;
  const canvas = deMarkRef.value;
  if (isErase.value) {
    canvas.addEventListener("mousedown", mouseHandler);
  } else {
    canvas.removeEventListener("mousedown", mouseHandler);
  }
};

const getClipArea = (canvas, e) => {
  const rect = canvas.getBoundingClientRect();
  return {
    x: (e.clientX - rect.left) * (canvas.width / rect.width),
    y: (e.clientY - rect.top) * (canvas.height / rect.height)
  };
};
let path = [];

function mouseHandler(e) {
  const canvas = deMarkRef.value;
  const ctx = canvas.getContext("2d");
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high'; // 可以设置为 'low', 'medium', 或 'high'
  e.preventDefault();
  if (e.type == "mousedown") {
    ctx.save();
    path = [];
    canvas.addEventListener("mousemove", mouseHandler);
    canvas.addEventListener("mouseup", mouseHandler);
    ctx.strokeStyle = isErase.value?"#000000":'red';

    ctx.lineWidth = brushSize.value; // 设置画笔宽度
    ctx.lineCap = "round"; // 设置线条端点样式
    ctx.lineJoin = "round"; // 设置线条连接处样式
    ctx.save();
    ctx.beginPath();

    const { x, y } = getClipArea(canvas, e);

    ctx.moveTo(x, y);
    path.push({ x, y });

  } else if (e.type === "mouseup" || e.type === "mouseout") {
    canvas.removeEventListener("mousemove", mouseHandler);
    canvas.removeEventListener("mouseup", mouseHandler);
    //draw
    // if (isErase.value) {
    //   handleAction({ path, brush: brushSize.value }, Action["DRAW"], renderCanvas);
    // } else {
    //   handleAction({ path, brush: brushSize.value }, Action["RESTORE"], renderCanvas);
    // }
  } else {
    if(isRestore.value){
      console.log(1111111111111);
      ctx.globalAlpha = 0.1; // 可以调整透明度
      ctx.globalCompositeOperation = 'destination-out';
    }else{
      console.log(222222222222222);
      ctx.globalAlpha = 0.9; // 可以调整透明度
      ctx.globalCompositeOperation = 'source-over'
    }
    const { x, y } = getClipArea(canvas, e);
    ctx.lineTo(x, y);
    ctx.stroke();
    path.push({ x, y });
  }
}

const handleRestoreClick = () => {
  isErase.value = false;
  isRestore.value = !isRestore.value;
  const canvas = deMarkRef.value;

  if (isRestore.value) {
    canvas.addEventListener("mousedown", mouseHandler);
  } else {
    canvas.removeEventListener("mousedown", mouseHandler);
  }
};
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

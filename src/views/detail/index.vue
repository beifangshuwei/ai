<template>
  <main class="main-content mx-auto flex max-w-300 flex-col gap-2.5 px-1 pt-9 px-5 lg:flex-row">
    <section class="editor">
      <div class="sidebar w-40 hidden lg:flex">
        <div class="color-picker">
          <h3 class="ml-1">Color</h3>
          <div class="colors">
            <div
              class="color cursor-pointer"
              :style="{ backgroundColor: `rgb(${item[0]},${item[1]},${item[2]})` }"
              v-for="(item, index) in colorArr"
              :key="index"
              @click="changeColor(item)"
            ></div>
          </div>
        </div>
        <div class="picture-picker">
          <h3 class="ml-5">Picture</h3>
          <div class="pictures">
            <div class="picture" v-for="(item, index) in bgArr" :key="index">
              <img :src="item" class="w-full h-full" @click="handlePicClick(item)"/>
            </div>
          </div>
        </div>
      </div>

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
              Re-Upload
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
            <el-divider direction="vertical" class="h-7 border-#888"></el-divider>
            <svg-icon
              name="chehui"
              :icon-style="{ height: '30px', width: '30px' }"
              class="mx-2.5 cursor-pointer"
              :class="{ 'opacity-20%': isRecallDisable }"
              @click="handleRecall"
            ></svg-icon>

            <svg-icon
              name="zhongzuo"
              :icon-style="{ height: '30px', width: '30px' }"
              class="cursor-pointer"
              :class="{ 'opacity-20%': isRedoDisable }"
              @click="handleRedo"
            ></svg-icon>
          </div>
        </section>
        <div class="canvas-container">
          <canvas id="canvas" ref="canvasRef"></canvas>
<!--          <canvas id="markCanvas" ref="markRef"></canvas>-->
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
        <div class="flex flex-row items-center gap-5">
          <el-button
            class="h-[60px] w-[135px] border border-black text-5 text-black fw-600"
            :type="isErase ? 'primary' : 'default'"
            :class="{'text-white': isErase }"
            @click="handleEraseClick"
          >Erase
          </el-button>
          <el-button
            class="h-[60px] w-[135px]  border border-black text-5 text-black fw-600"
            :type="isRestore ? 'primary' : 'default'"
            :class="{ 'text-white': isRestore }"
            @click="handleRestoreClick"
          >Restore
          </el-button>
        </div>

        <div class="mt-20 w-full">
          <h3 class="text-5 text-#000 text-center">Brush Size</h3>
          <el-slider v-model="brushSize" size="large" :show-tooltip="false" :min="3" :max="50" class="w-full"/>
        </div>
        <el-button type="primary" class="mt-24 text-6 h-22 w-75" @click="downloadImage">Download HD free</el-button>
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
import one from "@/assets/images/home/1.png";
import two from "@/assets/images/home/2.jpg";
import three from "@/assets/images/home/3.jpg";
import four from "@/assets/images/home/4.jpg";
import Mask from "@/components/Mask/index.vue";
import {useRoute} from "vue-router";
import bg1 from "@/assets/images/detail/bg-1.jpg";
import bg2 from "@/assets/images/detail/bg-2.jpg";
import bg3 from "@/assets/images/detail/bg-3.jpg";
import bg4 from "@/assets/images/detail/bg-4.jpg";
import bg5 from "@/assets/images/detail/bg-5.jpg";

import useFile, {Action} from "@/hooks/useFile";
import useSnapshot from "@/hooks/useSnapshot";
// import {removeBackGround} from "@/api/modules/ai"

const {handleAction} = useFile();
const {getLastDrawData, getLength, pushDrawData, clearDrawData, popDrawData} = useSnapshot("drawStack");
const {
  getLastDrawData: getSubLastDrawData,
  getLength: getSubLength,
  pushDrawData: pushSubDrawData,
  popDrawData: popSubDrawData,
  clearDrawData: clearSubData
} = useSnapshot("subStack");

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

const canvasRef = ref();
// 创建一个mark canvas图层 进行涂抹等操作
const markRef = ref();
onMounted(async () => {

  // index静态图片 from上传图片
  const {index, from} = route.query;
  markRef.value = document.createElement('canvas');
  // document.body.appendChild(markRef.value);
  await clearSubData();
  if (from) {
    renderCanvas('first');
  } else {
    // 清理数据
    await clearDrawData();
  }

  if (index) readImportedImage(imgArr[index], Action["UPLOAD"]);
  document.addEventListener("dragenter", handleDragEnter);
  document.addEventListener("dragover", handleDragOver);
  document.addEventListener("dragleave", hanleDragLeave);
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

const readImportedImage = (img, action, fn?) => {
  fetch(img)
    .then(response => response.blob())
    .then(async blob => {
      // 上传图片并绘制
      handleAction(blob, action, fn ? fn && fn() : getCanvas, 1);
    })
    .catch(error => console.error("Error reading imported image:", error));
};

/* upload */
const handleBeforeUpload = file => {
  handleAction(file, Action["UPLOAD"], getCanvas, 1);
  return false;
};

async function getCanvas() {
  renderCanvas('first')
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
};

const handleZoomOut = () => {
  scale -= 0.1;
  const canvas = canvasRef.value;
  canvas.style.transform = `scale(${scale})`;
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

const w = ref(0);
const h = ref(0);

const renderBefore = async () => {
  const {main} = await getLastDrawData();

  const canvas = canvasRef.value;
  const ctx = canvas.getContext("2d");
  const mainImage = new Image();
  mainImage.src = main;
  await imgLoaded(mainImage);

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

  ctx.drawImage(mainImage, offsetX, offsetY, drawWidth, drawHeight);

  const mainImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  ctx.putImageData(mainImageData, 0, 0);
};

/*
* */
const renderCanvasWithBg = async (main, mask, color, draw, bg, restore, result: any) => {
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

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(mainImage, offsetX, offsetY, drawWidth, drawHeight);
  const mainImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const copyData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(maskImage, offsetX, offsetY, drawWidth, drawHeight);
  const maskImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  for (let i = 3; i < maskImageData.data.length; i += 4) {
    // console.log(i)
    if (maskImageData.data[i] === 0) {
      maskImageData.data[i] = bgImageData.data[i]
      maskImageData.data[i - 1] = bgImageData.data[i - 1]
      maskImageData.data[i - 2] = bgImageData.data[i - 2]
      maskImageData.data[i - 3] = bgImageData.data[i - 3]

    }
  }

  // 笔刷 恢复
  const applyBrush = async () => {
    // 当恢复时 需要判断是恢复哪个区域
    const long = result.length;
    for (let i = 3; i < result[long - 1].data.length; i += 4) {
      // 当像素点是灰色时 是涂抹
      if (result[long - 1].data[i - 1] > 100) {
        // 当背景为默认背景涂抹就变透明 当背景为设定背景时变成设定背景
        maskImageData.data[i] = 0
        if (bg) {
          maskImageData.data[i] = bgImageData.data[i]
          maskImageData.data[i - 1] = bgImageData.data[i-1]
          maskImageData.data[i - 2] = bgImageData.data[i-2]
          maskImageData.data[i - 3] = bgImageData.data[i-3]
        }
      } else if (result[long - 1].data[i] !== 0) {
        // 恢复时
        maskImageData.data[i] = mainImageData.data[i]
        maskImageData.data[i - 1] = mainImageData.data[i - 1]
        maskImageData.data[i - 2] = mainImageData.data[i - 2]
        maskImageData.data[i - 3] = mainImageData.data[i - 3]
      }
    }
  }

  // 擦除 笔刷
  if (isErase.value || isRestore.value) {
    // 将涂抹图层与去背景图片对比 是涂抹就设置透明度变0
    applyBrush()
  }

  // ctx.putImageData(mainImageData, 0, 0);
  ctx.putImageData(maskImageData, 0, 0);
};

const renderCanvasNormal = async (main, mask, color, draw, bg, restore, result, isFirst: boolean) => {
  const canvas = canvasRef.value;
  const ctx = canvas.getContext("2d");
  const maskImage = new Image();
  const mainImage = new Image();
  maskImage.src = mask;
  mainImage.src = main;

  await Promise.all([imgLoaded(maskImage), imgLoaded(mainImage)]);

  const canvasWidth = mainImage.width;
  const canvasHeight = mainImage.height;
  w.value = canvasWidth;
  h.value = canvasHeight;
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  if (isFirst) {
    console.log(121212)
    const markCanvas = markRef.value;
    markCanvas.width = canvasWidth;
    markCanvas.height = canvasHeight;
  }

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
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const copyData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  ctx.drawImage(maskImage, offsetX, offsetY, drawWidth, drawHeight);

  const maskImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  if (color) {
    // console.log(111111111111,'color',color)
    for (let i = 3; i < maskImageData.data.length; i += 4) {
      // console.log(i)
      if (maskImageData.data[i] === 0) {
        maskImageData.data[i] = 255
        maskImageData.data[i - 1] = color[2]
        maskImageData.data[i - 2] = color[1]
        maskImageData.data[i - 3] = color[0]
      }
    }
  }
  // if(bg){
  //   for (let i = 3; i < maskImageData.data.length; i += 4) {
  //     // console.log(i)
  //     if (maskImageData.data[i] === 0) {
  //
  //       maskImageData.data[i] = bgImageData.data[i]
  //       maskImageData.data[i - 1] = bgImageData.data[2]
  //       maskImageData.data[i - 2] = bgImageData.data[1]
  //       maskImageData.data[i - 3] = bgImageData.data[0]
  //     }
  //   }
  // }

  const applyBrush = async () => {
    // 当恢复时 需要判断是
    const long = result.length;
    for (let i = 3; i < result[long - 1].data.length; i += 4) {
      // 当像素点是灰色时 是涂抹
      if (result[long - 1].data[i - 1] > 100) {
        // 当背景为默认背景涂抹就变透明 当背景为设定背景时变成设定背景
        maskImageData.data[i] = 0
        if (color) {
          maskImageData.data[i] = 255
          maskImageData.data[i - 1] = color[2]
          maskImageData.data[i - 2] = color[1]
          maskImageData.data[i - 3] = color[0]
        }
      } else if (result[long - 1].data[i] !== 0) {
        // 恢复时
        maskImageData.data[i] = mainImageData.data[i]
        maskImageData.data[i - 1] = mainImageData.data[i - 1]
        maskImageData.data[i - 2] = mainImageData.data[i - 2]
        maskImageData.data[i - 3] = mainImageData.data[i - 3]
      }
    }
  }

  // 擦除 笔刷
  if (isErase.value || isRestore.value) {
    // 将涂抹图层与去背景图片对比 是涂抹就设置透明度变0
    applyBrush()
  }

  // ctx.putImageData(mainImageData, 0, 0);
  ctx.putImageData(maskImageData, 0, 0);
};

const isRecallDisable = ref(false);
const isRedoDisable = ref(true);

async function renderCanvas(flag?) {
  let target;
  // flag判断是否撤回
  if (flag && flag !== 'first') {
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
  const {main, mask, color, draw, bg, restore, result} = target;

  if (bg) {
    renderCanvasWithBg(main, mask, color, draw, bg, restore,result);
  } else {
    renderCanvasNormal(main, mask, color, draw, bg, restore, result, flag === 'first');
  }
}

const imgLoaded = (img): Promise<void> => {
  return new Promise(resolve => {
    img.onload = () => {
      resolve();
    };
  });
};

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
  const canvas = canvasRef.value;
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

/**
 * 鼠标滑动涂抹
 */
function mouseHandler(e) {
  const canvas = canvasRef.value;
  const ctx = canvas.getContext("2d");
  const markCanvas = markRef.value;
  const markCtx = markCanvas.getContext("2d");
  e.preventDefault();
  if (e.type == "mousedown") {
    path = [];
    canvas.addEventListener("mousemove", mouseHandler);
    canvas.addEventListener("mouseup", mouseHandler);

    ctx.globalAlpha = 0.5;
    ctx.strokeStyle = "#f67a71";
    ctx.lineWidth = brushSize.value; // 设置画笔宽度
    ctx.lineCap = "round"; // 设置线条端点样式
    ctx.lineJoin = "round"; // 设置线条连接处样式
    ctx.save();
    // ctx.beginPath();

    if (!isErase.value) {
      // 设置透明度
      markCtx.globalAlpha = 0.2; // 可以调整透明度
      markCtx.strokeStyle = "#000000";

      // // 设置组合操作，使得重叠区域变透明
      // markCtx.globalCompositeOperation = 'destination-out';
    } else {
      markCtx.globalAlpha = 1; // 可以调整透明度
      markCtx.strokeStyle = "#C8C8C8";

      // markCtx.globalCompositeOperation = 'source-over';
    }
    markCtx.lineWidth = brushSize.value; // 设置画笔宽度
    markCtx.lineCap = "round"; // 设置线条端点样式
    markCtx.lineJoin = "round"; // 设置线条连接处样式
    markCtx.save();
    markCtx.beginPath();

    const {x, y} = getClipArea(canvas, e);

    ctx.moveTo(x, y);
    markCtx.moveTo(x, y);
    path.push({x, y});
  } else if (e.type === "mouseup" || e.type === "mouseout") {
    canvas.removeEventListener("mousemove", mouseHandler);
    canvas.removeEventListener("mouseup", mouseHandler);
    //draw
    // if (isErase.value) {
    //   handleAction({path, brush: brushSize.value}, Action["DRAW"], renderCanvas);
    // } else {
    //   handleAction({path, brush: brushSize.value}, Action["RESTORE"], renderCanvas);
    // }
    const data = markCtx.getImageData(0, 0, canvas.width, canvas.height);
    handleAction(data, Action["RESULT"], renderCanvas);
    // console.log(data)
    // handleAction(data, Action["RESTORE"], );

  } else {
    const {x, y} = getClipArea(canvas, e);
    ctx.lineTo(x, y);
    ctx.stroke();

    markCtx.lineTo(x, y);
    markCtx.stroke();
    markCtx.path = true;
    path.push({x, y});
  }
}

const handleRestoreClick = () => {
  isErase.value = false;
  isRestore.value = !isRestore.value;
  const canvas = canvasRef.value;

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

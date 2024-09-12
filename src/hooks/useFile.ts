/*
调用接口,读取文件,

传入参数有 main blob file (通过上传获取/读取文件)
获得  main 和 mask

action : draw,bg,upload,color
*/
import { uploadImage,removeBackGround } from '@/api/modules/ai';
import useSnapshot from './useSnapshot';
// 对应每个按钮
export enum Action {
  DRAW = 'draw',
  RESTORE = 'restore',
  BG = 'bg', //read
  UPLOAD = 'upload',
  COLOR = 'color'
}
// 对应的文件类型
export enum ReadType {
  MAIN = 'main',
  MASK = 'mask',
  BG = 'bg'
}

export default () => {
  let main = null,
    mask = null,
    color = null,
    draw = null,
    bg = null,
    restore = null;

  const { pushDrawData, getDrawData, getLastDrawData } = useSnapshot('drawStack');

  const readBlob2Base64 = (file, type: ReadType, fn?): Promise<void> => {
    console.log(file, type,'readBlob2Base64');
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async function () {
        const content = reader.result;
        if (type == ReadType['MAIN']) {
          main = content;
          // console.log(main,'main111111111');
          // await pushDrawData({ main, mask, color, draw, bg, restore });
        } else if (type == ReadType['MASK']) {
          mask = content;
          // 存储列表
          await pushDrawData({ main, mask, color, draw, bg, restore });
         fn && fn();
        } else {
          await pushDrawData({ ...(await getLastDrawData()), bg: content, color: null });
          fn && fn();
        }
        resolve();
      };
      reader.readAsDataURL(file);
    });
  };

  const uploadImageApi = async (file, fn) => {
    const formData = new FormData();
    formData.append('file', file);
    // formData.append('model', 'isnet-general-use');
    // formData.append('a', 'true');
    // formData.append('af', '240');
    // formData.append('ab', '10');
    // formData.append('ae', '10');
    // formData.append('om', 'true');
    // formData.append('ppm', 'true');
    // 存一下原图
    const result = (await uploadImage(formData)) || {};
    const resultMain = await readImportedImage(result.data,ReadType['MAIN'])
    // 存一下遮罩图
    const result1=(await removeBackGround({ url:result.data })) || {};
    const resultMASK =  readImportedImage(result1.data.img,ReadType['MASK'], fn)

  };
  // 转文件格式
  const readImportedImage = (img,type: ReadType, fn?) => {

    const imgSrc = img.replace('https://img.photoes.ai/',"/downloadImage")
    // let imgSrc = 'http://localhost:3000/downloadImage/watered/20240912105729dog.jpg'
    fetch(imgSrc)
      .then(response => response.blob())
      .then(async blob => {
        // 上传图片并绘制
        readBlob2Base64(blob, type,fn);
      })
      .catch(error => console.error("Error reading imported image:", error));

  };
  // 对每种类型的按钮进行的操作
  const handleAction = async (data: any, type: Action, fn?) => {
    if (type == Action['UPLOAD']) {
      // 存一下原图

      uploadImageApi(data, fn);
    } else if (type == Action['BG']) {
      readBlob2Base64(data, ReadType['BG'], fn);
      console.log(data, 'store');
    } else if (type == Action['COLOR']) {
      //bg ,color 只替换本身
      await pushDrawData({ ...(await getLastDrawData()), color: data, bg: null });
      fn && fn();
    } else if (type == Action['DRAW']) {
      //draw,保留全部,增加 draw
      const arr = (await getLastDrawData()).draw || [];
      arr.push(data);
      console.log(data, 'store');

      await pushDrawData({ ...(await getLastDrawData()), draw: arr });
      fn && fn();
    } else {
      const arr = (await getLastDrawData()).restore || [];
      arr.push(data);
      await pushDrawData({ ...(await getLastDrawData()), restore: arr });
      fn && fn();
    }
  };

  return {
    handleAction
  };
};

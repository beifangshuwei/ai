import request from "@/api";

export const uploadImage = formdata => {
  return request.post("http://192.168.110.244:8082/user/img/updateImg", formdata
    //   {
    //   responseType: 'blob'
    // }
  );
};
// export const uploadImageBlob = formdata => {
//   return request.post("http://192.168.110.244:8082/user/img/updateImg", formdata,
//       {
//       responseType: 'blob'
//     }
//   );
// };

export const removeBackGround = data => {
  return request.post("http://192.168.110.244:8082/user/remove/waterMark", data,
  );
};
// export const uploadImage = formdata => {
//   return request.post('http://35.185.213.127/api/remove', formdata, {
//     responseType: 'blob'
//   });
// };

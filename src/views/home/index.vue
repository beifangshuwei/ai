<template>
  <main class="main-content">
    <section class="container-div !pb-0 w-100% flex flex-col justify-center items-center bg-gradient-to-b from-sky-50">
      <div class="container">
        <h1 class="text-center lg:text-14  text-7.5 mb-8">{{ $t("home.hero.h1_full") }}</h1>
        <p class="mt-2 px-8 text-center text-[#6E6F75] text-sm lg:text-xl lg:px-0 mb-8">
          {{ $t("home.hero.subtitle") }}
        </p>
        <div class="flex justify-center mb-5">
           <el-radio-group v-model="urlRadio" size="large" @change="changeUrl(urlRadio)">
             <el-radio-button label="Remove Backgound" value="deBg" />
             <el-radio-button label="deWatermark" value="deWaterMark" />
           </el-radio-group>
        </div>
        <div class="images mt-5 lg:mt-0 w-full">
          <el-upload
            :before-upload="handleBeforeUpload"
            action="https://ai.photoes.ai/user/img/updateImg"
            :show-file-list="false"
            :limit="1"
            class="w-full"
          >
            <div
              class="mx-1 flex w-full cursor-pointer flex-col items-center justify-center rounded-3  px-12 lg:mx-0 lg:w-[560px] lg:px-0"
            >
              <el-button
                class="inline-flex w-60 lg:w-90 h-52px items-center justify-center w-full py-3 px-4 bg-primary rounded-lg text-base transition text-white hover:bg-opacity-80 cursor-pointer shadow-wtm-button-shadow focus:bg-op-70 focus:!bg-none  focus:shadow-wtm-button-shadow-focus hover:bg-wtm-button-linear-reverse"
                type="primary"
              >{{ $t("home.button.upload_sd") }}
              </el-button>
              <div class="formats">
              <span class="inline-block text-#777 border-#777 border-1 border-solid rounded-1.5 px-2 py-1 text-3 mr-1 lg:text-4">
                JPG
              </span>
                <span
                  class="inline-block text-#777 border-#777 border-1 border-solid rounded-1.5 px-2 py-1 text-3 mr-1 lg:text-4"
                >
                JPEG
              </span>
                <span
                  class="inline-block text-#777 border-#777 border-1 border-solid  rounded-1.5 px-2 py-1 text-3 mr-1 lg:text-4"
                >
                PNG
              </span>
                <span
                  class="inline-block text-#777 border-#777 border-1 border-solid rounded-1.5 px-2 py-1 text-3 mr-1 lg:text-4"
                >
                WEBP
              </span>
              </div>
              <p class="mt-1 fw-600 whitespace-pre-wrap text-center text-4 text-[#777]">
                {{ $t("common.landing_uploader.label2") }}</p>
            </div>
          </el-upload>

        </div>
        <section class="photo-selection">
          <div class="my-5 w-full border-t border-dashed border-[#D8D8DB]"></div>
          <p class="mt-[4px] text-[#1A1A1A] fw-800 text-center">{{ $t("common.landing_uploader.label3") }}</p>
          <div class="photo-options">
            <img
              :src="item"
              alt="Option 1"
              class="option w-15 h-15 lg:w-22 lg:h-22"
              v-for="(item, index) in imgArr"
              :key="index"
              @click="handlePicClick(index)"
            />
          </div>
        </section>
        <Mask v-show="isMask" @close-mask="isMask = false" type="home"></Mask>
      </div>
    </section>
    <div class="container-div lg:py-10 pt-10 bg-[#f7f7f7] ">
      <div class="container pb-5 lg:pb-0">
        <div class="lg:mb-8 mb-7 text-center"><h2 class="lg:text-[40px] text-xl font-semibold">{{ $t("home.how_to.titleStart") }}
          <span class="text-400 color-#4180f1 lg:text-4xl text-xl font-bold leading-10">{{ $t("home.how_to.titleEnd") }}</span>
        </h2></div>
        <div class="text-neutral-ink-600 text-center lg:w-2/3 lg:mx-auto T14R lg:T16R"><p>{{ $t("home.how_to.subtitle_start") }}
          <a
            class="font-medium text-[#0dabca] hover:underline" href="/"
          >{{ $t("home.how_to.subtitle_link_title") }}</a>,{{ $t("home.how_to.subtitle_end") }} </p></div>
        <div class="flex lg:flex-row flex-col gap-10 mt-8">
          <div class="flex flex-col gap-6 lg:w-1/2 w-full">
            <div v-for="item in 4" :key="item"
                 class="shadow-amber border-transparent align-top whitespace-normal   border-solid  rounded-3xl cursor-pointer p-4  transition-all"
            >
              <div class="flex gap-6">
                <div class="flex gap-2">
                  <svg-icon :name="`howTo${item}`" style="width: 96px;height: 96px"></svg-icon>
                </div>
                <div class="flex-1">
                  <h3 class="font-semibold mb-4 flex items-center">
                    <span class="font-semibold text-[16px] leading-[20px] align-middle inline-block">{{ item }}. {{ $t("home.how_to.step_" + item + ".title") }}</span>
                  </h3>
                  <p class="font-normal text-[14px] leading-[20px] text-neutral-ink-600">
                    {{ $t("home.how_to.step_" + item + ".content") }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="flex flex-col justify-center items-center lg:w-1/2 w-full">
            <div class="slick-slider lg:grid lg:gap-9 grid-cols-1 lg:grid-cols-4 slick-vertical slick-initialized" dir="ltr">
              <div class="slick-list" style="height: 561px;">
                <div data-index="6" tabindex="-1" class="slick-slide slick-cloned" aria-hidden="true" style="width: 550px;">
                  <div><img src="https://assets.dewatermark.ai/images/watermark-remover/new/howtouse_3.webp"
                            alt="Use AI brush for pixel perfect results" class="w-full mb-4" tabindex="-1"
                            style="width: 100%; display: inline-block;"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="container-div bg-[#f7f7f7] lg:pt-24 lg:pb-[120px] py-12">
        <div class="container">
          <div class="lg:max-w-[60%] mx-auto"><h2 class="text-center lg:text-4xl text-2xl font-bold leading-10">{{ $t('home.upside.titleStart') }} <span
            class="inline-block leading-normal text-[#4180f1]"
          >{{ $t('home.upside.titleHighlight') }}</span> {{ $t('home.upside.titleEnd') }}</h2></div>
          <div class=" space-y-12 pt-10 lg:pt-[72px] lg:space-y-20">
            <div class="lg:flex lg:justify-start lg:items-center gap-10 justify-center items-center text-base-content-primary">
              <div class="flex flex-col gap-5 w-full lg:w-1/2 ">
                <div class="w-14 h-14 bg-violet-100 rounded-xl flex flex-col justify-center items-center">
                  <svg-icon name="upside1" style="width: 28px;height: 28px;"></svg-icon>
                </div>
                <div><h3 class="text-neutral-900 text-xl lg:text-3xl font-bold leading-relaxed lg:leading-10"><span
                  class="text-violet-600"
                >Effectively remove </span> the most sophisticated watermarks</h3>
                  <p class="sm:mb-8 lg:mb-10 lg:mt-4 lg:text-sm">Beyond the common logo and text watermarks, sometimes you will
                    encounter some better protected ones with multiple layers, densely packed with details, or ones that blend
                    watermarks with image colors. Our tool can help you deal with them all.</p>
                  <button class="font-semibold text-violet-600"><span class="inline-block align-middle">Try now</span>
                    <div class="inline-block ml-2 align-middle">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M10 19C7.61305 19 5.32387 18.0518 3.63604 16.364C1.94821 14.6761 1 12.3869 1 10C1 7.61305 1.94821 5.32387 3.63604 3.63604C5.32387 1.94821 7.61305 1 10 1C12.3869 1 14.6761 1.94821 16.364 3.63604C18.0518 5.32387 19 7.61305 19 10C19 12.3869 18.0518 14.6761 16.364 16.364C14.6761 18.0518 12.3869 19 10 19V19Z"
                          stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
                        ></path>
                        <path d="M13.9998 10H5.99976" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                              stroke-linejoin="round"
                        ></path>
                        <path d="M11.0002 7L14.0002 10L11.0002 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                              stroke-linejoin="round"
                        ></path>
                      </svg>
                    </div>
                  </button>
                </div>
              </div>
              <div class="flex flex-col justify-center w-full lg:w-1/2">
                <div class="max-w-[921px] m-auto bg-white lg:p-6 p-3 rounded-2xl shadow-wtm-image-compare-shadow sm:mt-10">
                  <div class="h-auto w-full">
                    <div class="flex justify-center items-center">
                      <div class="w-full">
                        <div class="relative cursor-pointer">
                          <img-comparison-slider class="relative w-full rounded-2xl slider-feature-split-line rendered"
                                                 tabindex="0" classname="relative w-full rounded-2xl slider-feature-split-line"
                          ><img class="lg:max-h-[200px] lg:h-full w-full"
                                src="https://assets.dewatermark.ai/images/watermark-remover/new/featureComparison/before_1.webp"
                                alt="original-image"
                          >
                          </img-comparison-slider>
                          <div class="magnifying-glass pointer-events-none bg-white bg-no-repeat hidden"
                               style="top: 278.375px; left: 500.5px; background-image: url(https://assets.dewatermark.ai/images/watermark-remover/new/featureComparison/after_1.webp&quot;); background-size: 753px 487.641px; background-position: -670.75px -337.562px;"
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="lg:flex lg:justify-start lg:items-center gap-10 justify-center items-center text-base-content-primary flex-row-reverse"
            >
              <div class="flex flex-col gap-5 w-full lg:w-1/2">
                <div class="w-14 h-14 bg-cyan-50 rounded-xl flex flex-col justify-center items-center">
                  <svg-icon name="upside2" style="width: 28px;height: 28px;"></svg-icon>
                </div>
                <div><h3 class="text-neutral-900 text-xl lg:text-3xl font-bold leading-relaxed lg:leading-10">Powerful
                  watermarks recognition <span class="text-emerald-500"> with AI</span></h3>
                  <p class="sm:mb-8 lg:mb-10 lg:mt-4 lg:text-sm">AI watermark remover lends the powerful ability to automatically
                    detect &amp; separate watermarks layers from the original images.</p>
                  <button class="font-semibold text-emerald-500"><span class="inline-block align-middle">Try now</span>
                    <div class="inline-block ml-2 align-middle">
                      <svg-icon name="upsideTo" style="width: 20px; height: 20px;"></svg-icon>
                    </div>
                  </button>
                </div>
              </div>
              <div class="flex flex-col justify-center w-full lg:w-1/2">
                <div class="max-w-[921px] m-auto bg-white lg:p-6 p-3 rounded-2xl shadow-wtm-image-compare-shadow lg:mt-10">
                  <div class="h-auto w-full">
                    <div class="flex justify-center items-center">
                      <div class="w-full">
                        <div class="relative cursor-pointer">
                          <img-comparison-slider class="relative w-full rounded-2xl slider-feature-split-line rendered"
                                                 tabindex="0" classname="relative w-full rounded-2xl slider-feature-split-line"
                          ><img class="lg:max-h-[200px] lg:h-full w-full"
                                src="https://assets.dewatermark.ai/images/watermark-remover/new/featureComparison/before_1.webp"
                                alt="original-image"
                          >
                          </img-comparison-slider>
                          <div class="magnifying-glass pointer-events-none bg-white bg-no-repeat hidden"
                               style="top: 278.375px; left: 500.5px; background-image: url(https://assets.dewatermark.ai/images/watermark-remover/new/featureComparison/after_1.webp&quot;); background-size: 753px 487.641px; background-position: -670.75px -337.562px;"
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="lg:flex lg:justify-start lg:items-center gap-10 justify-center items-center text-base-content-primary">
              <div class="flex flex-col gap-5 w-full lg:w-1/2">
                <div class="w-14 h-14 bg-rose-50 rounded-xl flex flex-col justify-center items-center">
                  <svg-icon name="upside3" style="width: 28px;height: 28px;"></svg-icon>
                </div>
                <div><h3 class="text-neutral-900 text-xl lg:text-3xl font-bold leading-relaxed lg:leading-10"><span
                  class="text-orange-600"
                >Retains</span> image quality</h3>
                  <p class="sm+:mb-8 lg:mb-10 lg:mt-4 lg:text-sm">We commit great effort to retaining the original quality (even
                    upscale) of the images. You can safely clear watermark with us without worrying about losing quality and
                    details.</p>
                  <button class="font-semibold text-orange-600"><span class="inline-block align-middle">Try now</span>
                    <div class="inline-block ml-2 align-middle">
                      <svg-icon name="upsideTo" style="width: 20px; height: 20px;"></svg-icon>
                    </div>
                  </button>
                </div>
              </div>
              <div class="flex flex-col justify-center w-full lg:w-1/2">
                <div class="max-w-[921px] m-auto bg-white lg:p-6 p-3 rounded-2xl shadow-wtm-image-compare-shadow sm:mt-10">
                  <div class="h-auto w-full">
                    <div class="flex justify-center items-center">
                      <div class="w-full">
                        <div class="relative cursor-pointer">
                          <img-comparison-slider class="relative w-full rounded-2xl slider-feature-split-line rendered"
                                                 tabindex="0" classname="relative w-full rounded-2xl slider-feature-split-line"
                          ><img class="lg:max-h-[200px] lg:h-full w-full"
                                src="https://assets.dewatermark.ai/images/watermark-remover/new/featureComparison/before_1.webp"
                                alt="original-image"
                          >
                          </img-comparison-slider>
                          <div class="magnifying-glass pointer-events-none bg-white bg-no-repeat hidden"
                               style="top: 278.375px; left: 500.5px; background-image: url(https://assets.dewatermark.ai/images/watermark-remover/new/featureComparison/after_1.webp&quot;); background-size: 753px 487.641px; background-position: -670.75px -337.562px;"
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="lg:flex lg:justify-start lg:items-center gap-10 justify-center items-center text-base-content-primary flex-row-reverse"
            >
              <div class="flex flex-col gap-5 w-full lg:w-1/2">
                <div class="w-14 h-14 bg-blue-50 rounded-xl flex flex-col justify-center items-center">
                  <svg-icon name="upside4" style="width: 28px;height: 28px;"></svg-icon>
                </div>
                <div><h3 class="text-neutral-900 text-xl lg:text-3xl font-bold leading-relaxed lg:leading-10">Flexible editing
                  with <span class="text-sky-600"> manual AI brush</span></h3>
                  <p class="sm:mb-8 lg:mb-10 lg:mt-4 lg:text-sm"> We provide a manual in-app AI brush for you to <a
                    class="font-medium text-[#EC511F] hover:underline" href="/"
                  >watermark removal</a> even more thoroughly. Simply brush over the remaining watermarks details to completely
                    remove them from image (while still retaining quality).</p>
                  <button class="font-semibold text-sky-600"><span class="inline-block align-middle">Try now</span>
                    <div class="inline-block ml-2 align-middle">
                          <svg-icon name="upsideTo" style="width: 20px; height: 20px;"></svg-icon>
                    </div>
                  </button>
                </div>
              </div>
              <div class="flex flex-col justify-center w-full lg:w-1/2">
                <div class="max-w-[921px] m-auto bg-white lg:p-6 p-3 rounded-2xl shadow-wtm-image-compare-shadow lg:mt-10">
                  <div class="h-auto w-full">
                    <div class="flex justify-center items-center">
                      <div class="w-full">
                        <div class="relative cursor-pointer">
                          <img-comparison-slider class="relative w-full rounded-2xl slider-feature-split-line rendered"
                                                 tabindex="0" classname="relative w-full rounded-2xl slider-feature-split-line"
                          ><img class="lg:max-h-[200px] lg:h-full w-full"
                                src="https://assets.dewatermark.ai/images/watermark-remover/new/featureComparison/before_1.webp"
                                alt="original-image"
                          >
                          </img-comparison-slider>
                          <div class="magnifying-glass pointer-events-none bg-white bg-no-repeat hidden"
                               style="top: 278.375px; left: 500.5px; background-image: url(https://assets.dewatermark.ai/images/watermark-remover/new/featureComparison/after_1.webp&quot;); background-size: 753px 487.641px; background-position: -670.75px -337.562px;"
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="container-div bg-sky-50 lg:py-[110px] py-14 ">
        <div class="container">
          <ul class="lg:mb-14 mb-10 space-y-10 lg:space-y-0 flex lg:flex-row flex-col gap-[55px]">
            <li class="flex flex-col">
              <div class="mb-6">
                <div
                  class="w-20 h-20 bg-white bg-opacity-50 backdrop-blur-lg rounded-2xl flex flex-col justify-center items-center"
                >
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M40.4501 13.4599L42.1601 12.5199V12.5299C44.9003 16.8587 46.0071 22.0229 45.2815 27.0945C44.556 32.1661 42.0456 36.8128 38.2016 40.1997C34.3575 43.5866 29.4317 45.4917 24.3091 45.5727C19.1864 45.6537 14.2028 43.9054 10.2536 40.6418C6.30429 37.3782 3.64825 32.8132 2.76264 27.7671C1.87702 22.721 2.81987 17.5244 5.42179 13.111C8.02372 8.69768 12.1142 5.3568 16.9582 3.68864C21.8023 2.02048 27.0825 2.13438 31.8501 4.00988L31.5501 4.55988L29.6701 5.55988C29.0556 5.90067 28.5417 6.39733 28.1801 6.99988C27.8169 7.60376 27.6249 8.29516 27.6249 8.99988C27.6249 9.70459 27.8169 10.396 28.1801 10.9999C28.5402 11.6234 29.0619 12.1382 29.6901 12.4899L31.5701 13.4899L32.5701 15.3699C32.9128 15.9777 33.4112 16.4834 34.014 16.8349C34.6168 17.1864 35.3023 17.371 36.0001 17.3699C36.7039 17.3685 37.3945 17.1786 38.0001 16.8199C38.6113 16.466 39.113 15.9504 39.4501 15.3299L40.4501 13.4599ZM19.5 19C19.5 18.1716 18.8284 17.5 18 17.5C17.1716 17.5 16.5 18.1716 16.5 19V21C16.5 21.8284 17.1716 22.5 18 22.5C18.8284 22.5 19.5 21.8284 19.5 21V19ZM30 17.5C30.8284 17.5 31.5 18.1716 31.5 19V21C31.5 21.8284 30.8284 22.5 30 22.5C29.1716 22.5 28.5 21.8284 28.5 21V19C28.5 18.1716 29.1716 17.5 30 17.5ZM15.6302 28.5499C15.439 28.5981 15.259 28.683 15.1002 28.7999C14.9525 28.9348 14.8335 29.0981 14.7502 29.2799C14.6473 29.4472 14.5825 29.6349 14.5602 29.8299C14.5203 30.0212 14.5203 30.2187 14.5602 30.4099C14.6084 30.6012 14.6933 30.7812 14.8102 30.9399C15.8814 32.3682 17.2704 33.5274 18.8672 34.3259C20.4641 35.1243 22.2249 35.5399 24.0102 35.5399C25.7955 35.5399 27.5563 35.1243 29.1532 34.3259C30.75 33.5274 32.139 32.3682 33.2102 30.9399C33.3282 30.7828 33.4138 30.6037 33.4619 30.4131C33.5099 30.2225 33.5196 30.0243 33.4902 29.8299C33.4667 29.6326 33.4031 29.4421 33.3034 29.2701C33.2037 29.0981 33.0699 28.9484 32.9102 28.8299C32.753 28.7119 32.5739 28.6264 32.3834 28.5783C32.1928 28.5302 31.9945 28.5206 31.8002 28.5499C31.6028 28.5735 31.4123 28.637 31.2403 28.7368C31.0684 28.8365 30.9186 28.9703 30.8002 29.1299C30.0084 30.1856 28.9818 31.0424 27.8015 31.6326C26.6212 32.2227 25.3198 32.5299 24.0002 32.5299C22.6806 32.5299 21.3792 32.2227 20.1989 31.6326C19.0186 31.0424 17.992 30.1856 17.2002 29.1299C17.0809 28.972 16.9313 28.8394 16.7602 28.7399C16.593 28.6371 16.4052 28.5722 16.2102 28.5499C16.0189 28.51 15.8215 28.51 15.6302 28.5499Z"
                          fill="#0dabca"
                    ></path>
                    <path opacity="0.4"
                          d="M34.6899 3.82004C34.8219 3.58642 35.0112 3.39025 35.2399 3.25004C35.4716 3.11856 35.7335 3.04944 35.9999 3.04944C36.2663 3.04944 36.5282 3.11856 36.7599 3.25004C36.9887 3.39025 37.178 3.58642 37.3099 3.82004L38.4699 5.94004C38.6077 6.18789 38.8121 6.39226 39.0599 6.53004L41.1799 7.69004C41.4135 7.822 41.6097 8.01128 41.7499 8.24004C41.8814 8.47175 41.9505 8.73362 41.9505 9.00004C41.9505 9.26646 41.8814 9.52832 41.7499 9.76004C41.6097 9.98879 41.4135 10.1781 41.1799 10.31L39.0599 11.47C38.81 11.6051 38.605 11.8102 38.4699 12.06L37.3099 14.18C37.178 14.4137 36.9887 14.6098 36.7599 14.75C36.5282 14.8815 36.2663 14.9506 35.9999 14.9506C35.7335 14.9506 35.4716 14.8815 35.2399 14.75C35.0112 14.6098 34.8219 14.4137 34.6899 14.18L33.5299 12.06C33.3978 11.808 33.192 11.6022 32.9399 11.47L30.8199 10.31C30.5863 10.1781 30.3901 9.98879 30.2499 9.76004C30.1184 9.52832 30.0493 9.26646 30.0493 9.00004C30.0493 8.73362 30.1184 8.47175 30.2499 8.24004C30.3901 8.01128 30.5863 7.822 30.8199 7.69004L32.9399 6.53004C33.192 6.39791 33.3978 6.1921 33.5299 5.94004L34.6899 3.82004Z"
                          fill="#0dabca"
                    ></path>
                    <defs>
                      <linearGradient id="paint0_linear_323_2521" x1="7.51342" y1="2.51539" x2="42.8689" y2="4.34864"
                                      gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#FB815A"></stop>
                        <stop offset="1" stop-color="#FA4E18"></stop>
                      </linearGradient>
                      <linearGradient id="paint1_linear_323_2521" x1="31.452" y1="3.04944" x2="41.2237" y2="3.55612"
                                      gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#FB815A"></stop>
                        <stop offset="1" stop-color="#FA4E18"></stop>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
              <h3 class="text-neutral-900 text-xl font-bold leading-loose">Free To Use</h3>
              <div class="mt-4 opacity-60 text-slate-600 text-base font-normal leading-normal">Dewatermark.AI is free to use. You
                do not need to pay anything to delete watermark from image with us.
              </div>
            </li>
            <li class="flex flex-col">
              <div class="mb-6">
                <div
                  class="w-20 h-20 bg-white bg-opacity-50 backdrop-blur-lg rounded-2xl flex flex-col justify-center items-center"
                >
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path opacity="0.4"
                          d="M24.3199 42.3579C23.7839 43.9659 22.2479 45.8279 19.8719 45.4539C18.3639 45.2179 16.4819 44.5519 14.3319 43.2079C12.7239 42.2019 10.9579 40.8119 9.0719 38.9279C7.1859 37.0419 5.7979 35.2739 4.7919 33.6659C3.4479 31.5159 2.7819 29.6359 2.5439 28.1259C2.1719 25.7519 4.0319 24.2139 5.6419 23.6779L11.6659 21.6699C12.0659 21.5379 12.2639 21.4699 12.4119 21.5439C12.5579 21.6159 12.6359 21.8379 12.7919 22.2839C13.0919 23.1379 13.5639 23.8239 13.9339 24.3039C14.6259 25.2039 15.6259 26.2039 16.6539 27.2319L20.7659 31.3439C21.7939 32.3719 22.7939 33.3719 23.6939 34.0639C24.1739 34.4359 24.8619 34.9059 25.7139 35.2039C26.1599 35.3639 26.3839 35.4399 26.4539 35.5879C26.5279 35.7339 26.4619 35.9339 26.3279 36.3319L24.3199 42.3579Z"
                          fill="#0dabca"
                    ></path>
                    <path
                      d="M28.2299 12.5439C28.6099 12.4839 28.9939 12.4839 29.3739 12.5439C30.0819 12.6579 30.6399 13.0039 31.1119 13.3819C31.5479 13.7319 32.0259 14.2099 32.5519 14.7379L33.2639 15.4479C33.7899 15.9759 34.2679 16.4539 34.6179 16.8879C34.9979 17.3599 35.3439 17.9179 35.4559 18.6279C35.5159 19.0079 35.5159 19.3919 35.4559 19.7699C35.3439 20.4799 34.9979 21.0379 34.6179 21.5099C34.2679 21.9459 33.7899 22.4219 33.2639 22.9499L33.2119 23.0019C32.3519 23.8599 32.1199 24.1079 31.9599 24.3819C31.8996 24.4863 31.8462 24.5945 31.7999 24.7059C31.6739 24.9999 31.6139 25.3439 31.4399 26.5639L31.4239 26.6679C31.2039 28.2239 31.0159 29.5359 30.7439 30.5139C30.4759 31.4899 30.0119 32.5819 28.9019 33.1339C28.5988 33.2838 28.2764 33.3908 27.9439 33.4519C26.7319 33.6759 25.7119 33.0919 24.9139 32.4799C24.1199 31.8679 23.1959 30.9439 22.1059 29.8519L18.1479 25.8959C17.0559 24.8039 16.1339 23.8799 15.5219 23.0859C14.9079 22.2879 14.3239 21.2699 14.5499 20.0559C14.6099 19.7239 14.7179 19.4019 14.8699 19.0999C15.4199 17.9879 16.5099 17.5239 17.4859 17.2559C18.4659 16.9859 19.7759 16.7959 21.3319 16.5759L21.4359 16.5599C22.6559 16.3859 22.9999 16.3259 23.2939 16.1999C23.4039 16.1559 23.5139 16.0999 23.6159 16.0399C23.8919 15.8799 24.1419 15.6459 24.9999 14.7879L25.0499 14.7379C25.5779 14.2099 26.0559 13.7319 26.4899 13.3819C26.9639 13.0019 27.5199 12.6579 28.2299 12.5439Z"
                      fill="#0dabca"
                    ></path>
                    <path
                      d="M38.6139 3.67995C38.9886 3.30542 39.4333 3.00835 39.9228 2.8057C40.4123 2.60306 40.9368 2.49881 41.4666 2.4989C41.9964 2.49899 42.5209 2.60343 43.0103 2.80625C43.4997 3.00906 43.9444 3.30628 44.3189 3.68095C44.6934 4.05561 44.9905 4.50037 45.1931 4.98984C45.3958 5.47931 45.5 6.00389 45.4999 6.53365C45.4999 7.06341 45.3954 7.58796 45.1926 8.07736C44.9898 8.56676 44.6926 9.01142 44.3179 9.38595L37.3179 16.3879C37.1419 16.5639 37.0539 16.6499 36.9579 16.6399C36.8639 16.6299 36.7939 16.5199 36.6539 16.2999C36.5072 16.0698 36.3477 15.8481 36.1759 15.6359C35.7189 15.0934 35.2343 14.5747 34.7239 14.0819L33.9179 13.2759C33.4279 12.7859 32.8859 12.2419 32.3639 11.8239C32.1519 11.6515 31.9302 11.4912 31.6999 11.3439C31.4799 11.2059 31.3699 11.1379 31.3599 11.0419C31.3499 10.9459 31.4379 10.8579 31.6119 10.6819L38.6139 3.67995Z"
                      fill="#0dabca"
                    ></path>
                    <defs>
                      <linearGradient id="paint0_linear_323_2534" x1="5.32311" y1="21.5134" x2="25.0197" y2="22.5347"
                                      gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#FB815A"></stop>
                        <stop offset="1" stop-color="#FA4E18"></stop>
                      </linearGradient>
                      <linearGradient id="paint1_linear_323_2534" x1="16.9753" y1="12.4989" x2="34.2184" y2="13.3929"
                                      gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#FB815A"></stop>
                        <stop offset="1" stop-color="#FA4E18"></stop>
                      </linearGradient>
                      <linearGradient id="paint2_linear_323_2534" x1="33.0257" y1="2.4989" x2="44.6364" y2="3.10089"
                                      gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#FB815A"></stop>
                        <stop offset="1" stop-color="#FA4E18"></stop>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
              <h3 class="text-neutral-900 text-xl font-bold leading-loose">Fun Multiplied</h3>
              <div class="mt-4 opacity-60 text-slate-600 text-base font-normal leading-normal">We automatically enhance the image
                to create multiple final looks. Choose which works best for you!
              </div>
            </li>
            <li class="flex flex-col">
              <div class="mb-6">
                <div
                  class="w-20 h-20 bg-white bg-opacity-50 backdrop-blur-lg rounded-2xl flex flex-col justify-center items-center"
                >
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M35.3518 26.9251L24.4324 24.4V13.4474C24.4324 11.5435 22.8889 10 20.985 10C19.081 10 17.5375 11.5435 17.5375 13.4474V33.4L15.2613 29.2691C13.6097 26.2719 9.13519 26.8748 8.33579 30.2023C8.11961 31.1021 8.24407 32.0501 8.68519 32.8637L14.1052 42.8599C15.1543 44.7948 17.1787 46 19.3798 46H34C37.3137 46 40 43.3137 40 40V32.7708C40 29.9779 38.0729 27.5544 35.3518 26.9251Z"
                      fill="#0dabca"
                    ></path>
                    <g opacity="0.4">
                      <path d="M9 15H11" stroke="#0dabca" stroke-width="3" stroke-linecap="round"></path>
                      <path d="M33 15H31" stroke="#0dabca" stroke-width="3" stroke-linecap="round"></path>
                      <path d="M29.4801 6.52002L28.0601 7.92002" stroke="#0dabca" stroke-width="3"
                            stroke-linecap="round"
                      ></path>
                      <path d="M12.5 6.52002L13.92 7.92002" stroke="#0dabca" stroke-width="3"
                            stroke-linecap="round"
                      ></path>
                      <path d="M21 3V5" stroke="#0dabca" stroke-width="3" stroke-linecap="round"></path>
                    </g>
                    <defs>
                      <linearGradient id="paint0_linear_323_2545" x1="11.7714" y1="10" x2="38.0606" y2="11.2117"
                                      gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#FB815A"></stop>
                        <stop offset="1" stop-color="#0dabca"></stop>
                      </linearGradient>
                      <linearGradient id="paint1_linear_323_2545" x1="9.23571" y1="15" x2="10.8648" y2="15.1689"
                                      gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#FB815A"></stop>
                        <stop offset="1" stop-color="#0dabca"></stop>
                      </linearGradient>
                      <linearGradient id="paint2_linear_323_2545" x1="31.2357" y1="15" x2="32.8648" y2="15.1689"
                                      gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#FB815A"></stop>
                        <stop offset="1" stop-color="#0dabca"></stop>
                      </linearGradient>
                      <linearGradient id="paint3_linear_323_2545" x1="28.2274" y1="6.52002" x2="29.3932" y2="6.58133"
                                      gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#FB815A"></stop>
                        <stop offset="1" stop-color="#0dabca"></stop>
                      </linearGradient>
                      <linearGradient id="paint4_linear_323_2545" x1="12.6674" y1="6.52002" x2="13.8332" y2="6.58133"
                                      gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#FB815A"></stop>
                        <stop offset="1" stop-color="#0dabca"></stop>
                      </linearGradient>
                      <linearGradient id="paint5_linear_323_2545" x1="21.1179" y1="3" x2="21.9406" y2="3.02133"
                                      gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#FB815A"></stop>
                        <stop offset="1" stop-color="#0dabca"></stop>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
              <h3 class="text-neutral-900 text-xl font-bold leading-loose">Fast &amp; Easy</h3>
              <div class="mt-4 opacity-60 text-slate-600 text-base font-normal leading-normal">Enhance, retouch, resize and
                download your photos lightning fast.
              </div>
            </li>
            <li class="flex flex-col">
              <div class="mb-6">
                <div
                  class="w-20 h-20 bg-white bg-opacity-50 backdrop-blur-lg rounded-2xl flex flex-col justify-center items-center"
                >
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path opacity="0.4" fill-rule="evenodd" clip-rule="evenodd"
                          d="M19.814 2H19.928C20.4584 2 20.9671 2.21071 21.3422 2.58579C21.7173 2.96086 21.928 3.46957 21.928 4C21.928 4.53043 21.7173 5.03914 21.3422 5.41421C20.9671 5.78929 20.4584 6 19.928 6C16.62 6 14.296 6.002 12.504 6.192C10.748 6.378 9.736 6.726 8.972 7.264C8.30617 7.73255 7.72744 8.31399 7.262 8.982C6.722 9.752 6.376 10.774 6.192 12.54C6 14.34 6 16.678 6 20C6 23.322 6.002 25.66 6.192 27.46C6.376 29.226 6.724 30.248 7.262 31.02C7.728 31.688 8.306 32.268 8.972 32.736C9.736 33.276 10.748 33.622 12.504 33.808C14.296 33.998 16.62 34 19.928 34H27.892C31.2 34 33.524 33.998 35.316 33.808C37.072 33.622 38.084 33.274 38.85 32.736C39.0646 32.58 39.3081 32.4683 39.5663 32.4073C39.8245 32.3463 40.0923 32.3373 40.354 32.3809C40.6157 32.4244 40.8662 32.5196 41.0907 32.6608C41.3153 32.8021 41.5096 32.9866 41.6621 33.2036C41.8147 33.4207 41.9226 33.6659 41.9794 33.9251C42.0363 34.1842 42.041 34.4521 41.9934 34.7131C41.9457 34.9741 41.8466 35.223 41.7018 35.4453C41.557 35.6676 41.3694 35.8589 41.15 36.008C39.602 37.098 37.824 37.564 35.738 37.786C33.71 38 31.174 38 28.006 38H26.8C26.046 38 26 38.046 26 38.8V40C26 41.654 26.346 42 28 42H32C32.5304 42 33.0391 42.2107 33.4142 42.5858C33.7893 42.9609 34 43.4696 34 44C34 44.5304 33.7893 45.0391 33.4142 45.4142C33.0391 45.7893 32.5304 46 32 46H16C15.4696 46 14.9609 45.7893 14.5858 45.4142C14.2107 45.0391 14 44.5304 14 44C14 43.4696 14.2107 42.9609 14.5858 42.5858C14.9609 42.2107 15.4696 42 16 42H20C21.654 42 22 41.654 22 40V38.8C22 38.046 21.954 38 21.2 38H19.814C16.646 38 14.11 38 12.084 37.786C9.996 37.566 8.22 37.098 6.67 36.008C5.6226 35.2711 4.7122 34.3567 3.98 33.306C2.896 31.752 2.434 29.972 2.214 27.878C2 25.84 2 23.298 2 20.112V19.888C2 16.704 2 14.158 2.214 12.122C2.434 10.028 2.896 8.248 3.98 6.694C4.71223 5.64335 5.62262 4.7289 6.67 3.992C8.22 2.902 9.996 2.436 12.084 2.214C14.11 2 16.646 2 19.814 2Z"
                          fill="#0dabca"
                    ></path>
                    <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M34.396 2H36.604C38.402 2 39.9 2 41.088 2.16C42.344 2.328 43.478 2.7 44.388 3.61C45.3 4.522 45.672 5.656 45.84 6.91C46 8.1 46 9.6 46 11.398V19.606C46 21.404 46 22.902 45.84 24.09C45.672 25.346 45.3 26.48 44.388 27.39C43.478 28.302 42.344 28.674 41.088 28.842C39.9 29.002 38.402 29.002 36.604 29.002H34.396C32.598 29.002 31.1 29.002 29.912 28.842C28.656 28.674 27.522 28.302 26.612 27.39C25.7 26.48 25.328 25.346 25.16 24.09C25 22.902 25 21.402 25 19.606V11.396C25 9.598 25 8.1 25.16 6.912C25.328 5.656 25.7 4.522 26.612 3.612C27.522 2.7 28.656 2.328 29.912 2.16C31.1 2 32.598 2 34.396 2ZM33.5 22.5C33.5 21.396 34.392 20.5 35.49 20.5H35.51C36.61 20.5 37.5 21.396 37.5 22.5C37.5 23.604 36.608 24.5 35.51 24.5H35.49C34.961 24.4984 34.4542 24.2869 34.0811 23.9119C33.7079 23.5368 33.4989 23.029 33.5 22.5Z"
                          fill="#0dabca"
                    ></path>
                    <defs>
                      <linearGradient id="paint0_linear_323_2560" x1="6.71734" y1="2.00001" x2="39.5967" y2="3.55089"
                                      gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#FB815A"></stop>
                        <stop offset="1" stop-color="#0dabca"></stop>
                      </linearGradient>
                      <linearGradient id="paint1_linear_323_2560" x1="27.475" y1="2.00001" x2="44.7358" y2="2.69607"
                                      gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#FB815A"></stop>
                        <stop offset="1" stop-color="#0dabca"></stop>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
              <h3 class="text-neutral-900 text-xl font-bold leading-loose">All Devices Compatible</h3>
              <div class="mt-4 opacity-60 text-slate-600 text-base font-normal leading-normal">Dewatermark is available on iOS
                &amp; Android stores. Our online AI watermark remover works seamlessly on mobile, desktop and tablet devices.
              </div>
            </li>
          </ul>
          <div class="flex flex-col items-center">
            <el-upload
              :before-upload="handleBeforeUpload"
              action="http://192.168.110.244:8082/user/img/updateImg"
              :show-file-list="false"
              :limit="1"
              class="w-full"
            >
              <div
                class="mx-1 flex w-full cursor-pointer flex-col items-center justify-center rounded-3  px-12 lg:mx-0 lg:w-[560px] lg:px-0"
              >
                <el-button
                  class="w-44 h-14 rounded-2xl border border-sky-400 text-sky-400 text-lg font-semibold leading-tight bg-sky-50 transition"
                >Try now
                </el-button>
              </div>
            </el-upload>

          </div>
        </div>
      </div>
    </div>
    <div class="container-div py-10 lg:py-[120px] bg-gradient-to-r from-teal-500 to-sky-500">
      <div class="container">
        <div class="lg:max-w-[60%] mx-auto text-center"><h2
          class="text-white lg:text-9 text-6 font-bold leading-loose lg:leading-[46px] "
        >Explore our free AI tools</h2>
          <p class="opacity-80 text-center text-white text-sm lg:text-xl font-normal leading-tight lg:leading-7 lg:mt-8">Make
            your pictures pop with features that are completely free</p></div>
        <div class="grid grid-cols-1 lg:grid-cols-3 mt-14 gap-4">
          <div data-nosnippet="true" class="">
            <div class="w-full h-auto"><img
              src="https://assets.dewatermark.ai/images/watermark-remover/new/removeBgThumbnail.webp" alt="Remove-BG.AI"
              class="w-full h-auto m-auto"
            ></div>
            <div class="flex flex-col gap-3 pb-10 pt-[30px] px-5 bg-white rounded-bl-2xl rounded-br-2xl">
              <div class="flex gap-3"><img src="https://assets.dewatermark.ai/images/watermark-remover/new/removeBgLogo.webp"
                                           alt="Remove-BG.AI" class="w-8 h-8 rounded-full"
              ><span class="text-neutral-900 text-base font-bold leading-tight">Remove-BG.AI</span></div>
              <div class="text-slate-800 text-base font-normal leading-normal min-h-[180px]">AI <a href="https://remove-bg.ai"
                                                                                                   class="font-medium text-[#EC511F] hover:underline"
              >background remover</a> tool in just one click. Remove-bg.ai helps remove background images quickly and add new
                background, text, color to your photo without professional software.
              </div>
            </div>
          </div>
          <div data-nosnippet="true" class="">
            <div class="w-full h-auto"><img src="https://assets.dewatermark.ai/images/watermark-remover/new/upscaleThumbnail.webp"
                                            alt="Upscales.AI" class="w-full h-auto m-auto"
            ></div>
            <div class="flex flex-col gap-3 pb-10 pt-[30px] px-5 bg-white rounded-bl-2xl rounded-br-2xl">
              <div class="flex gap-3"><img src="https://assets.dewatermark.ai/images/watermark-remover/new/upscaleLogo.webp"
                                           alt="Upscales.AI" class="w-8 h-8 rounded-full"
              ><span class="text-neutral-900 text-base font-bold leading-tight">Upscales.AI</span></div>
              <div class="text-slate-800 text-base font-normal leading-normal min-h-[180px]">Free AI image upscaler tool that
                enhance your picture resolution, refine the details, colors, saturation of an image automatically without needing
                any photo editing know-how
              </div>
            </div>
          </div>
          <div data-nosnippet="true" class="">
            <div class="w-full h-auto"><img
              src="https://assets.dewatermark.ai/images/watermark-remover/new/passportMakerThumbnail.webp" alt="Passportmaker.AI"
              class="w-full h-auto m-auto"
            ></div>
            <div class="flex flex-col gap-3 pb-10 pt-[30px] px-5 bg-white rounded-bl-2xl rounded-br-2xl">
              <div class="flex gap-3"><img src="https://assets.dewatermark.ai/images/watermark-remover/new/passportMakerLogo.webp"
                                           alt="Passportmaker.AI" class="w-8 h-8 rounded-full"
              ><span class="text-neutral-900 text-base font-bold leading-tight">Passportmaker.AI</span></div>
              <div class="text-slate-800 text-base font-normal leading-normal min-h-[180px]">Free tool to make passport photo,
                visa photo, ID photo with correct photo sizes for personal documents. Turn your selfies into standardized, quality
                picture for CV and online document submission in just a few seconds.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <section class="container-div bg-white line-height-normal">
      <div class="container flex lg:flex-row flex-col lg:gap-[112px]">
        <div class="mb-6 lg:mb-12 lg:w-1/2"><h2 class="text-neutral-900 text-2xl lg:text-4xl font-bold lg:leading-[46px]">
          Frequently Asked Questions</h2>
          <p class="text-slate-600 text-sm  lg:text-xl font-medium lg:leading-7 leading-tight mt-6">Stuck something - we're
            here to help.</p></div>
        <ul class="divide-y lg:w-1/2">
          <li v-for="item in 8 " :key="item">
            <button class="flex items-center justify-between cursor-pointer w-full px-5 py-4 bg-white  border-0 b-t-1 b-#eeeeee"
                    id="headlessui-disclosure-button-275"
                    type="button" aria-expanded="false" data-headlessui-state="" @click="askListChangeFn(item)"
            ><h3 class="block pr-4 font-semibold text-left text-neutral-ink-600 ">{{ $t("home.faq.question" + item) }}</h3>
              <div class="w-4 text-neutral">
                <div class="inline-block">
                  <svg-icon name="jian" v-if="askList.includes(item)"></svg-icon>
                  <svg-icon name="jia" v-else></svg-icon>
                </div>
              </div>

            </button>
            <div class="text-left  pb-4 text-#252638 px-5" v-if="askList.includes(item)">
              {{ $t("home.faq.answer" + item) }}
            </div>
          </li>

        </ul>
      </div>

    </section>
  </main>
</template>

<script setup lang="ts">
import Line from "@/assets/icons/line.svg";
import Or from "@/assets/images/home/Or.webp";
import Re from "@/assets/images/home/Re.webp";
import one from "@/assets/images/home/1.png";
import two from "@/assets/images/home/2.jpg";
import three from "@/assets/images/home/3.jpg";
import four from "@/assets/images/home/4.jpg";
import wmOne from "@/assets/images/home/5.png"
import wmTwo from "@/assets/images/home/6.png"
import wmThree from "@/assets/images/home/7.png"
import wmFour from "@/assets/images/home/8.png"
import Mask from "@/components/Mask/index.vue";
import { onBeforeUnmount, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/modules/user";
import { useTabsStore } from "@/stores/modules/tabs";
import { useKeepAliveStore } from "@/stores/modules/keepAlive";
import { initDynamicRouter } from "@/routers/modules/dynamicRouter";
import useFile, { Action } from "@/hooks/useFile";
import SvgIcon from "@/components/SvgIcon/index.vue";

import {removeBackGround} from "@/api/modules/ai"

const userStore = useUserStore();
const tabsStore = useTabsStore();
const keepAliveStore = useKeepAliveStore();

const router = useRouter();

const { handleAction } = useFile();
const jump = () => {
  // 上传图片跳转
  if(urlRadio.value === 'deBg'){
    router.push({ path: "/detail", query: { from: 1 } });
  }else{
    router.push({ path: "/deWaterMark", query: { from: 1 } });
  }
};
const handleBeforeUpload = file => {
  const uploadType= urlRadio.value === 'deBg'?1:2
    // 存之前的图片
  handleAction(file, Action["UPLOAD"], jump,uploadType);
  // jump()
  return false;
};

const askList = ref([]);

const imgArr =  ref([one, two, three, four]);

const isMask = ref(false);

onMounted(async () => {
  userStore.setToken("xxx");

  // 2.添加动态路由
  await initDynamicRouter();

  // 3.清空 tabs、keepAlive 数据
  tabsStore.setTabs([]);
  keepAliveStore.setKeepAliveName([]);

  document.addEventListener("dragenter", handleDragEnter);
  document.addEventListener("dragover", handleDragOver);
  document.addEventListener("dragleave", hanleDragLeave);
});

onBeforeUnmount(() => {
  document.removeEventListener("dragenter", handleDragEnter);
  document.removeEventListener("dragover", handleDragOver);
  document.removeEventListener("dragleave", hanleDragLeave);
});

/**
 * 切换标签页
 */
const urlRadio  = ref('deBg')
const changeUrl = (type) =>{
  urlRadio.value = type;
  if(type==='deBg'){
    imgArr.value = [one, two, three, four];
  }else {
    imgArr.value = [wmOne, wmTwo, wmThree, wmFour];
  }
}

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

  e.preventDefault();
  if (e.target.classList.contains("mask")) {
    isMask.value = false;
  }
};

const handlePicClick = index => {
  //跳转 4个小图
  if(urlRadio.value === 'deBg'){
    router.push({ path: "/detail", query: { index } });
  }else{
      fetch(imgArr.value[index])
        .then(response => response.blob())
        .then(async blob => {
          // 上传图片并绘制
          handleBeforeUpload(blob)
        })
        .catch(error => console.error("Error reading imported image:", error));
    };
};

// 问答展开收起
const askListChangeFn = item => {
  const index = askList.value.indexOf(item);
  index !== -1 ? askList.value.splice(index, item) : askList.value.push(item);
};

</script>

<style scoped lang="scss">
.container-div {
  display: flex;
  justify-content: center;
  text-align: left;
}

@media screen and (width>=600px) {
  .container {
    max-width: 600px;
  }
  .container-div {
    padding: 48px 0;
  }
}

@media screen and (width>=728px) {
  .container {
    max-width: 728px;
  }
  .container-div {
    padding: 60px 0;
  }
}

@media screen and (width>=1172px) {
  .container {
    max-width: 1172px;
  }
  .container-div {
    padding: 80px 0;
  }
}

.feedback-button {
  background: none;
  border: 1px solid #ccc;
  padding: 5px 10px;
  cursor: pointer;
}

.main-content {
  text-align: center;
  box-sizing: border-box;
}

.images {
  display: flex;
  justify-content: center;
  align-items: center;
}

.image {
  width: 300px;
  height: auto;
  margin: 0 20px;
}

.remove {
  --board-black-color: #4a4aeb33;
  --board-white-color: transparent;
  background-image: linear-gradient(45deg, var(--board-black-color) 25%, var(--board-white-color) 25%),
  linear-gradient(-45deg, var(--board-black-color) 25%, var(--board-white-color) 25%),
  linear-gradient(45deg, var(--board-white-color) 75%, var(--board-black-color) 75%),
  linear-gradient(-45deg, var(--board-white-color) 75%, var(--board-black-color) 75%);
  background-size: 20px 20px;
  background-position: 0 0,
  0 10px,
  10px -10px,
  -10px 0;
}

.download-button {
  background-color: blue;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  margin-bottom: 10px;
}

.formats {
  margin: 20px 0;
}

.photo-selection {
  margin-top: 40px;
}

.photo-options {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.option {
  cursor: pointer;

  border-radius: 50%;
  margin: 0 10px;
}

:deep(.el-upload) {
  width: 100%;
}

</style>

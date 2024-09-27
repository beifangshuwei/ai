<script setup lang="ts">

</script>

<template>
  <div class="introuce border bg-white rounded-md p-12 sm:p-6 mx-auto lg:w-220">
    <div class="prose border bg-white rounded-md p-12 sm:p-6 mx-auto h-fit w-full">
      <div class="text-center"><h1>Keep in touch</h1></div>
      <p>Shoot us an email:</p>
      <ul>
        <li><a href="mailto:dewatermark@gmail.com">dewatermark@gmail.com</a><span> (for general questions)</span></li>
        <li><a href="mailto:support@dewatermark.ai">support@dewatermark.ai</a><span> (for order, subscription, cancelation)</span>
        </li>
      </ul>
      <p>We kindly ask for 1-2 business days to ensure all emails are answered thoroughly and everyone is helped.</p>
      <h2>Tips</h2>
      <ul>
        <li>If you are inquiring about an order, please include your ordernumber and email in the title or message.</li>
        <li>If your email is regarding a subscription that has already been delivered, please include your order number and any
          necessary photos of proofs in question/ request. This will allow our team to help you more quickly.
        </li>
      </ul>
      <p>Due to the high volume of calls, we no longer offer a phone line at this time.</p>
      <h2>More</h2>
      <ul>
        <li><a href="/about-us">About Us</a></li>
        <li><a href="/home">Watermark remover features</a></li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
.introuce {
  padding: 48px;
  font-size: 18px;
  line-height: 1.5;
  margin-top: 6px;
  margin-bottom: 6px;

  :where(h1):not(:where([class~=not-prose] *)) {
    color: var(--board-black-color);
    font-weight: 800;
    font-size: 2.25em;
    margin-top: 0;
    margin-bottom: .8888889em;
    line-height: 1.1111111;
  }

  h2 {
    margin: 48px 0 24px;
  }

  h3 {
    margin: 32px 0 12px;
  }

  ul {
    padding-left: 24px;

    li {
      list-style: disc;
      padding-left: 12px;
      padding: 8px 0;
    }
  }

  p {
    padding: 20px 0;
  }
}
</style>

<template>
  <h1>Contact</h1>
  <form @submit.prevent="sendMail">
    <div>
      <label for="nickname">Nickname</label>
      <input
        type="text"
        required
        placeholder="Nickname"
        id="nickname"
        minlength="2"
        maxlength="20"
        v-model="nickname"
      />
    </div>

    <div>
      <label for="email">email</label>
      <input type="email" required placeholder="Email" id="email" v-model="email" />
    </div>

    <div>
      <label for="content">Content</label>
      <textarea
        placeholder="Content..."
        required
        id="content"
        minlength="20"
        maxlength="500"
        v-model="content"
      >
      </textarea>
    </div>

    <button class="right" :disabled="isInvalidForm">Send</button>
    <p v-if="hasSentMail || hasError">The message has been successfully sent</p>
    <!--p v-if="hasError" class="error">The mail was not sent</p-->
  </form>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
//import { Resend } from 'resend'

const hasSentMail = ref<boolean>(false)
const hasError = ref<boolean>(false)
const nickname = ref<string>()
const email = ref<string>()
const content = ref<string>()
const isInvalidForm = computed(() => !nickname.value || !email.value || !content.value)

//const resend = new Resend('re_apikey')

async function sendMail() {
  hasSentMail.value = true
  /*const { error } = await resend.emails.send({
    from: 'Vue GIQ <noreply@jgalvani.dev>',
    to: ['jchristophegalvani@gmail.com'],
    subject: 'Vue GIQ: Demande de contact de ' + nickname.value,
    html: `
      <strong>name: ${nickname.value}</strong></br>
      <strong>email: ${email.value}</strong></br>
      </br>${content.value}
    `,
  })
  if (!error) hasSentMail.value = true
  else hasError.value = true*/
}
</script>

<style>
@media (min-width: 1024px) {
  .contact {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}

form {
  position: relative;
  width: 50vw;
}
.error {
  color: red !important;
}
</style>

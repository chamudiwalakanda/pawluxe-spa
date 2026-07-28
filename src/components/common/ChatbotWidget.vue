<script setup>
import { nextTick, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isOpen = ref(false)
const input = ref('')
const messageList = ref(null)
const conversation = ref([
  {
    sender: 'bot',
    text: 'Ayubowan! I am Lux, the PAWLUXE dog-care assistant. Ask about food, ticks, heat, vaccines, common illnesses or medicine safety.',
  },
])

const quickQuestions = [
  'Tick fever signs',
  'Dog is too hot',
  'Puppy vaccine care',
  'Can I give paracetamol?',
]

const knowledge = [
  {
    keywords: ['tick', 'ticks', 'tick fever', 'pale gums'],
    answer: 'Tick-borne illness may cause fever, weakness, poor appetite, pale gums or unusual bleeding. A same-day veterinary check and blood test may be needed. Removing a visible tick does not treat an infection already transmitted.',
  },
  {
    keywords: ['heat', 'hot', 'panting', 'heatstroke', 'sun'],
    answer: 'Heavy panting, drooling, very red gums, staggering or collapse can mean heatstroke. Move the dog to shade, wet the body with cool rather than ice-cold water, and travel to a veterinary clinic immediately.',
  },
  {
    keywords: ['puppy', 'vaccine', 'vaccination', 'parvo'],
    answer: 'Puppies need a veterinary vaccination series and should avoid high-risk contact with unknown dogs until the clinic confirms protection. Repeated vomiting or bloody diarrhoea in a puppy is an emergency.',
  },
  {
    keywords: ['paracetamol', 'panadol', 'ibuprofen', 'human medicine', 'painkiller'],
    answer: 'Do not give paracetamol, ibuprofen or another human medicine unless a veterinarian has prescribed the exact medicine and dose. Many common human medicines can poison dogs.',
  },
  {
    keywords: ['scratch', 'itch', 'skin', 'rash', 'fungus', 'hair loss'],
    answer: 'In Sri Lanka’s humid weather, fleas, allergies, yeast and bacterial skin infections are common possibilities. Keep the area dry, prevent licking and arrange a clinic visit for redness, odour, wounds or hair loss.',
  },
  {
    keywords: ['vomit', 'vomiting', 'diarrhea', 'diarrhoea', 'stomach'],
    answer: 'Vomiting or diarrhoea can have many causes. Seek urgent help for blood, repeated vomiting, severe weakness, a swollen abdomen, suspected poisoning or any affected puppy. Offer water carefully but do not force food or medicine.',
  },
  {
    keywords: ['snake', 'bite', 'poison'],
    answer: 'A suspected snake bite or poisoning is an emergency. Keep the dog calm, limit movement and go directly to a veterinary clinic. Do not cut the wound, apply a tourniquet or give home remedies.',
  },
  {
    keywords: ['ear', 'head shake', 'ear smell', 'discharge'],
    answer: 'Head shaking, pain, odour or discharge can indicate an ear infection. Keep the ear dry and avoid cotton buds or unprescribed drops until a veterinarian checks the canal and eardrum.',
  },
  {
    keywords: ['breed', 'category', 'small dog', 'large dog', 'sri lankan hound'],
    answer: 'Dog categories are often described by size, coat, activity and original purpose. Daily care should be based on the individual dog’s age, body condition, behaviour, coat and health rather than breed name alone.',
  },
  {
    keywords: ['food', 'feed', 'kibble', 'rice', 'chicken'],
    answer: 'Use a complete dog food matched to life stage and activity. Measure portions, keep fresh water available and change food gradually over about a week. Home-cooked diets should be balanced with veterinary nutrition guidance.',
  },
  {
    keywords: ['worm', 'deworm', 'flea', 'medicine', 'antibiotic'],
    answer: 'Parasite medicine and antibiotics depend on age, weight, diagnosis and health history. Use only a dog-safe product at the label or veterinary dose, and never share medicine between pets.',
  },
  {
    keywords: ['groom', 'bath', 'monsoon', 'wet'],
    answer: 'Brush regularly and dry the coat, paws and ears after rain or bathing. Use dog-safe shampoo and avoid bathing so frequently that the skin becomes dry or irritated.',
  },
]

function findAnswer(question) {
  const lower = question.toLowerCase()
  const ranked = knowledge
    .map((item) => ({
      item,
      score: item.keywords.reduce((score, keyword) => score + (lower.includes(keyword) ? keyword.length : 0), 0),
    }))
    .sort((a, b) => b.score - a.score)

  return ranked[0]?.score
    ? ranked[0].item.answer
    : 'I can give basic educational guidance, but I cannot diagnose your dog. Try asking about ticks, heat, puppies, skin, ears, vomiting, vaccines, food or medicine safety. For urgent symptoms, contact a veterinarian immediately.'
}

async function scrollToBottom() {
  await nextTick()
  if (messageList.value) messageList.value.scrollTop = messageList.value.scrollHeight
}

function submitMessage(text = input.value) {
  const cleanText = String(text).trim()
  if (!cleanText) return
  conversation.value.push({ sender: 'user', text: cleanText })
  input.value = ''
  conversation.value.push({ sender: 'bot', text: findAnswer(cleanText) })
  scrollToBottom()
}

function meetDoctors() {
  isOpen.value = false
  router.push('/health#meet-doctors')
}
</script>

<template>
  <div class="chatbot">
    <transition name="chat-pop">
      <section v-if="isOpen" class="chatbot__panel" aria-label="PAWLUXE dog care chatbot">
        <header class="chatbot__header">
          <div>
            <strong>Ask Lux</strong>
            <span>Dog-care assistant for Sri Lanka</span>
          </div>
          <button type="button" aria-label="Close chatbot" @click="isOpen = false">×</button>
        </header>

        <div ref="messageList" class="chatbot__messages" aria-live="polite">
          <div
            v-for="(message, index) in conversation"
            :key="index"
            class="chatbot__message"
            :class="`chatbot__message--${message.sender}`"
          >
            {{ message.text }}
          </div>
        </div>

        <div class="chatbot__quick-list">
          <button v-for="question in quickQuestions" :key="question" type="button" @click="submitMessage(question)">
            {{ question }}
          </button>
        </div>

        <form class="chatbot__form" @submit.prevent="submitMessage()">
          <input v-model="input" maxlength="180" type="text" placeholder="Ask a dog-care question" aria-label="Chatbot question" />
          <button type="submit" aria-label="Send message">➜</button>
        </form>
        <button class="chatbot__doctor-link" type="button" @click="meetDoctors">Meet the demo veterinary team</button>
        <p class="chatbot__notice">Educational guidance only. Not a substitute for a veterinary examination.</p>
      </section>
    </transition>

    <button class="chatbot__launcher" type="button" :aria-expanded="isOpen" @click="isOpen = !isOpen">
      <span aria-hidden="true">🐾</span>
      <span>{{ isOpen ? 'Close' : 'Ask Lux' }}</span>
    </button>
  </div>
</template>

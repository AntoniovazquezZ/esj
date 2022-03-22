<template>
  <q-item
    clickable
    tag="a"
    :to="link"
    v-if="roles.includes(user.role)"
  >
    <q-item-section
      v-if="icon"
      avatar
    >
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'EssentialLink',
  props: {
    title: {
      type: String,
      required: true
    },

    link: {
      type: String,
      default: '#'
    },

    icon: {
      type: String,
      default: ''
    },

    roles: {
      type: Array,
      default: ''
    }
  },

  methods: {
    checkRole(roles){
      return roles.includes(this.user.role)
    }
  },

  computed: {
        ...mapState('auth', [ 'user' ])
    },
}
</script>

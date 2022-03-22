<style scoped>
    .profile{
       width: 100%;
       height: 100px;
       background-color: #1976D2; 
       display: flex;
       justify-content: flex-start;
       align-items: center;
    }

    .profile{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding-left: 10px;
        color: white;
    }

    .profile div span:nth-child(1){
        font-weight: bold;
        font-size: 20px;
    }

    .img-container{
        width: 50px;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .img-container img{
        width: 50px;
        height: 50px;
        border-radius: 50%;
        object-fit: cover;
        object-position: center;
    }
</style>

<template>
    <q-layout view="lHh Lpr lFf">
        <q-header elevated>
            <q-toolbar>
                <q-btn
                flat
                dense
                round
                icon="menu"
                aria-label="Menu"
                @click="leftDrawerOpen = !leftDrawerOpen"
                />

            </q-toolbar>
        </q-header>

        <q-drawer
            v-model="leftDrawerOpen"
            show-if-above
            content-class="bg-grey-1"
            >
            <div class="profile">
                <div class="img-container">
                    <img :src="user.photo" alt="">
                </div>
                <div class="q-ml-sm">
                    <span>{{ user.name }}</span>
                    <br>
                    <span>TISCO</span>
                </div>
            </div>
            <q-list>
                <EssentialLink
                    v-for="link in essentialLinks"
                    :key="link.title"
                    v-bind="link"
                    />
                    <q-item
                        clickable
                        @click="logOut"
                    >
                        <q-item-section
                        avatar
                        >
                        <q-icon name="logout" />
                        </q-item-section>

                        <q-item-section>
                        <q-item-label>Salir</q-item-label>
                        </q-item-section>
                    </q-item>
            </q-list>
        </q-drawer>

        <q-page-container style="background-color: #EEEEEE;">
            <router-view />
        </q-page-container>
    </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'
import { db } from 'boot/firebase'
import { mapState, mapActions } from 'vuex'

const linksData = [
    {
        title: 'Inicio',
        icon: 'home',
        link: '/dashboard',
        roles: ['admin', 'user']
    },
    {
        title: 'Mis reservaciones',
        icon: 'event',
        link: '/reservations',
        roles: ['admin', 'user']
    },
    {
        title: 'Directorio',
        icon: 'contact_mail',
        link: '/directory',
        roles: ['user', 'admin']
    },
    {
        title: 'Ligas de interes',
        icon: 'link',
        link: '/links',
        roles: ['user', 'admin']
    },
    {
        title: 'Preguntas frecuentes',
        icon: 'help',
        link: '/questions',
        roles: ['admin', 'user']
    },
    
    
];

export default {
    name: 'MainLayout',

    components: { EssentialLink },

    computed: {
        ...mapState('auth', [ 'user' ])
    },

    data () {
        return {
            leftDrawerOpen: false,
            essentialLinks: linksData
        }
    },

    methods: {
        ...mapActions('auth', [ 'closeSesion' ]),
        
        logOut(){
            this.closeSesion()
        }
    }
}
</script>

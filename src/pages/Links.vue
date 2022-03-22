<style scoped lang="scss">
    .main-container{
        padding: 20px;

        .link-container{
            width: 100%;
            background-color: white;
            padding: 5px 10px;
            margin-bottom: 10px;

            a{
                text-decoration: none;
                color: black;
            }

            .link-container-info{
                display: flex;
                justify-content: flex-start;
                align-items: center;
                padding: 10px 0;

                .link-container-info-ico{
                    width: 30px;
                    height: 30px;
                    background-color: #1976D2;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-radius: 50%;

                    i{
                        width: 30px;
                        height: 30px;
                        object-fit: cover;
                        object-position: center;
                        border-radius: 50%;
                        color: white;
                        font-size: 20px;
                    }
                }
            }
        }
    }
</style>

<template>
    <q-page>
        <div class="main-container">
            <div width="100%" padding="0 10" marginBottom="20">
                <div v-for="(link, index) in links" :key="index" class="link-container" @click="openURL(link)">
                    <div class="link-container-info">
                        <div class="link-container-info-ico">
                            <q-icon name="link" />
                        </div>
                        
                        <div style="margin-left: 10px;">
                            <label style="font-weight: bold;">{{ link.name }}</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </q-page>
</template>

<script>
import { db } from 'boot/firebase'
import { mapState, mapActions } from 'vuex'
import moment from 'moment-timezone'

export default {
    name: 'links',

    data(){
        return{
            links: [],
        }
    },

    created() {
        this.getLinks()
    },

    computed: {
        ...mapState('auth', [ 'user' ])
    },

    methods: {
        async getLinks(){
            try {
                let response = await db.collection('links').get().then(query => {
                    query.forEach(doc =>  {
                        this.links.push(doc.data())
                    })
                })
            } catch (error) {
                console.log(error);
            }
        },

        openURL(link){
            window.open(link.url, '_blank');
        },

    },
}
</script>
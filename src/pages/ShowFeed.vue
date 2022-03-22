<style>

</style>

<template>
    <Page class="page" actionBarHidden="true">
        <RadSideDrawer ref="drawer">
            <!-- Inicia Navbar -->
            <SideDrawer @closeSidedrawer="$refs.drawer.nativeView.closeDrawer()" />
            <!-- Termina Navbar -->
            <GridLayout ~mainContent columns="*" rows="auto, *, 60" backgroundColor="#EEEEEE">
                <ActionbarComponent @sidedrawer="$refs.drawer.nativeView.showDrawer()" />

                <ScrollView row="1" col="0" ref="scrollView" scrollBarIndicatorVisible="false">
                    <WrapLayout orientation="horizontal" v-if="message != null">
                        <StackLayout width="100%" padding="0 10">
                            <StackLayout marginTop="10" backgroundColor="white">
                                <FlexboxLayout height="100" justifyContent="flex-start" alignItems="center" padding="5 10">
                                    <StackLayout width="70" height="70">
                                        <Image width="70" borderRadius="100" :src="message.userInfo.photo" stretch="aspectFill" />
                                    </StackLayout>
                                    
                                    <StackLayout marginLeft="10">
                                        <Label color="black" :text="message.userInfo.name" fontWeight="bold" fontSize="15" />
                                        <Label color="gray" :text="message.date | formatDate" fontWeight="bold" fontSize="12" />
                                    </StackLayout>
                                </FlexboxLayout>
                                <StackLayout padding="10">
                                    <Label v-if="message.subject" fontSize="12" :text="message.subject" textWrap="true" />
                                    <FlexboxLayout marginTop="10" width="100%" justifyContent="center" alignItems="center" v-if="message.image">
                                        <Image width="100%" :src="message.image" stretch="aspectFit" />
                                        
                                    </FlexboxLayout>

                                    <FlexboxLayout marginTop="10" width="100%" justifyContent="center" alignItems="center" v-if="message.video">
                                        <VideoPlayer
                                            :src="message.video"
                                            fill="true"
                                            muted="true"
                                            loop="false"
                                            autoplay="true"
                                            height="300"></VideoPlayer>
                                        
                                    </FlexboxLayout>

                                    <StackLayout v-if="message.files != undefined">
                                        <StackLayout v-if="message.files.length != 0">
                                            <FlexboxLayout width="50%" justifyContent="space-between" alignItems="center" padding="2 5" v-for="(file, index) in message.files" :key="index" borderRadius="5" backgroundColor="#EEEEEE" marginRight="10" marginTop="10">
                                                <Label :text="'Archivo ' + index" color="black" textWrap="true" />
                                                <Label class="font-awesome" text="" textWrap="true" />
                                                
                                            </FlexboxLayout>
                                            
                                            
                                        </StackLayout>
                                    </StackLayout>
                                </StackLayout>
                                <!-- <FlexboxLayout padding="10" justifyContent="flex-start" alignItems="center">
                                  <Label class="font-awesome" fontSize="18" marginRight="20" text="" textWrap="true" />
                                  <Label class="font-awesome" fontSize="18" text="" textWrap="true" />
                                  
                                </FlexboxLayout> -->
                            </StackLayout>
                        </StackLayout>
                    </WrapLayout>
                </ScrollView>
                <StackLayout row="2" col="0">
                    
                </StackLayout>
            </GridLayout>
        </RadSideDrawer>
	</Page>
</template>

<script>
import { firestore } from 'nativescript-plugin-firebase'
//Firebase
const firebase = require("nativescript-plugin-firebase")
//Vuex
import { mapState, store } from 'vuex'
//Moment
const moment = require('moment')

export default {
    props:[
        'id'
    ],

    data(){
        return{
            message: null,
        }
    },

    mounted() {
        this.getFeed()

        this.$store.commit('updateActionbar', 'Inicio')
    },

    computed: {
        ...mapState([
            'user'
        ])
    },

    filters: {
        formatDate(args){
            moment.locale('es')
            let date = moment(args).fromNow();
            return date
        }
    },

    methods: {
        async getFeed(){
            try {
                let response = await firebase.firestore.collection('feed')
                                                        .doc(this.id)
                                                        .get()

                let user = await firebase.firestore.collection('users').doc(response.data().user).get()

                this.message = response.data()
                this.message.userInfo = user.data()


            } catch (error) {
                console.log(error);
            }
        }
    },
}
</script>

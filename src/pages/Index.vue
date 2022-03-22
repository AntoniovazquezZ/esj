<style scoped lang="scss">
    .main-container{
        padding: 20px;

        .card{
            margin-top: 10px; 
            padding: 5px 10px;
            background-color: white;

            .card-header{
                display: flex;
                justify-content: space-between;
                align-items: center;

                .card-header-section{
                    display: flex;

                    .card-image{
                        width: 50px;
                        height: 50px;

                        img{
                            width: 50px;
                            height: 50px;
                            object-fit: cover;
                            object-position: center;
                            border-radius: 50%;
                        }
                    }

                    .card-name{
                        display: flex;
                        justify-content: center;
                        align-items: flex-start;
                        flex-direction: column;

                        & label:nth-child(1){
                            font-weight: bold;
                        }

                        & label:nth-child(2){
                            font-size: 11px;
                        }
                    }
                }
            }

            .card-info{
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: flex-start;
                width: 90%;

                .card-info-section{
                    margin-top: 10px;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    .card-info-section-ico{
                        width: 20px;
                        height: 20px;
                        background-color: #1976D2;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        border-radius: 50%;

                        i{
                            width: 20px;
                            height: 20px;
                            object-fit: cover;
                            object-position: center;
                            border-radius: 50%;
                            color: white;
                        }
                    }

                    .card-info-section-name{
                        display: flex;
                        justify-content: center;
                        align-items: flex-start;
                        flex-direction: column;
                        margin-left: 10px;

                        & label:nth-child(1){
                            font-weight: bold;
                        }

                        & label:nth-child(2){
                            font-size: 11px;
                        }
                    }
                }
            }

            .btn-msg{
                background-color: #1976D2; 
                color: white; 
                font-weight: bold; 
                height: 40px;
                width: 100%;
                border: none;
            }
        }
    }
</style>

<template>
    <q-page>
        <q-page-sticky position="bottom-right" :offset="[18, 18]">

            <q-btn fab icon="edit" color="blue" class="q-btn" to="/message-page"/> </router-link>
           
          </q-page-sticky>
        <div class="main-container">
            <div width="100%" padding="0 10" marginBottom="20">
                <div class="card" v-for="(message, index) in filteredName" :key="index" >
                    <div class="card-header">
                        <div class="card-header-section">
                            <div class="card-image" style="width: 70px; height: 70px;">
                                <img width="70" style="border-radius: 50%;" :src="user.photo" />
                            </div>
                            
                            <div class="card-name">
                                <label>{{user.name}}</label>
                                
                            </div>
                        </div>
                        
                    </div>

                    
                    </div>
                </div>
                
            </div>
        </div>
    </q-page>
</template>

<script>
import { db, storage } from 'boot/firebase'
const ref = storage.ref()
import { exportFile } from 'quasar'
import { mapState, mapActions } from 'vuex'
import XLSX from "xlsx"

var moment = require('moment');

export default {

    data(){
        return{
            
            users: [],
            filterUsers: [],
            lastItemY: 0,
            busy: false,
            i: 1,
            feed: [],

            newComment: '',

            referenceToOldestKey: '',
        }
    },

    mounted() {
        this.getUsers()
        this.getFeed()
    },

    computed: {
        ...mapState('auth', [ 'user' ]),

        filteredName(){
            if (this.filterUsers.length == 0) {
                return this.users
            }
            return this.filterUsers
        },
        filterFeed(){
            return this.feed.filter(doc => doc.users.includes(this.user.uid))
        },
        getDate(){
            moment.locale('es');
            return moment().format("LL");
        }
    },

    filters: {
        formatDate(args){
            moment.locale('es')
            let date = moment(args).fromNow();
            return date
        }
    },

    methods: {
        openModalSearch(){
            this.$showModal(ModalSearch, { props: { users: this.users } }).then(data => {
                console.log(data);
                if (data != undefined) {
                    this.filterUsers = data
                }else{
                    this.filterUsers = []
                }
            })
        },
        openURL(emailURL){
            cordova.plugins.email.open({
                to:      emailURL,
                cc:      '',
                bcc:     [],
                subject: 'Yo',
                body:    ''
            });
        },

        makeCall(number){
            if (this.$q.platform.is.mobile) {
                const phoneNumber = number
                window.plugins.CallNumber.callNumber((response) => {
                    console.log(response);
                }, (error) => {
                    console.log(error);
                }, phoneNumber.toString(), true);
            }
        },

        async getUsers(){
            try {
                let response = await db.collection('users')
                                                .get()
                                                .then(query => {
                                                    query.forEach(doc => {
                                                        let user = doc.data()
                                                        Object.defineProperty(user, 'id', {
                                                            enumerable: true,
                                                            configurable: true,
                                                            writable: true,
                                                            value: doc.id
                                                        });
                                                        if (doc.id != 'counter') {
                                                            this.users.push(user)
                                                        }
                                                        
                                                    })
                                                })
            } catch (error) {
                console.log(error);
            }
        },
        goToMessage(user){
            this.$navigator.navigate('/new-message', {
                props: { toUser: user }
            })
        }
    },
    async makeComment(message){
            try {
                let comment = {
                    user: this.user.name, 
                    comment: message.com
                }

                let response = await firebase.firestore.collection('feed').doc(message.id).update({ comments: firebase.firestore.FieldValue.arrayUnion(comment) })
                message.comments.push(comment)

                message.com = ''
            } catch (error) {
                console.log(error);
            }
        },

        async likeFeed(message){
            try {
                if (message.likes.includes(this.user.uid)) {
                    let response = await firebase.firestore.collection('feed').doc(message.id).update({ likes: firebase.firestore.FieldValue.arrayRemove(this.user.uid) })
                    let index = message.likes.findIndex(doc => doc == this.user.uid)
                    message.likes.splice(index, 1)
                }else{
                    let response = await firebase.firestore.collection('feed').doc(message.id).update({ likes: firebase.firestore.FieldValue.arrayUnion(this.user.uid) })
                    message.likes.push(this.user.uid)
                }
                

            } catch (error) {
                console.log(error);
            }
        },

        deleteFeed(message, index){
            // this.$store.commit('selectPost', thread)
            console.log(message);
            if (this.user.uid == message.user) {
                this.$showModal(OptionsPublicationModalVue, {
                    props: { id: message.id },
                }).then(data => {
                    if(data == 'delete'){
                        this.feed.splice(index, 1)
                    }
                    
                })    
            }else{
                console.log('No es tuyo weee');
            }
        },

        onLayoutChanged(event) {
            const containerLyt = event.object,
                length = containerLyt.getChildrenCount(),
                lastItem = containerLyt.getChildAt(length - 1);
            console.log("containerLyt..............:", containerLyt)
            console.log("containerLyt.getChildrenCount()..............:", containerLyt.getChildrenCount())
            this.lastItemY = lastItem.getLocationRelativeTo(containerLyt).y;
        },

        onScroll(event) {
            const scrollView = event.object,
                verticalOffset = scrollView.getActualSize().height + scrollView.verticalOffset;
            //console.log(verticalOffset, this.lastItemY);
            if (verticalOffset >= this.lastItemY) {
                console.log("scrolling");
                if (!this.busy && this.i <= 100) {
                    this.addMoreItemsFromSource();
                } else {
                    console.log('Ya es el final');
                }
            }
        },

        async refreshFeed(args) {
            var pullRefresh = args.object
            try {
                this.feed = []
                await this.getFeed()
                pullRefresh.refreshing = false
            } catch (error) {
                console.log(true)
            }
        },

        async addMoreItemsFromSource() {
            this.busy = true
           try {
                if (this.referenceToOldestKey == undefined) {
                    return
                }
                let response = await firebase.firestore.collection('feed')
                                                        // .where('users', 'array-contains', this.user.uid)
                                                        .orderBy('date', 'desc')
                                                        .limit(10)
                                                        .startAfter(this.referenceToOldestKey)
                                                        .get()
                                                        .then(query => {
                                                            this.referenceToOldestKey = query.docs[query.docs.length - 1];

                                                            query.forEach(async doc => {
                                                                let feed = doc.data()

                                                                let response = await firebase.firestore.collection('users').doc(feed.user).get()

                                                                Object.defineProperty(feed, 'id', {
                                                                    enumerable: true,
                                                                    configurable: true,
                                                                    writable: true,
                                                                    value: doc.id
                                                                });

                                                                Object.defineProperty(feed, 'userInfo', {
                                                                    enumerable: true,
                                                                    configurable: true,
                                                                    writable: true,
                                                                    value: response.data()
                                                                });

                                                                
                                                                this.feed.push(feed)
                                                            })

                                                            
                                                        })
           } catch (error) {
               console.log(error);
           }
           finally{
                this.busy = false
            }
        },

        async getFeed(){
            this.busy = true
            try {
                console.log('Entra al feed');
                let response = await firebase.firestore.collection('feed')
                                                        // .where('users', 'array-contains', this.user.uid)
                                                        .orderBy('date', 'desc')
                                                        .limit(10)
                                                        .get()
                                                        .then(query => {
                                                            this.referenceToOldestKey = query.docs[query.docs.length - 1];

                                                            query.forEach(async doc => {
                                                                let feed = doc.data()

                                                                let response = await firebase.firestore.collection('users').doc(feed.user).get()

                                                                Object.defineProperty(feed, 'id', {
                                                                    enumerable: true,
                                                                    configurable: true,
                                                                    writable: true,
                                                                    value: doc.id
                                                                });

                                                                Object.defineProperty(feed, 'userInfo', {
                                                                    enumerable: true,
                                                                    configurable: true,
                                                                    writable: true,
                                                                    value: response.data()
                                                                });

                                                                
                                                                this.feed.push(feed)
                                                            })
                                                        })
            } catch (error) {
                console.log(error);
            }
            finally{
                this.busy = false
           }
    }
}

</script>






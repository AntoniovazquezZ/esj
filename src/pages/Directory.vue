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
        <div class="main-container">
            <div width="100%" padding="0 10" marginBottom="20">
                <div class="card" v-for="(user, index) in filteredName" :key="index" @click="type = index">
                    <div class="card-header">
                        <div class="card-header-section">
                            <div class="card-image" style="width: 70px; height: 70px;">
                                <img width="70" style="border-radius: 50%;" :src="user.photo" />
                            </div>
                            
                            <div class="card-name">
                                <label>{{ user.name }}</label>
                                <label>{{ user.job }}</label>
                            </div>
                        </div>
                        
                    </div>

                    <div class="card-info" v-if="type == index">
                        <div class="card-info-section">
                            <div class="card-info-section-ico">
                                <q-icon name="phone" />
                            </div>
                            
                            <a :href="'tel:+52' + user.telephone">
                                <div class="card-info-section-name">
                                    <label>Telefono:</label>
                                    <label>{{ user.telephone }}</label>
                                </div>
                            </a>
                        </div>
                        <div class="card-info-section">
                            <div class="card-info-section-ico">
                                <q-icon name="email" />
                            </div>
                            
                            <a :href="'mailto:' + user.email">
                                <div class="card-info-section-name">
                                    <label>Email:</label>
                                    <label>{{ user.email }}</label>
                                </div>
                            </a>
                        </div>
                        <div class="card-info-section">
                            <div class="card-info-section-ico">
                                <q-icon name="location_on" />
                            </div>
                            
                            <div class="card-info-section-name">
                                <label>Ciudad:</label>
                                <label>Chihuahua</label>
                            </div>
                        </div>
                        <div class="card-info-section">
                            <div class="card-info-section-ico">
                                <q-icon name="apartment" />
                            </div>
                            
                            <div class="card-info-section-name">
                                <label>Departamento:</label>
                                <label>{{ user.work_area }}</label>
                            </div>
                        </div>

                        <div style="width: 100%; margin-top: 20px;">
                            <button @click="goToMessage(user)" class="btn-msg">Mensaje</button>                            
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
    name: 'Directory',

    data(){
        return{
            type: 0,
            users: [],
            filterUsers: [],
        }
    },

    mounted() {
        this.getUsers()
    },

    computed: {
        ...mapState('auth', [ 'user' ]),

        filteredName(){
            if (this.filterUsers.length == 0) {
                return this.users
            }
            return this.filterUsers
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
}
</script>
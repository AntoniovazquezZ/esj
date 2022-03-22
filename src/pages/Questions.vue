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
        <div class="main-container" style="background-color: #EEEEEE;">
            <div width="100%" padding="0 10" marginBottom="20">
                <div class="card" v-for="(question, index) in questions" :key="index" @click="type = index">
                    <div class="card-header">
                        <div class="card-header-section">
                            <div class="card-name">
                                <label>{{ question.question }}</label>
                            </div>
                        </div>
                        
                    </div>

                    <div class="card-info" v-if="type == index">
                        <p>{{ question.answer }}</p>
                    </div>
                </div>
                
            </div>
        </div>
    </q-page>
</template>

<script>
//Firebase
import { firebase, db, firestore, storage } from 'boot/firebase'
const ref = storage.ref()

import { mapState, mapActions } from 'vuex'
var moment = require('moment');

export default {
    name: 'questions',

    data(){
        return{
            type: 0,
            questions: [],
        }
    },

    created() {
        this.getQuestions()
    },

    filters: {
        formatDay(time){
            let date = time.toDate()

            moment.locale('es');
            return moment(date).format('LLL');
        }
    },

    computed: {
        ...mapState('auth', [ 'user' ])
    },

    methods: {
        async getQuestions(){
            try {
                let response = await db.collection('questions')
                                                .get()
                                                .then(query => {
                                                    query.forEach(doc => {
                                                        let question = doc.data()
                                                        Object.defineProperty(question, 'id', {
                                                            enumerable: true,
                                                            configurable: true,
                                                            writable: true,
                                                            value: doc.id
                                                        });
                                                        this.questions.push(question)
                                                    })
                                                })
            } catch (error) {
                console.log(error);
            }
        },

    },
}
</script>
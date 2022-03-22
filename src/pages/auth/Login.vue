<style scoped>
    .card{
        width: 300px;
    }

    .card .content{
        padding: 20px 40px;
    }

    .card .side{
        width: 200px;
        background-color: #F5F6F8;
    }

    .card .side img{
        width: 200px;
        object-fit: cover;
        object-position: center;
    }

    .card p{
        line-height: 12px;
    }

    .card p:nth-child(1){
        font-weight: bold;
        font-size: 22px;
    }

    .card p:nth-child(2){
        color: #676879;
        font-size: 16px;
    }

    .card input[type=text], input[type=password], input[type=email]{
        width: 100%;
        background-color: transparent;
        padding: 5px;
        border: 1px solid #E2E3E7;
        border-radius: 5px;
    }

    .card button{
        width: 100%;
        background-color: #0085ff;
        color: white;
        margin-top: 10px;
        padding: 10px 10px;
        border: none;
        cursor: pointer;
    }

    .card button:focus{
        outline: none;
    }

    .img-container{
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>

<template>
        <q-page
        class="window-height window-width row justify-center items-center"
    >
        <div class="column q-pa-lg">
            <div class="row">
                <div class="col-12">
                    <div class="card" v-if="step == 1">
                        <div style="display:flex; flex-direction: column;">
                            <div class="col-7 img-container">
                                <img width="150px" src="~assets/logo.svg" alt="">
                            </div>
                            <div class="col-5 text-center flex" style="display: flex; flex-direction: column; justify-content: center;">
                                <input v-model="user.email" type="email" placeholder="Correo">
                                <input class="q-mt-md" v-model="user.password" type="password" placeholder="Contraseña">

                                <button @click="onSubmit">Iniciar sesion</button>
                                
                                <router-link class="q-mt-md" to="/register">¿Olvidaste tu contraseña?</router-link>
                            </div>
                        </div>
                    </div>

                    <div class="card" v-if="step == 2">
                        <div class="row">
                            <div class="col-12" style="text-align: center;">
                                <q-spinner-ball
                                    color="primary"
                                    size="4em"
                                    />
                                <q-tooltip :offset="[0, 8]">Wait a moment!</q-tooltip>
                            </div>
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
import { required, minLength, email } from 'vuelidate/lib/validators'

export default {
    name: 'Login',

    data(){
        return{
            isPwd: true,

            step: 1,

            user: {
                email: '',
                password: ''
            }
        }
    },

     validations: {
        user: {
            email: {
                email,
                required,
            },
            password: {
                required,
            },
        },
    },

    methods: {
        ...mapActions('auth', [ 'loginUser', 'closeSesion' ]),

        async onSubmit(){
            try {
                if (!this.$v.user.email.required || !this.$v.user.password.required) {
                    this.$q.notify({
                        message: 'The info is required',
                        color: 'negative'
                    })

                    return
                }
                
                this.loginUser(this.user).then((response) => {
                        console.log('binnieeeee: ', response);
                    }).catch(error => {
                        console.log(error);

                        this.$q.notify({
                            message: error.message,
                            color: 'negative'
                        })
                    })
                
            } catch (error) {
                console.log(error);
            }
        }
    },
}
</script>
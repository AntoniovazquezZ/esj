<style scoped>
    .card{
        width: 700px;
        border-radius: 20px;
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
                    <div class="card shadow-3">
                        <div class="row q-pa-md">
                            <div class="col-7 img-container">
                                <img width="150px" src="~assets/logo.svg" alt="">
                            </div>
                            <div class="col-5 text-center" style="display: flex; flex-direction: column; justify-content: center;">
                                <input class="q-mt-md" v-model="user.email" type="email" placeholder="nombre@empresa.com">

                                <button @click="onSubmit">Enviar</button>
                                
                                <router-link class="q-mt-md" to="/">Regresar al inicio</router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </q-page>
</template>

<script>
import { db, auth } from 'boot/firebase'

import { mapState, mapActions } from 'vuex'
import { required, minLength, email } from 'vuelidate/lib/validators'

export default {
    name: 'Login',

    data(){
        return{
            isPwd: true,

            user: {
                name: '',
                email: '',
                password: '',
                active: true,
                role: 'user'
            }
        }
    },

    validations: {
        user: {
            name: {
                required,
            },
            email: {
                email,
                required,
            },
            password: {
                required,
            }
        },
    },

    computed: {
        
    },

    methods: {
        ...mapActions('auth', [ 'registerUser' ]),

        async onSubmit(){
            try {
                if (!this.$v.user.email.required || !this.$v.user.email.email) {
                    this.$q.notify({
                        message: 'Ingresa un correo',
                        color: 'negative'
                    })

                    return
                }

                await auth.sendPasswordResetEmail(this.user.email);

                this.$q.notify({
                    message: 'Se ha enviado un email para la recuperacion de su contraseña',
                    color: 'positive'
                })

            } catch (error) {
                console.log(error);
            }
        }
    },
}
</script>
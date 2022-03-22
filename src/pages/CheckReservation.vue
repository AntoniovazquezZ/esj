<style lang="scss" scoped>
    .imageCover {
        /* background-image: url("https://www.eluniversal.com.mx/sites/default/files/2016/02/19/briela.jpg"); */
        background-size: 100px auto;
        background-repeat: no-repeat;
        /* background-attachment: fixed; */ /* not supported in {N} yet */
        background-position: center; /* instead set ypos to top to avoid scroll-up */
    }
    .layer{
        background-color: rgba(0, 0, 0, 0.5);
    }

    .image-container{
        width: 100%;
        height: 300px;
        background-color: orangered;
        position: relative;

        .image-fit{
            width: 100%;
            height: 300px;
            object-fit: cover;
            object-position: center;
            position: absolute;
            top: 0;
            left: 0;
        }

        .layer{
            width: 100%;
            height: 300px;
            position: absolute;
            top: 0;
            left: 0;
            background-color: rgba(0, 0, 0, 0.5);
            color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
        }
    }

    .date-container{
        margin-left: 5%;
        width: 90%;
        height: 100px;
        background-color: white;
        margin-top: 270px;
        position: absolute;
        top: 0;
        left: 0;
        border-radius: 20px;
        padding: 10px;
    }

    .info-container{
        margin-top: 100px;
    }

    .link-container{
        width: 100%;
        padding: 0 20px;
        margin-bottom: 10px;

        a{
            text-decoration: none;
            color: black;
        }

        .link-container-info{
            display: flex;
            justify-content: flex-end;
            align-items: center;
            padding: 10px 0;

            .link-container-info-ico{
                width: 40px;
                height: 40px;
                background-color: #1976D2;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 50%;

                i{
                    width: 40px;
                    height: 40px;
                    object-fit: cover;
                    object-position: center;
                    border-radius: 50%;
                    color: white;
                    font-size: 20px;
                }
            }
        }
    }

    .btn-container{
        margin-top: 20px;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .btn-reservation{
            width: 80%;
            padding: 5px 10px;
            background-color: #1BB399;
            color: white;
            border: none;
            text-align: center;
            text-decoration: none;
        }
    }

    .modal-options{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;

        span{
            border: 1px solid lightgray;
            border-radius: 15px;
            margin: 5px;
            padding: 2px 10px,
        }
    }
    .isActive{
        background-color: #1976D2;
        color: white;
    }
</style>

<template>
    <q-page>
        <div class="main-container">
            <div width="100%">
                <div class="image-container">
                    <img class="image-fit" :src="reservation.spaceInfo.image" alt="">
                    <div class="layer">
                        <p style="font-size: 18px; font-weight: bold;">{{ reservation.subjec }}</p>
                        <p style="font-size: 18px;">{{ reservation.spaceInfo.name }}</p>
                    </div>
                </div>
                <div class="date-container">
                    <div class="row">
                        <div class="col-6 text-center" style="line-height: 13px;">
                            <p>Inicio</p>
                            <p>{{ reservation.date }}</p>
                            <p>{{ reservation.hour | filterHour }}</p>
                        </div>
                        <div class="col-6 text-center" style="line-height: 13px;">
                            <p>Fin</p>
                            <p>{{ reservation.date }}</p>
                            <p>{{ reservation | filterHourPlus }}</p>
                        </div>
                    </div>
                </div>
                <div class="info-container">
                    <p>{{ reservation.spaceInfo.descriptio }}</p>
                    <div style="line-height: 13px; margin-top: 70px;">
                        <div class="row">
                            <div class="col-8">
                                <p style="font-weight: bold;">Estacionamiento</p>

                                <p>{{ reservation.parkings.length + ' lugares' }}</p>
                            </div>
                            <div class="col-4">
                                <div class="link-container">
                                    <a target="_blank" href="https://firebasestorage.googleapis.com/v0/b/app-esj.appspot.com/o/files%2Festacionamientos_new.png?alt=media&token=ba66415c-5bde-4d95-b938-b4d86506283b">
                                        <div class="link-container-info">
                                            <div class="link-container-info-ico">
                                                <q-icon name="map" />
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- <div class="btn-container">
                <div>
                    <q-rating
                      v-model="rate"
                      size="1.5em"
                      icon="star"
                    />
                </div>
            </div> -->
            <div class="btn-container" v-if="status == 'En Espera'">
                <button class="btn-reservation" style="background-color: #1BB399;" @click="confirmReservation">Check-in</button>
                <button class="btn-reservation" style="background-color: #666666; margin-top: 10px;" @click="deleteReservation">Cancelar</button>
            </div>
            <div v-else class="btn-container">
                <div v-if="!alreadyCommented">
                    <q-rating
                      v-model="rate"
                      size="1.5em"
                      icon="star"
                    />
                </div>
                <div v-else>
                    <q-rating
                      v-model="rate"
                      readonly
                      size="1.5em"
                      icon="star"
                    />
                </div>
            </div>
        </div>

        <q-dialog v-model="showModalRate">
            <q-card>
                <q-card-section>
                    <div class="text-h6">Comentarios</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <div class="modal-options">
                        <span v-for="(option, index) in options" :key="index" @click="selection = option, openTxtField = 0" :class="[ selection == option ? 'isActive' : '']">{{ option }}</span>
                        <span :class="[ openTxtField == 1 ? 'isActive' : '']" @click="openTxtField = 1, selection = ''">Otro</span>
                    </div>

                    <div v-if="openTxtField == 1">
                        <q-input v-model="selection" type="text" label="Comentarios" />
                    </div>
                </q-card-section>

                <q-card-actions align="right">
                <q-btn flat label="Enviar comentarios" color="primary" @click="makeComment" />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </q-page>
</template>

<script>
import { db } from 'boot/firebase'
import { mapState, mapActions } from 'vuex'
import moment from 'moment-timezone'

export default {
    name: 'CheckReservation',

    props: [
        'reservation',
    ],

    data(){
        return{
            status: '',
            rate: this.reservation.rate,
            alreadyCommented: false,
            //Modals
            showModalRate: false,
            openTxtField: 0,
            selection: '',
            options: [
                'Todo bien',
                'Sala sucia',
                'Pantalla no sirve',
                'Mobiliario dañado',
            ]
        }
    },

    mounted() {
        this.status = this.reservation.status
        this.alreadyCommented = this.reservation.alreadyCommented
        this.rate = this.reservation.rate
    },

    watch: {
        rate(){
            this.showModalRate = true
            // this.$showModal(ModalRate, {
            //     props: { id: this.reservation.space, rate: this.rate, idReservation: this.reservation.id }
            // }).then(data => {
            //     console.log(data);
            //     if (data == true) {
            //         this.alreadyCommented = true
            //     }
                
            // })
        }
    },

    computed: {
        ...mapState('auth', [ 'user' ]),

    },

    filters: {
        formatDate(args){
            moment.locale('es')
            let date = ''
            date = moment(args).format("MMM Do YY");
            
            return date
        },
        filterHourPlus(args){
            moment.locale('es')
            let hour = '1995-08-23 ' + args.hour
            let date = moment(hour).add(args.duration, 'hours').format('h:mm a');
            return date
        },
        filterHour(args){
            moment.locale('es')
            let hour = '1995-08-23 ' + args
            let date = moment(hour).format('h:mm a');
            return date
        },
    },

    methods: {
        async getReservation(){
            try {
                let response = await db.collection('reservations').doc(this.id).get()
                if (response.exists) {
                    this.reservation = response.data()
                }
            } catch (error) {
                console.log(error);
            }
        },

        async confirmReservation(){
            try {
                this.$q.dialog({
                    title: 'Confirmar reservacion',
                    message: '¿Quieres confirmar esta reservacion?',
                    cancel: true,
                    persistent: true
                }).onOk(async () => {
                    await db.collection('reservations').doc(this.reservation.id).update({ status: 'Confirmado' })
                    this.status = 'Confirmado'
                    this.alreadyCommented = false
                })

            } catch (error) {
                console.log(error);
            }
        },

        async deleteReservation(){
            try {
                this.$q.dialog({
                    title: 'Cancelar reservacion',
                    message: '¿Quieres cancelar esta reservacion?',
                    cancel: true,
                    persistent: true
                }).onOk(async () => {
                    await db.collection('reservations').doc(this.reservation.id).delete()
                    this.$router.push('/reservations')
                })

            } catch (error) {
                console.log(error);
            }
        },

        async makeComment(){
            try {
                if (this.selection == '') {
                    this.$q.notify({
                        message: 'Selecciona una opcion',
                        color: 'negative'
                    })
                    return
                }
                let comment = {
                    comment: this.selection, 
                    rate: this.rate, 
                    space: this.reservation.space,
                    time: new Date(),
                    user: this.user.name
                }
                await db.collection('comments').add(comment)
                await db.collection('reservations').doc(this.reservation.id).update({ alreadyCommented: true, rate: this.rate })
                this.$q.notify({
                        message: 'Comentario enviado',
                        color: 'success'
                    })
                
                this.alreadyCommented = true
                this.showModalRate = false
            } catch (error) {
                console.log(error);
            }
            
        }
    },
}
</script>
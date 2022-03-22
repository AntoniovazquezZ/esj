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
</style>

<template>
    <q-page>
        <div class="main-container">
            <div width="100%">
                <div class="image-container">
                    <img class="image-fit" :src="space.image" alt="">
                    <div class="layer">
                        <p style="font-size: 18px; font-weight: bold;">Asunto</p>
                        <p style="font-size: 18px;">Espacio 2</p>
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
                    <p>{{ 'Capacidad: ' + space.capacity }}</p>
                    <div style="line-height: 13px; margin-top: 70px;">
                        <div class="row">
                            <div class="col-8">
                                <p style="font-weight: bold;">Estacionamiento</p>

                                <p>{{ parkings.length + ' lugares' }}</p>
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

            <div class="btn-container">
                <button class="btn-reservation" @click="makeReservation">AGENDAR</button>
            </div>
        </div>
    </q-page>
</template>

<script>
import { db } from 'boot/firebase'
import { mapState, mapActions } from 'vuex'
import moment from 'moment-timezone'

export default {
    name: 'ConfirmReservation',

    props: [
        'reservation',
        'space',
    ],

    data(){
        return{
            parkings: [],
        }
    },

    created() {
        
    },

    validations: {
        
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
        openSpaces(){
            this.showModalSpaces = true
        },

        selectSpace(data){
            console.log(data);
            if (data == undefined) {
                return
            }
            let found = this.parkings.find(doc => doc.id == data.id)
            if (found) {
                let index = this.parkings.findIndex(doc => doc.id == data.id)
                this.parkings.splice(index, 1)
            }else{
                this.parkings.push(data)
            }
        },

        async makeReservation(){
            try {
                let reservation = this.reservation
                reservation.parkings = this.parkings.map(doc => doc.id)
                let response = await db.collection('reservations')
                                                        .add(reservation)
                this.$router.push('/reservations')
            } catch (error) {
                console.log(error);
            }
        },
    },
}
</script>
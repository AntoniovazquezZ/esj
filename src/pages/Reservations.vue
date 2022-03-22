<style scoped lang="scss">
    .reservation{
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: white;
        margin-bottom: 10px;
        padding: 5px;

        .reservation-section-one{
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
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
            background-color: #FFCC00;
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
                <div class="reservation" @click="goToReservation(reservation)" v-for="(reservation, index) in sortReservations" :key="index">
                    <div class="reservation-section-one">
                        <!-- <label style="font-size: 14px; color: black;">{{ reservation | filterMonth }}</label>
                        <label style="font-size: 25px; color: black;">{{ reservation | filterMonthDay}}</label> -->
                        <label style="font-size: 14px; color: black;">{{ reservation.date }}</label>
                        <label style="font-size: 20px; color: black;">{{ reservation.date }}</label>
                        
                    </div>

                    <div class="reservation-section-one">
                        <label style="font-size: 14px; color: black;">{{ reservation.subject }}</label>
                        <label style="font-size: 14px; color: gray;">{{ reservation.spaceInfo.name }}</label>
                        
                    </div>

                    <div class="reservation-section-one">
                        <label style="font-size: 14px; color: black;">{{ reservation.hour | filterHour }}</label>
                        <label style="font-size: 14px; color: black;">{{ reservation | filterHourPlus }}</label>
                        
                    </div>
                </div>
            </div>
            <div class="btn-container">
                <!-- <Button width="80%" height="100%" padding="10" backgroundColor="#FFCC00" color="white" text="Reservar" @tap="makeReservation" /> -->
                <!-- <button class="btn-reservation" @click="makeReservation">Reservar</button> -->
                <router-link class="btn-reservation" to="/make-reservation">Reservar</router-link>
            </div>
        </div>
    </q-page>
</template>

<script>
import { db } from 'boot/firebase'
import { mapState, mapActions } from 'vuex'
import moment from 'moment-timezone'

export default {
    name: 'Reservations',

    data(){
        return{
            reservations: [],
        }
    },

    created() {
        this.getReservations()
    },

    computed: {
        ...mapState('auth', [ 'user' ]),

        sortReservations(){
            return this.reservations.sort((a,b) => (a.date < b.date) ? 1 : ((b.date < a.date) ? -1 : 0))
        }
    },

    filters: {
        formatDate(args){
            moment.locale('es')
            let date = moment(args, "DD-MM-YYYY").fromNow();
            return date
        },
        filterMonth(args){
            moment.locale('es')
            let date = ''
            if (args.app) {
                date = moment(args.date, "Do/MM/YYYY").format('MMMM');
            }else{
                date = moment(args.date).format('MMMM');
            }
            
            return date
        },
        filterMonthDay(args){
            moment.locale('en')
            let date = ''
            if (args.app) {
                date = moment(args.date, "Do MM YYYY").format('Do');
            }else{
                date = moment(args.date).format('D');
            }
            
            return date
        },
        filterHour(args){
            moment.locale('es')
            let hour = '1995-08-23 ' + args
            let date = moment(hour).format('h:mm a');
            return date
        },
        filterHourPlus(args){
            moment.locale('es')
            let hour = '1995-08-23 ' + args.hour
            let date = moment(hour).add(args.duration, 'hours').format('h:mm a');
            return date
        }
    },

    methods: {
        goToReservation(args){
            this.$router.push({ name: 'check', params: { reservation: args } })
        },

        async getReservations(){
            this.reservations = []
            try {
                let response = await db.collection('reservations')
                                                        .where('user', '==', this.user.uid)
                                                        .where('alreadyCommented', '==', false)
                                                        .get()
                                                        .then(query => {
                                                            
                                                            query.forEach(async doc => {
                                                                let reservation = doc.data()
                                                                let space = await db.collection('spaces').doc(reservation.space).get()
                                                                if (space.exists) {
                                                                    Object.defineProperty(reservation, 'spaceInfo', {
                                                                        enumerable: true,
                                                                        configurable: true,
                                                                        writable: true,
                                                                        value: space.data()
                                                                    });
                                                                }
                                                                Object.defineProperty(reservation, 'id', {
                                                                    enumerable: true,
                                                                    configurable: true,
                                                                    writable: true,
                                                                    value: doc.id
                                                                });
                                                                this.reservations.push(reservation)
                                                            })
                                                        })
            } catch (error) {
                console.log(error);
            }
        }

    },
}
</script>
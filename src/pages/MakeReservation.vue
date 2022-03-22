<style scoped lang="scss">
    .main-container{
        padding: 20px;
    }

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

    .q-date, .q-time{
        box-shadow: none !important;
    }
</style>

<template>
    <q-page>
        <div class="main-container">
            <div width="100%">
                <div class="link-container" @click="type = 1">
                    <div class="link-container-info">
                        <div class="link-container-info-ico">
                            <q-icon name="map" />
                        </div>
                        
                        <div style="margin-left: 10px;">
                            <label>Puesto de trabajo</label>
                        </div>
                    </div>

                    <div v-if="type == 1">
                        <div>
                            <div class="row q-pa-md">
                                <div class="col-6">
                                    <span>Fecha</span>
                                </div>
                                <div class="col-6" @click="openCalendar">
                                    <span>{{ newReservation.date | formatDate }}</span>
                                </div>
                            </div>
                            <div class="row q-pa-md">
                                <div class="col-6">
                                    <span>Hora</span>
                                </div>
                                <div class="col-6">
                                    <span v-if="!disabled" @click="openHour">{{ newReservation.hour | filterHour }}</span>
                                    <span v-else>Todo el turno</span>
                                </div>
                            </div>
                            <div class="row q-pa-md">
                                <div class="col-6">
                                    <span>Sala</span>
                                </div>
                                <div class="col-6" @click="openSpaces">
                                    <span v-if="space.name">{{ space.name }}</span>
                                    <span v-else>seleccionar</span>
                                </div>
                            </div>
                            <div class="row q-pa-md">
                                <div class="col-6">
                                    <span>Duracion</span>
                                </div>
                                <div class="col-6" @click="openTime">
                                    <span v-if="!disabled">{{ newReservation.duration }} Hora</span>
                                    <span v-else>Todo el turno</span>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>

                <div class="link-container" @click="type = 2">
                    <div class="link-container-info">
                        <div class="link-container-info-ico">
                            <q-icon name="map" />
                        </div>
                        
                        <div style="margin-left: 10px;">
                            <label>Sala de reunion</label>
                        </div>
                    </div>

                    <div v-if="type == 2">
                        <div>
                            <div class="row q-pa-md">
                                <div class="col-6">
                                    <span>Fecha</span>
                                </div>
                                <div class="col-6" @click="openCalendar">
                                    <span>{{ newReservation.date | formatDate }}</span>
                                </div>
                            </div>
                            <div class="row q-pa-md">
                                <div class="col-6">
                                    <span>Hora</span>
                                </div>
                                <div class="col-6">
                                    <span v-if="!disabled" @click="openHour">{{ newReservation.hour | filterHour }}</span>
                                    <span v-else>Todo el turno</span>
                                </div>
                            </div>
                            <div class="row q-pa-md">
                                <div class="col-6">
                                    <span>Sala</span>
                                </div>
                                <div class="col-6" @click="openSpaces">
                                    <span v-if="space.name">{{ space.name }}</span>
                                    <span v-else>seleccionar</span>
                                </div>
                            </div>
                            <div class="row q-pa-md">
                                <div class="col-6">
                                    <span>Duracion</span>
                                </div>
                                <div class="col-6" @click="openTime">
                                    <span v-if="!disabled">{{ newReservation.duration }} Hora</span>
                                    <span v-else>Todo el turno</span>
                                </div>
                            </div>
                            <div class="row q-pa-md">
                                <div class="col-6">
                                    <span>Asunto</span>
                                </div>
                                <div class="col-6" @click="openSubject">
                                    <span>{{ newReservation.subject }}</span>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>

                <p>Mapa</p>
                            

                <div class="link-container">
                    <a target="_blank" href="https://firebasestorage.googleapis.com/v0/b/app-esj.appspot.com/o/spaces%2Fa6ef7fa0-4872-4847-9adc-3b544eae5f5e.jpg?alt=media&token=c2feba2c-e274-4f45-954e-32ae9126eb84">
                        <div class="link-container-info">
                            <div class="link-container-info-ico">
                                <q-icon name="map" />
                            </div>
                            
                            <div style="margin-left: 10px;">
                                <label>Ver mapa de salas</label>
                            </div>
                        </div>
                    </a>
                </div>

                <div class="btn-container">
                    <button class="btn-reservation" @click="addReservation">Continuar</button>
                </div>
            </div>
        </div>

        <q-dialog v-model="showModalCalendar">
            <q-card>
                <q-card-section>
                <div class="text-h6">Seleccionar Fecha</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <q-date
                        v-model="newReservation.date"
                        
                        minimal
                    />
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn flat label="OK" color="primary" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>

        <q-dialog v-model="showModalHour">
            <q-card>
                <q-card-section>
                <div class="text-h6">Seleccionar Hora</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <q-time
                        v-model="newReservation.hour"
                    />
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn flat label="OK" color="primary" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>

        <q-dialog v-model="showModalSpaces">
            <q-card style="width: 90%;">
                <q-card-section>
                <div class="text-h6">Seleccionar Espacio</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <div class="link-container">
                        <div class="link-container-info" v-for="(space, index) in filerSpaces" :key="index" @click="selectSpace(space)">
                            <div class="link-container-info-ico">
                                <q-icon name="map" />
                            </div>
                            
                            <div style="margin-left: 10px;">
                                <label>{{ space.name }}</label>
                            </div>
                        </div>
                    </div>
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn flat label="OK" color="primary" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>

        <q-dialog v-model="showModalTime">
            <q-card style="width: 90%;">
                <q-card-section>
                <div class="text-h6">Seleccionar Tiempo</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <div class="link-container">
                        <div class="link-container-info" v-for="(hour, index) in hours" :key="index" @click="selectHour(hour)">
                            <div class="link-container-info-ico">
                                <q-icon name="map" />
                            </div>
                            
                            <div style="margin-left: 10px;">
                                <label>{{ hour }} horas</label>
                            </div>
                        </div>
                        <div class="link-container-info" @click="selectHour('all')">
                            <div class="link-container-info-ico">
                                <q-icon name="map" />
                            </div>
                            
                            <div style="margin-left: 10px;">
                                <label>Todo el turno</label>
                            </div>
                        </div>
                    </div>
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn flat label="OK" color="primary" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>
        
        <q-dialog v-model="showModalSubject">
            <q-card style="width: 90%;">
                <q-card-section>
                <div class="text-h6">Escribir asunto</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <q-input v-model="newReservation.subject" type="text" label="Asunto" />
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn flat label="OK" color="primary" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </q-page>
</template>

<script>
import { db } from 'boot/firebase'
import { mapState, mapActions } from 'vuex'
import moment from 'moment-timezone'
//Vuelidate
import { required } from 'vuelidate/lib/validators'

export default {
    name: 'Reservations',

    data(){
        return{
            type: 0,
            newReservation: {
                date: new Date(),
                hour: '08:00 AM',
                duration: 1,
                subject: 'Asunto',
                type: '',
                space: '',
                status: 'En Espera',
                alreadyCommented: false,
                rate: 0,
            },
            space: '',
            spaces: [],
            filerSpaces: [],
            groups: [],
            disabled: false,
            image: '',

            //Modals
            showModalCalendar: false,
            showModalHour: false,
            showModalSpaces: false,
            showModalTime: false,
            showModalSubject: false,

            hours: [1, 2, 3, 4, 5, 6]
        }
    },

    created() {
        this.getGrous()
        this.getImage()
    },

    computed: {
        ...mapState('auth', [ 'user' ]),

        
    },

    validations: {
        newReservation: {
            date: {
                required,
            },
            hour: {
                required,
            },
            duration: {
                required,
            },
            subject: {
                required,
            },
            type: {
                required,
            },
            space: {
                required,
            },
            status: {
                required,
            },
        }
    },

    watch: {
        type(){
            this.newReservation.space = ''
            this.space = ''
        }
    },

    filters: {
        formatDate(args){
            moment.locale('es')
            let date = ''
            date = moment(args).format("LL");
            
            return date
        },

        filterHour(args){
            // moment.locale('es')
            let hour = '1995-08-23 ' + args
            let date = moment(hour).format('h:mm a');
            return date
        },
    },

    methods: {
        openCalendar(){
            this.showModalCalendar = true
        },

        openHour(){
            this.showModalHour = true
        },

        openSpaces(){
            this.filerSpaces = this.spaces.filter(space => space.type == this.type)
            this.showModalSpaces = true
        },

        openTime(){
            this.showModalTime = true
        },

        openSubject(){
            this.showModalSubject = true
        },

        selectSpace(space){
            this.space = space
            this.newReservation.space = space.id

            this.showModalSpaces = false
        },

        selectHour(data){
            if (this.type == 2 && data > 3) {
                alert('El tiempo maximo permitido es de 3 horas.')
                return
            }
            if (data == 'all') {
                this.newReservation.duration = 12.5
                this.disabled = true
                this.newReservation.hour = '7:30 AM'
            }else{
                this.newReservation.duration = data
                this.disabled = false
            }

            this.showModalTime = false
        },

        async getImage(){
            try {
                let response = await db.collection('images').doc('HOIsQvxp8fwP8TnG6IGV').get()
                if (response.exists) {
                    this.image = response.data().url
                }else{
                    this.image = 'https://firebasestorage.googleapis.com/v0/b/app-esj.appspot.com/o/spaces%2Fa6ef7fa0-4872-4847-9adc-3b544eae5f5e.jpg?alt=media&token=c2feba2c-e274-4f45-954e-32ae9126eb84'
                }
            } catch (error) {
                console.log(error);
            }
        },

        async getGrous(){
            try {
                let response = await db.collection('groups')
                                        .where('members', 'array-contains', this.user.uid)
                                        .get()
                                        .then(query => {
                                            this.groups = []
                                            let group
                                            query.forEach(doc => {
                                                group = doc.data()
                                                Object.defineProperty(group, 'id', {
                                                    enumerable: true,
                                                    configurable: true,
                                                    writable: true,
                                                    value: doc.id
                                                });
                                                this.groups.push(group.id)
                                            })
                                        })
                console.log('Estos son los grupos: ', this.groups);
                this.getSpaces()
            } catch (error) {
                console.log(error);
            }  
        },

        async getSpaces(){
            try {
                let response = await db.collection('spaces')
                                        .where('active', '==', true)
                                        .where('groups', 'array-contains-any', this.groups)
                                        .get()
                                        .then(query => {
                                            this.spaces = []
                                            let space
                                            query.forEach(doc => {
                                                space = doc.data()
                                                Object.defineProperty(space, 'id', {
                                                    enumerable: true,
                                                    configurable: true,
                                                    writable: true,
                                                    value: doc.id
                                                });
                                                this.spaces.push(space)
                                            })
                                        })
                console.log('Estos son los espacios: ', this.spaces);
            } catch (error) {
                console.log(error);
            }   
        },

        async checkAvailability(reservation){
            try {
                
            
            return new Promise(async (resolve, reject) =>{
                let reservations = []
                let response = await db.collection('reservations')
                                        .where('space', '==', reservation.space)
                                        .where('date', '==', reservation.date)
                                        .get()
                                        .then(query => {
                                            query.forEach(doc => {
                                                reservations.push(doc.data())
                                            })
                                        })
                console.log('Estas son las reservas de esta sala para la fecha: ', reservations);
                reservations.forEach(doc => {
                    let fechaInicio = moment(reservation.formatDate).format()
                    let fechaInicio2 = moment(doc.formatDate.toDate()).format()
                    let fechaFin = moment(reservation.formatDate).add(reservation.duration, 'hours').format()
                    let fechaFin2 = moment(doc.formatDate.toDate()).add(doc.duration, 'hours').format()
                    if ((moment(fechaInicio).isBefore(fechaInicio2) && moment(fechaFin).isSameOrAfter(fechaFin2)) || 
                        (moment(fechaInicio).isSameOrAfter(fechaInicio2) && moment(fechaFin2).isSameOrAfter(fechaInicio)) ||
                        (moment(fechaInicio).isSameOrBefore(fechaInicio2) && moment(fechaFin).isSameOrAfter(fechaInicio2))) {
                        resolve(true)
                        console.log('Se empalma');
                    }
                })
                resolve(false)
            })
            } catch (error) {
                console.log(error);
            }
        },

        async addReservation(){
            

            try {
                this.newReservation.user = this.user.uid
                this.newReservation.type = this.type
                let hour = '1995-08-23 ' + this.newReservation.hour
                let date = moment(this.newReservation.date).format('L')
                let newHour = moment(hour).format('h:mm a')
                let formatDate = moment(date + ' ' + newHour, "DD-MM-YYYY h:mm a").format()
                console.log(newHour);
                console.log(date);
                console.log(formatDate);
                this.newReservation.formatDate = new Date(formatDate)
                this.newReservation.parkings = []
                this.newReservation.dateUnix = moment(this.newReservation.date).unix()
                this.newReservation.date = JSON.parse(JSON.stringify(date))
                console.log('Binnie: ', this.newReservation.date);
                let hourLimit = moment(this.newReservation.formatDate).add(30, 'minutes').unix()
                let hourFinish = moment(this.newReservation.formatDate).add(this.newReservation.duration, 'hours').unix()
                let hourNotyCancel = moment(this.newReservation.formatDate).add(15, 'minutes').unix()
                
                this.newReservation.hourLimit = hourLimit
                this.newReservation.hourFinish = hourFinish
                this.newReservation.hourNotyCancel = hourNotyCancel
                this.newReservation.notyCancel = false

                if (this.$v.newReservation.$invalid) {
                    this.$q.notify({
                        message: 'Completa el formulario.',
                        color: 'negative'
                    })
                    return
                }
                
                this.newReservation.app = false
                console.log('Binnie 2: ', this.newReservation.date);
                let availability = await this.checkAvailability(this.newReservation)
                if (availability) {
                    console.log('Se empalma');
                    this.$q.notify({
                        message: 'Ya existe una reservacion para esta sala',
                        color: 'negative'
                    })

                    this.newReservation.date = new Date()
                    return
                }
                this.newReservation.date = date
                console.log('Binnie 3: ', this.newReservation.date);
                console.log(this.newReservation);

                this.$router.push({ name: 'confirm', params: { reservation: this.newReservation, space: this.space } })
                // let response = await db.collection('reservations').add(this.newReservation)
                // this.$q.notify({
                //     message: 'Reservacion registrada',
                //     color: 'positive'
                // })
                
            } catch (error) {
                console.log(error);
            }
        },

    },
}
</script>
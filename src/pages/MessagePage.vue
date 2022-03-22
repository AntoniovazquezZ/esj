<style scoped lang="scss">
    .main-container{
        padding: 20px;
        .dropbtn {
  background-color: #d3d3d3;
  position: absolute;
  left: 20px;
  top: 15px;
  color: white;
  padding: 6px;
  font-size: 16px;
  border: none;
  cursor: pointer;
}

.dropdown {
  position: relative;
  display: inline-block;
}
textarea {
   border-style: none; 
    border-color: Transparent; 
    overflow: auto;   
}
.btn {
  height: 50px;
  width: 50px;
  border-radius: 50%;
  border: 1px #d3d3d3 ;
}
.btn2 {
  height: 50px;
  width: 50px;
  border-radius: 50%;
  border: 1px #d3d3d3 ;
  position: absolute;
  left: 300px;
  top: 20px;
}
.btn3 {
  height: 50px;
  width: 120px;
  
  border: 1px #d3d3d3 ;
  position: absolute;
  left: 20px;
  top: 480px;
}
.btn4 {
  height: 50px;
  width: 140px;
  
  border: 1px #d3d3d3 ;
  position: absolute;
  left: 20px;
  top: 535px;
}
.btn5 {
  height: 50px;
  width: 180px;
  
  border: 1px #d3d3d3 ;
  position: absolute;
  left: 20px;
  top: 590px;
}
.btn6 {
  height: 50px;
  width: 190px;
  
  border: 1px #d3d3d3 ;
  position: absolute;
  left: 20px;
  top: 645px;
}
label {
    display: inline-block;
        width: 150px;
}


.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {background-color: rgb(92, 92, 92)}

.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown:hover .dropbtn {
  background-color: #a5a5a5;
}
        .card{
            margin-top: -150px; 
            padding: 5px 10px;
            background-color: white;

            .card-header{
                margin-top: -100px;
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
            <div class="q-pa-md q-gutter-sm">      
                <q-btn style="top: -20px; right: 12px;" round outline color="gray-4" icon="close" @click="open('bottom')"/>
                <q-dialog v-model="dialog" :position="position">
      <q-card style="width: 350px ">
        <q-card-section class="items-center">
          <div>
            <div class="text-weight-bold text-center">¿Descartar mensaje?</div>
          </div>
          </q-card-section>
          <q-card-section align="center" class=" items-center">
          <q-btn flat color="red" to="/dashboard" label="Descartar" v-close-popup />
          </q-card-section>
          <q-card-section align="center" class=" items-center">
          <q-btn flat color="primary" label="Seguir Editando" v-close-popup />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
  
            <div class="q-pa-md q-gutter-sm">
                <q-btn style="top: -95px; right: -275px;" round color="primary" icon="send" @click="persistent = true"/>
    <q-dialog v-model="persistent" persistent position="bottom">
      <q-card style="width: 350px ">
        <q-card-section class="items-center">
          <div>
            <div class="text-weight-bold text-center">Mensaje Enviado</div>
          </div>
          </q-card-section>
          <q-card-section align="center" class=" items-center">
          <q-btn flat color="red" to="/dashboard" label="Cerrar" v-close-popup />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>

  <div class="q-pa-md">
    <q-btn-dropdown v-if="toUser == undefined" padding="none" style="top: -105px; right: -270px;" >
      <q-list>
        <q-item clickable v-close-popup @click="onItemClick">
          <q-item-section>
            <q-item-label></q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>
  </div>

            <div :key="indexPost" width="100%" padding="0 10" marginBottom="20">
                <div class="card">
                <q-btn flat style="bottom: -420px; left: -25px;" color="primary" @click="captureImage()" icon="photo_camera" label="Hacer foto" />
                <q-btn flat style="bottom: -470px; left: -175px;" color="primary" @click="captureImage()"icon="videocam" label="Hacer video" />
                <q-btn flat style="bottom: -480px; left: -25px;" color="primary" @click="captureImage()"icon="image" label="Subir desde Galeria" />
                <q-btn flat style="bottom: -490px; left: -25px;" color="primary" @click="ChooseFile()"icon="description" label="Agregar un Archivo" />
                    <div class="card-header">
                        <div class="card-header-section">                          
                            <div class="card-image" style="width: 70px; height: 70px;">
                                <img width="70" style="border-radius: 50%;" :src="user.photo" />
                            </div>
                            
                            <div class="card-name">
                                <label>{{ user.name }}</label>
                                <label>{{ getDate }}</label>
                            </div>

                            <div class="q-pa-md">
    <q-btn-toggle
      v-model="model"
      toggle-color="primary"
      size="10px"
      padding="xs"
      style="top: 5px; right: 40px;"
      :options="[
        {label: 'Individual', value: 'one'},
        {label: 'Grupal', value: 'two'},
      ]"
    />
  </div>

   

                            <div class="dropdown" v-if="toUser == undefined" row="0" col="1" borderRadius="10" rows="auto, auto" columns="*">
                                <!--<button class="dropbtn">Todos</button>-->
                                <div class="dropdown-content">
                                    <div 
                                    v-if="type == 1" 
                                    ref="dd"
                                    fontSize="17"
                                    itemsPadding="10"
                                    itemsTextAlignment="center"
                                    :items="usersNames"
                                    color="black"
                                    @selectedIndexChanged="selectUser"
                                    row="0"
                                    col="0">{{userNames}}
                                    </div>
                                    <div
                                    v-if="type == 2"
                                    ref="dd"
                                    fontSize="17"
                                    itemsPadding="10"
                                    itemsTextAlignment="center"
                                    :items="groupsNames"
                                    color="black"
                                    @selectedIndexChanged="selectGroup"
                                    row="0"
                                    col="0">{{groupsNames}}
                                    </div>
                                    <a @click="type = 1" :class="[type == 1 ? 'active' : '']" marginRight="1" textAlignment="center" row="0" col="0" fontSize="12" borderRadius="2"  textWrap="true">Indivitual</a>
                                    <a @click="type = 2" :class="[type == 2 ? 'active' : '']" marginLeft="1" textAlignment="center" row="0" col="1" fontSize="12" borderRadius="2"  textWrap="true">Grupal</a>
 
  
  </div>
</div>
</div> 
                        
                    </div>
                    <textarea style=" min-width:100px; max-width:100%;min-height:300px;height:100%;width:100%;" row="2" col="0" v-model="newMessage.subject" borderWidth="0 0 1 0" borderColor="transparent" editable="true" placeholder="Escribe aqui lo que quieres compartir"></textarea>
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
import BottomSheetSent from './bottom-sheet/MessageSent';
import BottomSheetOptions from './bottom-sheet/MessageOptions';

var moment = require('moment');
import { Plugins, CameraResultType } from '@capacitor/core'
const { Camera } = Plugins

export default {
 


  setup () {
    return {
      sizes: [ 'xs', 'sm', 'md', 'lg', 'xl' ],
      
    }
  },
  props: [
        'toUser'
    ],

    name: 'NewMessage',
  data () {
    return {
        model: null,
        dialog: false,
      position: 'bottom',
        seamless: false,
        persistent: false,
       type: 1,
            indexPost: '',
            newMessage: {
                subject: '',
                image: null,
                video: null,
                users: [],
                status: true,
                now: true,
                likes: [],
                comments: [],
            },

            groups: [],
            groupsNames: [],

            users: [],
            usersNames: [],

            files: [],

            postPhoto: false,
            postVideo: false,

            percent: 0,
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
    watch: {
        type(){
            this.newMessage.users = []
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
    show (grid) {
      this.$q.bottomSheet({
        message: 'Mensaje Enviado',
        grid,
        actions: [
         
          
         
        ]
      }).onOk(action => {
        // console.log('Action chosen:', action.id)
      }).onCancel(() => {
        // console.log('Dismissed')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    },
    open (position) {
      this.position = position
      this.dialog = true
    },
    shown (grid) {
      this.$q.bottomSheet({
        message: 'Descartar mensaje?',
        grid,
        actions: [
         
          
          {
            label: 'Descartar',
              id: 'index'
            
          },
          {
            label: 'Seguir editando',
            
          },
          {},
          {
            
          }
        ]
      }).onOk(action => {
        // console.log('Action chosen:', action.id)
      }).onCancel(() => {
        // console.log('Dismissed')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
      this.$navigator.navigate('/Dashboard')
    },
    onItemClick () {
      // console.log('Clicked on an Item')
    },
    async captureImage() {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.DataUrl
      })
      // The result will vary on the value of the resultType option.
      // CameraResultType.Uri - Get the result from image.webPath
      // CameraResultType.Base64 - Get the result from image.base64String
      // CameraResultType.DataUrl - Get the result from image.dataUrl
      this.imageSrc = image.webPath
    },
    selectGroup(args){
                console.log(`index seleccionado: ${args.newIndex}`)
                console.log(this.groups[args.newIndex])
                this.newMessage.users = this.groups[args.newIndex].members
        },

        selectUser(args){
                console.log(`index seleccionado: ${args.newIndex}`)
                console.log(this.users[args.newIndex])
                this.newMessage.users.push(this.users[args.newIndex].id)
        },

        async getGroups(){
            try {
                let response = await firebase.firestore.collection('groups')
                                                        .get()
                                                        .then(query => {
                                                            query.forEach(doc => {
                                                                this.groups.push(doc.data())
                                                                this.groupsNames.push(doc.data().name)
                                                            })
                                                        })
            } catch (error) {
                console.log(error);
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
    uploadPost(){

            if (this.postPhoto) {
                                                                
                console.log('Entra en control de fotos')
                this.savePhotos()
                return
            }

            if (this.postVideo) {
                
                console.log('Entra en control de video')
                this.saveVideo()
                return
            }
            this.makePublication()
        },

    async savePhotos(){
            //Iniciamos pantalla carga
            loader.show(options)
            try{
                let metadata = {
                    contentType: "image/jpeg",
                    contentLanguage: "es",
                }
                let fotoId = this.generateUUID()
                firebase.storage.uploadFile({
                remoteFullPath: 'feed/' + fotoId + '.jpg',
                localFullPath: this.newMessage.image,
                onProgress: (status) => {
                    console.log("Uploaded fraction: " + status.fractionCompleted);
                    console.log("Percentage complete: " + status.percentageCompleted);
                },
                metadata
              }).then((uploadedFile) => {
                    this.newMessage.image = null
                    firebase.storage.getDownloadUrl({
                        remoteFullPath: 'feed/' + fotoId + '.jpg'
                    }).then(async (url) => {
                            console.log('esta es la url: ', url);
                            return this.makePublication(url)
                        },
                        (error) => {
                            loader.hide()
                            console.log("Error 2: " + error);
                        }
                    );
                },
                    (error) => {
                        loader.hide()
                        console.log("File upload error: " + error);
                    }
                );
            }
            catch(e){
                loader.hide()
                console.log(e)
            }
        },
    chooseFile(){
            let context = filepicker.create({
                mode: "single",
                extensions: ["pdf", "jpg", "doc", "docx", "gif", 'mp3', 'mp4']
            });
            this.startSelection(context);
        },

        startSelection(context) {
            context
                .authorize()
                .then(() => {
                    return context.present();
                })
                .then((selection) => {
                    console.log("Selection done: " + JSON.stringify(selection));

                    this.uploadFiles(selection[0])
                }).catch(function (e) {
                    console.log(e);
                });
        }, 
        removeFile(index){
            this.files.splice(index, 1)
        },

        async uploadFiles(file){
            loader.show(options)
            try{
                let metadata = {
                    contentLanguage: "es",
                }
                let fileID = this.generateUUID()
                firebase.storage.uploadFile({
                remoteFullPath: 'feed/' + fileID,
                localFullPath: file,
                onProgress: (status) => {
                    console.log("Uploaded fraction: " + status.fractionCompleted);
                    console.log("Percentage complete: " + status.percentageCompleted);
                },
                metadata
              }).then((uploadedFile) => {
                    firebase.storage.getDownloadUrl({
                        remoteFullPath: 'feed/' + fileID
                    }).then(async (url) => {
                            console.log('esta es la url: ', url);
                            loader.hide()

                            this.files.push(url)
                            return url
                        },
                        (error) => {
                            loader.hide()
                            console.log("Error 2: " + error);
                        }
                    );
                },
                    (error) => {
                        loader.hide()
                        console.log("File upload error: " + error);
                    }
                );
            }
            catch(e){
                loader.hide()
                console.log(e)
            }
        },
        uploadPost(){

            if (this.postPhoto) {
                                                                
                console.log('Entra en control de fotos')
                this.savePhotos()
                return
            }

            if (this.postVideo) {
                
                console.log('Entra en control de video')
                this.saveVideo()
                return
            }
            this.makePublication()
        },
        async makePublication(url = null){
            try {
                if (this.postVideo) {
                    this.newMessage.video = url
                } else if(this.postPhoto) {
                    this.newMessage.image = url
                }

                if (this.newMessage.users.length == 0) {
                    loader.hide()
                    Toast.makeText("Elige un destinatario", "long").show()
                    return
                }
                
                if(!this.$v.newMessage.subject.required && this.newMessage.image == null){
                    loader.hide()
                    Toast.makeText("El mensaje no puede ir vacio", "long").show()
                    return
                }
                this.newMessage.user = this.user.uid
                this.newMessage.date = new Date()
                this.newMessage.users.push(this.user.uid)
                console.log(this.newMessage);
                this.newMessage.files = this.files

                await firebase.firestore.collection('feed').add(this.newMessage)

                this.newMessage.subject = ''
                this.newMessage.photo = null
                this.newMessage.video = null
                this.newMessage.users = []
                this.newMessage.files = []
                this.postPhoto = false
                this.postVideo = false
                this.indexPost = this.generateUUID()
                loader.hide()

                Toast.makeText("Mensaje enviado", "long").show()

                this.messageSent()
            } catch (error) {
                loader.hide()
                console.log(error)
            }
        },
        messageSent(){
            try {
                this.$showBottomSheet(BottomSheetSent, {
                    ignoreTopSafeArea: false,
                    ignoreBottomSafeArea: true,
                    closeCallback: (args) => {
                        console.log('bottom sheet closed', args);
                    }
                })

                this.$navigator.navigate('/home')
            } catch (error) {
                console.log(error)
            }
        },

        goToHome(){
            try {
                this.$showBottomSheet(BottomSheetOptions, {
                    ignoreTopSafeArea: false,
                    ignoreBottomSafeArea: true,
                    closeCallback: (args) => {
                        console.log('bottom sheet closed', args);
                    }
                })
            } catch (error) {
                console.log(error)
            }
        }
    
  }
}
</script>
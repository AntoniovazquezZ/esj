import { auth, db } from 'boot/firebase'
import { Notify } from 'quasar'

export async function loginUser ({commit}, payload) {
    console.log('Desde vuex: ', payload);
    try {
        return new Promise((resolve, reject) =>{
            auth.signInWithEmailAndPassword(payload.email, payload.password)
                .then(response => {
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
      }) 
    } catch (error) {
        console.log(error);
    }
    
}

export async function registerUser ({commit}, payload) {
    console.log('Desde vuex: ', payload);
    try {
        return new Promise((resolve, reject) =>{
            auth.createUserWithEmailAndPassword(payload.email, payload.password)
                    .then(async (userCredential) => {
                        console.log(userCredential);
                        let user = {
                            name: payload.name,
                            email: payload.email,
                            uid: userCredential.user.uid,
                            active: payload.active,
                            role: payload.role,
                            photo: 'https://i.pinimg.com/originals/87/6f/38/876f386e2ce509c094b932e34211ea14.jpg',
                        }
                        await db.collection('users').doc(userCredential.user.uid).set(user)

                        await auth.signInWithEmailAndPassword(payload.email, payload.password)
                                    .then(response => {
                                        console.log('Fierestore dice: ', response);
                                    }).catch(error => {
                                        console.log(error);
                                    })

                        resolve(response)

                    })
                    .catch((error) => {
                        console.log(error);

                        reject(error)
                    });
        })
    } catch (error) {
        console.log(error);
    }
    
}

export async function getUser({commit}, payload){
    try {
        

        let document = await db.collection('users').doc(payload).get()

        if (document.exists) {
            let user = document.data()
            
            if (user.role != 'admin') {
                Notify.create({
                    message: 'Parece que no tienes los permisos necesarios.',
                    color: 'negative'
                })

                auth.signOut()
                commit('updateUser', null)
                
                
                return
            }

            commit('updateUser', user)
            this.$router.replace('/dashboard')
            
        } 
    } catch (error) {
        console.log(error)
    }
}

export function closeSesion({ commit }) {
    auth.signOut()
    commit('updateUser', null)
    this.$router.replace('/')
}
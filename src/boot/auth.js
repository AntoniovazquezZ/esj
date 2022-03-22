// import something here
import { auth } from 'boot/firebase'
// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/boot-files
export default async ({ store }) => {
  auth.onAuthStateChanged(user => {
    if(user){
      store.dispatch('auth/getUser', user.uid)
        // localStorage.setItem('loggedIn', true)
    }else{
      store.dispatch('auth/closeSesion')
    }
})
}

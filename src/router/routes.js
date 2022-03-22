const routes = [
    {
        path: '/',
        component: () => import('layouts/AuthLayout.vue'),
        children: [
            { path: '', component: () => import('pages/auth/Login.vue') }
        ]
    },
    {
        path: '/register',
        component: () => import('layouts/AuthLayout.vue'),
        children: [
            { path: '', component: () => import('pages/auth/Register.vue') }
        ]
    },
    {
        path: '/dashboard',
        component: () => import('layouts/MainLayout.vue'),
        children: [
            { path: '', component: () => import('pages/Index.vue') },
            { path: '/reservations', component: () => import('pages/Reservations.vue') },
            { path: '/make-reservation', component: () => import('pages/MakeReservation.vue') },
            { path: '/message-page', component: () => import('pages/Messagepage.vue') },
            { path: '/confirm-reservation', name: 'confirm', props: true, component: () => import('pages/ConfirmReservation.vue') },
            { path: '/check-reservation', name: 'check', props: true, component: () => import('pages/CheckReservation.vue') },
            { path: '/questions', component: () => import('pages/Questions.vue') },
            { path: '/links', component: () => import('pages/Links.vue') },

            //Phone
            { path: '/directory', component: () => import('pages/Directory.vue') },
        ]
    },
  
    // Always leave this as last one,
    // but you can also remove it
    {
        path: '*',
        component: () => import('pages/Error404.vue')
    }
]
  
export default routes
  
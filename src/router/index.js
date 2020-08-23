import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import NewStudent from '@/components/NewStudent'
import EditStudent from '@/components/EditStudent'
import ViewStudent from '@/components/ViewStudent'
import Login from '@/components/Login'
import Register from '@/components/Register'
import firebase from 'firebase'


Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        requiredAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        requiredGuest: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        requiredGuest: true
      }
    },
    {
      path: '/new',
      name: 'new-student',
      component: NewStudent,
      meta: {
        requiredAuth: true
      }
    },
    {
      path: '/edit/:student_id',
      name: 'edit-student',
      component: EditStudent,
      meta: {
        requiredAuth: true
      }
    },
    {
      path: '/:student_id',
      name: 'view-student',
      component: ViewStudent
    }     
  ]
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiredAuth)) {
    //check if not logged in
    if(!firebase.auth().currentUser){
      //got to login 
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      //Proceed to route
      next();
    }
   } else if(to.matched.some(record => record.meta.requiredGuest)) {
      //check if logged in
    if(firebase.auth().currentUser){
      //got to login 
      next({
        path: '/',
        query: {
          redirect: to.fullPath 
        }
      });
    } else {
      //Proceed to route
      next();
    }
    } else {
      next();
    }
  }
);
//Nav guard

export default router;

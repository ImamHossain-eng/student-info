<template>
    <div id="edit-student">
        <h2>Edit Student</h2>
        <div class="row">
            <form @submit.prevent="updateStudent" class="col s12">
                <div class="row">
                    <div class="input-field col s12">
                        <input disabled type="text" v-model="student_id" required>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="name" required>
                       
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="dept" required>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="position" required>
                    </div>
                </div>
                <button type="submit" class="btn">Save</button>
                <router-link to="/" class="btn grey">
                    Cancel
                </router-link>
            </form>
        </div>
    </div>
</template>

<script>
import db from './firebaseinit'
    export default {
        name: 'edit-student',
        data () {
            return {
                student_id: null,
                name: null,
                dept: null,
                position: null
            }
        },
         beforeRouteEnter (to, from, next) {
            db.collection('students').where('student_id', '==', to.params.student_id).get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    next(vm => {
                        vm.student_id = doc.data().student_id
                        vm.name = doc.data().name
                        vm.dept = doc.data().dept
                        vm.position = doc.data().position
                    })
                })
            }) 
        },
        watch: {
            '$route': 'fetchData'
        },
        methods: {
            fetchData () {
                db.collection('students').where('student_id', '==',this.$route.params.student_id).get()
                .then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        this.student_id = doc.data().student_id
                        this.name = doc.data().name
                        this.dept = doc.data().dept
                        this.position = doc.data().position
                    })
                })
            },
            updateStudent() {
                db.collection('students').where('student_id', '==',this.$route.params.student_id).get()
                .then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        doc.ref.update({
                            student_id: this.student_id,
                            name: this.name,
                            dept: this.dept,
                            position: this.position
                        })
                        .then(() => {
                            this.$router.push({
                                name: 'view-student',
                                params: {student_id: this.student_id}
                            })
                        })
                    })
                })
            }
        }
    }
</script>

<style scoped>

</style>
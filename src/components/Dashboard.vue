<template>
    <div id="dashboard">
        <ul class="collection with-header">
            <li class="collection-header">
                <h4>Students' List</h4>
            </li>
            <li v-for="student in students" v-bind:key="student.id" class="collection-item">
                <strong>Overview:</strong> {{student.name}}----
                {{student.student_id}} ----  {{student.position}} of {{student.dept}}

                <router-link class="secondary-content" v-bind:to="{name:'view-student', params: {student_id: student.student_id}}">
                    <i class="fa fa-eye"></i>
                </router-link>

            </li>
        </ul>
        <div class="fixed-action-btn">
            <router-link to="/new" class="btn-floating btn-large red">
              <i class="fa fa-plus"></i>
            </router-link>
        </div>
    </div>
</template>

<script>
import db from './firebaseinit'
    export default {
        name: 'dashboard',
        data () {
            return {
                students: []
            }
        },
        created () {
            db.collection('students').orderBy('student_id').get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    const data = {
                        'id': doc.id,
                        'student_id': doc.data().student_id,
                        'name': doc.data().name,
                        'dept': doc.data().dept,
                        'position': doc.data().position
                        
                    }
                    this.students.push(data)
                })
            })
        }
    }
</script>

<style scoped>

</style>
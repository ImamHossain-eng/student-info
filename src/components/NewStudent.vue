<template>
    <div id="new-student">
        <h2>New Student</h2>
        <div class="row">
            <form @submit.prevent="saveStudent" class="col s12">
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="student_id" required>
                        <label>Student's ID#</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="name" required>
                        <label>Student's Name</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="dept" required>
                        <label>Department</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="position" required>
                        <label>Student's Status or Position</label>
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
        name: 'new-student',
        data () {
            return {
                student_id: null,
                name: null,
                dept: null,
                position: null
            }
        },
        methods: {
            saveStudent() {
                db.collection('students').add({
                    student_id: this.student_id,
                    name: this.name,
                    dept: this.dept,
                    position: this.position
                })
                .then(docRef => {
                    this.$router.push('/')
                })
                .catch(error => console.log(err))
            }
        }
    }
</script>

<style scoped>

</style>
<template>

    <div>
        <b-form @submit.prevent="addProject" style="max-width: 750px; margin: 20px auto">
            <!-- No idea why it is not shown without "show" attribute -->
            <b-alert show="true" variant="danger" v-if="false">
                Wrong Credentials
            </b-alert>

            <b-form-group
                    id="input-group-1"
                    label="Project title"
                    label-for="input-1"
            >
                <b-form-input
                        id="input-1"
                        v-model="form.name"
                        type="text"
                        required
                        placeholder="Enter title"
                ></b-form-input>
            </b-form-group>


            <b-form-group
                    id="input-group-2"
                    label="Project description"
                    label-for="input-2"
            >
                <b-form-textarea
                        id="textarea"
                        v-model="form.description"
                        placeholder="Tell us more about your project"
                        rows="5"
                        required
                ></b-form-textarea>
            </b-form-group>

            <b-form-group
                    id="input-group-3"
                    label="Project tags"
                    label-for="input-3"
            >
                <multiselect
                        v-model="form.tags"
                        :options="items"
                        :multiple="true"
                />
            </b-form-group>

            <b-form-group
                    id="input-group-4"
                    label="Applications end date"
                    label-for="input-4"
            >
                <b-form-input
                        id="input-1"
                        v-model="form.endDate"
                        type="date"
                        required
                ></b-form-input>
            </b-form-group>

            <b-form-group
                    id="input-group-5"
                    label="Payment amount (USD)"
                    label-for="input-5"
            >
                <b-input-group-append

                >
                    <label style="margin: 5px 10px 0 0;">From</label>
                    <b-form-input
                            id="inline-form-input-name"
                            type="number"
                            min="0"
                            step="0.01"
                            placeholder="USD"
                            v-model="form.payment.lowerBound"
                    ></b-form-input>
                    <label style="margin: 5px 10px;">to</label>
                    <b-form-input
                            id="inline-form-input-username"
                            placeholder="USD"
                            type="number"
                            min="0"
                            step="0.01"
                            v-model="form.payment.upperBound"
                    ></b-form-input>
                </b-input-group-append>
                <small>A zero value will be considered as unspecified. At least one payment amount (lower or upper bound) must be turned in.</small>
            </b-form-group>

            <b-button type="submit" variant="secondary">Submit</b-button>
        </b-form>
    </div>
</template>

<script>
    import {addProject} from "@/service/api";
    import {Multiselect} from "vue-multiselect";

    export default {
        name: "AddProject",

        components: { Multiselect },

        data: () => {
            return {
                items: ['Dragos e flael', 'MySQL', 'Oracle', 'MongoDB', 'PostgreSQL'],

                form: {
                    name: '',
                    description: '',
                    tags: [],
                    endDate: '',
                    payment: {
                        upperBound: 0,
                        lowerBound: 0
                    }
                },

                config: {
                },

                editor: null
            }
        },

        methods: {
            addProject() {
                // eslint-disable-next-line no-console
                addProject({
                    ...this.form
                }, (res, err) => {
                    if (err == null) {
                        this.$router.push('/view_project/' + res.data.id);
                    } else {
                        // eslint-disable-next-line no-console
                        console.log("yay");
                    }
                })
            }
        },
    }
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>

</style>
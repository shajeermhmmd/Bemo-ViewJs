<template>
    <div>
        <div class="sidePannelMain">
            <h2>BeMo</h2>
        </div>
        <div class="headerMainall"></div>

        <div class="mainTxtContent">
            <div class="headerMain">
                <h1>Bemo Board</h1>
                <button class="addColumn" @click="showColumnModal()"><i class="fa fa-plus-square-o" aria-hidden="true"></i></button>
            </div>

            <ul>
                <li v-for="(column, index) in columns" :key="index">
                    <div class="cardBorderMain">
                        <div class="headerMain1">
                            <h3>{{ column.title }}</h3>
                            <div>
                                <button class="deleteBtn" type="button" @click="deleteColumn(column.id)"><i class="fa fa-trash" aria-hidden="true"></i></button>
                                <button class="editBtn" type="button" @click="editColumn(column)"><i class="fa fa-pencil" aria-hidden="true"></i></button>
                            </div>
                        </div>
                        <draggable class="cardMainAll" v-model="column.card" group="people" @start="drag = true" @end="drag = false" @change="onUnpublishedChange">
                            <div v-for="element in column.card" :key="element.id" class="card" @click="editCard(element, column.id)">
                                {{ element.name }}
                            </div>
                            <span class="no-cards" v-if="column.card.length == 0">No more cards found!</span>
                        </draggable>
                        <button class="addBtnmain" slot="header" @click="showCardModal(column.id)">
                            Add Card
                        </button>
                    </div>
                </li>
            </ul>
            <button class="exportDb" slot="header" @click="exportDB()">Export DB</button>
            <!-- Column Modal -->
            <modal class="modalMain" name="add-column-modal">
                <div>
                    <h3 v-if="!editFlag">New Column</h3>
                    <h3 v-if="editFlag">Edit Column Details</h3>
                    <label for="title">Title</label>
                    <div class="textInputWrapper">
                        <input type="text" v-model="title" placeholder="Enter Title" />
                        <div class="textInputWrapperPos">
                            <button v-if="!editFlag" @click="addColumn()">Add</button>
                            <button v-else @click="updateColumn(tempCol.id)">Update</button>
                        </div>
                    </div>
                </div>
            </modal>
            <!-- Card Modal -->
            <modal class="card-model" name="add-card-modal">
                <div>
                    <h4 class="modal-title" v-if="!editFlag">Add New Card</h4>
                    <h4 class="modal-title" v-if="editFlag">Edit Card Details</h4>
                    <button class="closeBtn" type="button" @click="hideCardModal()">&times;</button>

                    <label for="title">Name</label>
                    <input type="text" placeholder="Title" v-model="value.name" />
                    <label for="description">Description</label>
                    <textarea class="card-details" placeholder="Card Description" v-model="value.description" rows="4"> </textarea>
                </div>
                <div>
                    <button v-if="!editFlag" @click="addCard()">Add</button>
                    <button v-else @click="updateCard(value.id)">Update</button>
                </div>
            </modal>
        </div>
    </div>
</template>

<script>
    import draggable from "vuedraggable";
    import WebService from "@/service/WebService";
    export default {
        name: "HelloWorld",
        components: {
            draggable,
        },
        data() {
            return {
                editFlag: false,
                title: "",
                index: "",
                columns: [],
                value: {
                    name: "",
                    description: "",
                },
                tempCol: {},
                tempcard: {},
            };
        },
        mounted() {
            this.getColumns();
        },
        methods: {
            /**
             * To catch the specific drag event.
             *
             * @param adding event
             */
            onUnpublishedChange({ added }) {
                if (added) {
                    WebService.postCall("column-cards", { data: this.columns }).then((response) => {
                        if (response.data.status == 200) {
                            //
                        }
                    });
                }
            },

            /**
             * To get all the columns with cards
             */
            getColumns() {
                WebService.getCall("column").then((response) => {
                    if (response.data.status == 200) {
                        this.columns = response.data.columns;
                    }
                });
            },

            /**
             * To open the card modal.
             */
            showCardModal(index) {
                this.value = {};
                this.editFlag = false;
                this.index = index;
                this.$modal.show("add-card-modal");
            },

            /**
             * To open the column modal.
             */
            showColumnModal() {
                this.title = "";
                this.editFlag = false;
                this.$modal.show("add-column-modal");
            },

            /**
             * To close the card modal.
             */
            hideCardModal() {
                this.$modal.hide("add-card-modal");
                this.value = {};
                this.editFlag = false;
            },

            /**
             * To close the column modal.
             */
            hideColumnModal() {
                this.$modal.hide("add-column-modal");
                this.title = "";
                this.editFlag = false;
            },

            /**
             * To add the new column to DB
             */
            addColumn() {
                if (this.title) {
                    WebService.postCall("column", { title: this.title }).then((response) => {
                        if (response.data.status == 200) {
                            // this.columns.push({ title: this.title, card: [] });
                            this.columns = response.data.columns;
                        }
                    });
                }
                this.$modal.hide("add-column-modal");
                this.title = "";
            },

            /**
             * Edit the specified column element.
             *
             * @params Card_element_id
             */
            editColumn(col) {
                this.tempCol = col;
                this.title = this.tempCol.title;
                this.editFlag = true;
                this.$modal.show("add-column-modal");
            },

            updateColumn(id) {
                if (this.title) {
                    WebService.putCall("column/" + id, {
                        title: this.title,
                    }).then((response) => {
                        if (response.data.status == 200) {
                            for (var i = 0; i < this.columns.length; i++) {
                                if (this.columns[i].id === id) {
                                    this.columns[i].title = this.title;
                                }
                            }
                        }
                        this.$modal.hide("add-column-modal");
                        this.index = "";
                        this.tempCol = {};
                        this.value = {};
                        this.editFlag = false;
                    });
                }
            },

            /**
             * To add the card
             *
             * @params card_name
             * @params  card_descripton
             */
            addCard() {
                if (this.value.name) {
                    WebService.postCall("card", {
                        name: this.value.name,
                        description: this.value.description,
                        column_id: this.index,
                    }).then((response) => {
                        if (response.data.status == 200) {
                            for (var i = 0; i < this.columns.length; i++) {
                                if (this.columns[i].id === this.index) {
                                    this.columns[i].card.push({
                                        name: this.value.name,
                                        order: "1",
                                        description: this.value.description,
                                    });
                                }
                            }
                        }
                    });
                }
                this.$modal.hide("add-card-modal");
            },

            /**
             * Edit the specified card element.
             *
             * @params Card_element_id
             */
            editCard(element, col_id) {
                this.index = col_id;
                this.value.name = element.name;
                this.value.description = element.description;
                this.value.id = element.id;
                this.editFlag = true;
                this.$modal.show("add-card-modal");
            },

            /**
             * To update the card
             *
             * @params card_id
             * @params card_name
             * @params card_descripton
             */
            updateCard(card_id) {
                if (this.value.name != "") {
                    WebService.putCall("card/" + card_id, {
                        name: this.value.name,
                        description: this.value.description,
                    }).then((response) => {
                        if (response.data.status == 200) {
                            for (var i = 0; i < this.columns.length; i++) {
                                if (this.columns[i].id === this.index) {
                                    for (var j = 0; j < this.columns[i].card.length; j++) {
                                        if (this.columns[i].card[j].id === card_id) {
                                            this.columns[i].card[j].name = this.value.name;
                                            this.columns[i].card[j].description = this.value.description;
                                        }
                                    }
                                }
                            }
                            this.$modal.hide("add-card-modal");
                            this.index = "";
                            this.value = {};
                            this.editFlag = false;
                        }
                    });
                } else {
                    this.$modal.hide("add-card-modal");
                    this.index = "";
                    this.value = {};
                    this.editFlag = false;
                }
            },

            /**
             * To delete the column and its cards
             *
             * @params column_id
             */
            deleteColumn(id) {
                var result = confirm("Want to delete?");
                if (result) {
                    WebService.deleteCall("column/" + id).then((response) => {
                        if (response.data.status == 200) {
                            for (var i = 0; i < this.columns.length; i++) {
                                if (this.columns[i].id === id) {
                                    this.columns.splice(i, 1);
                                }
                            }
                        }
                    });
                }
            },
            exportDB() {
                window.open(process.env.VUE_APP_API_URL + "export-db", "_blank");
            },
        },
    };
</script>

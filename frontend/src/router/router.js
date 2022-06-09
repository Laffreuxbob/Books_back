import { createRouter, createWebHistory} from "vue-router";
import AddForm from "@/components/AddForm";
import List from "@/components/List";

const routes = [
    {
        path: '/add',
        name: 'Add',
        component:  AddForm
    },
    {
        path: '/list',
        name: 'List',
        component:  List
    }
]


const router = createRouter ( {
    history: createWebHistory(process.env.BASE_URL),
    routes
})


export default router
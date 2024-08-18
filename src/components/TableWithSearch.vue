<template>
    <DataTable ref="dt" :value="products" v-model:selection="selectedProducts" dataKey="id"
        :paginator="true" :rows="10" :filters="filters"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,30]"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products">
        <template #header>
            <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
                <h4 class="m-0">Manage Products</h4>
                <div class="p-inputgroup">
                    <span class="p-inputgroup-addon">
                        <i class="pi pi-search"></i>
                    </span>
                    <InputText v-model="filters['global'].value" placeholder="Поиск..." />
                </div>
            </div>
        </template>
        <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
        <Column field="code" header="Code" sortable style="min-width:12rem"></Column>
        <Column field="name" header="Name" sortable style="min-width:16rem"></Column>
        <Column header="Image">
            <template #body="slotProps">
                <img :src="`https://primefaces.org/cdn/primevue/images/product/${slotProps.data.image}`" :alt="slotProps.data.image" class="border-round" style="width: 64px" />
            </template>
        </Column>
        <Column field="price" header="Price $" sortable style="min-width:8rem">
            <template #body="slotProps">
                {{ formatCurrency(slotProps.data.price) }}
            </template>
        </Column>
        <Column field="category" header="Category" sortable style="min-width:10rem"></Column>
        <Column field="rating" header="Reviews" sortable style="min-width:12rem">
            <template #body="slotProps">
                <Rating :modelValue="slotProps.data.rating" :readonly="true" :cancel="false" />
            </template>
        </Column>
        <Column field="inventoryStatus" header="Status" sortable style="min-width:12rem">
            <template #body="slotProps">
                <Tag :value="slotProps.data.inventoryStatus" :severity="getStatusLabel(slotProps.data.inventoryStatus)" />
            </template>
        </Column>
    </DataTable>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Product } from '@/types/Product';

import Toolbar from 'primevue/toolbar';
import Button from 'primevue/button'
import FileUpload from 'primevue/fileupload'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import InputText from 'primevue/inputtext'
import Rating from 'primevue/rating'
import Tag from 'primevue/tag'

export default defineComponent({
    components: {
        Toolbar,
        Button,
        FileUpload,
        DataTable,
        Column,
        InputText,
        Rating,
        Tag
    },
    setup() {
        const products = ref<Product[]>([
    { id: 1, code: 'P001', name: 'Bamboo Watch', image: 'bamboo-watch.jpg', price: 65.00, category: 'Accessories', rating: 5, inventoryStatus: 'INSTOCK' },
    { id: 2, code: 'P002', name: 'Black Watch', image: 'black-watch.jpg', price: 72.00, category: 'Accessories', rating: 4, inventoryStatus: 'INSTOCK' },
    { id: 3, code: 'P003', name: 'Blue Band', image: 'blue-band.jpg', price: 79.00, category: 'Fitness', rating: 3, inventoryStatus: 'LOWSTOCK' },
    { id: 4, code: 'P004', name: 'Blue T-Shirt', image: 'blue-t-shirt.jpg', price: 29.00, category: 'Clothing', rating: 5, inventoryStatus: 'INSTOCK' },
    { id: 5, code: 'P005', name: 'Bracelet', image: 'bracelet.jpg', price: 15.00, category: 'Accessories', rating: 4, inventoryStatus: 'INSTOCK' },
    { id: 6, code: 'P006', name: 'Brown Purse', image: 'brown-purse.jpg', price: 120.00, category: 'Accessories', rating: 4, inventoryStatus: 'OUTOFSTOCK' },
    { id: 7, code: 'P007', name: 'Chakra Bracelet', image: 'chakra-bracelet.jpg', price: 32.00, category: 'Accessories', rating: 3, inventoryStatus: 'LOWSTOCK' },
    { id: 8, code: 'P008', name: 'Galaxy Earrings', image: 'galaxy-earrings.jpg', price: 34.00, category: 'Accessories', rating: 5, inventoryStatus: 'INSTOCK' },
    { id: 9, code: 'P009', name: 'Game Controller', image: 'game-controller.jpg', price: 99.00, category: 'Electronics', rating: 4, inventoryStatus: 'INSTOCK' },
    { id: 10, code: 'P010', name: 'Gaming Set', image: 'gaming-set.jpg', price: 299.00, category: 'Electronics', rating: 3, inventoryStatus: 'INSTOCK' },
    { id: 11, code: 'P011', name: 'Gold Phone Case', image: 'gold-phone-case.jpg', price: 24.00, category: 'Accessories', rating: 4, inventoryStatus: 'INSTOCK' },
    { id: 12, code: 'P012', name: 'Green Earbuds', image: 'green-earbuds.jpg', price: 45.00, category: 'Electronics', rating: 5, inventoryStatus: 'INSTOCK' },
    { id: 13, code: 'P013', name: 'Leather Wallet', image: 'leather-wallet.jpg', price: 85.00, category: 'Accessories', rating: 4, inventoryStatus: 'INSTOCK' },
    { id: 14, code: 'P014', name: 'Red Scarf', image: 'red-scarf.jpg', price: 20.00, category: 'Clothing', rating: 3, inventoryStatus: 'LOWSTOCK' },
    { id: 15, code: 'P015', name: 'Silver Necklace', image: 'silver-necklace.jpg', price: 150.00, category: 'Accessories', rating: 5, inventoryStatus: 'INSTOCK' },
    { id: 16, code: 'P016', name: 'Smart Watch', image: 'smart-watch.jpg', price: 199.00, category: 'Electronics', rating: 4, inventoryStatus: 'INSTOCK' },
    { id: 17, code: 'P017', name: 'Sports Shoes', image: 'sports-shoes.jpg', price: 120.00, category: 'Clothing', rating: 4, inventoryStatus: 'INSTOCK' },
    { id: 18, code: 'P018', name: 'Sunglasses', image: 'sunglasses.jpg', price: 75.00, category: 'Accessories', rating: 5, inventoryStatus: 'INSTOCK' },
    { id: 19, code: 'P019', name: 'Travel Bag', image: 'travel-bag.jpg', price: 180.00, category: 'Accessories', rating: 4, inventoryStatus: 'INSTOCK' },
    { id: 20, code: 'P020', name: 'White T-Shirt', image: 'white-t-shirt.jpg', price: 25.00, category: 'Clothing', rating: 3, inventoryStatus: 'LOWSTOCK' },
    { id: 21, code: 'P021', name: 'Wireless Charger', image: 'wireless-charger.jpg', price: 40.00, category: 'Electronics', rating: 4, inventoryStatus: 'INSTOCK' },
    { id: 22, code: 'P022', name: 'Yoga Mat', image: 'yoga-mat.jpg', price: 50.00, category: 'Fitness', rating: 5, inventoryStatus: 'INSTOCK' },
    { id: 23, code: 'P023', name: 'Yellow Hat', image: 'yellow-hat.jpg', price: 18.00, category: 'Clothing', rating: 3, inventoryStatus: 'LOWSTOCK' },
    { id: 24, code: 'P024', name: 'Zebra Print Bag', image: 'zebra-print-bag.jpg', price: 95.00, category: 'Accessories', rating: 4, inventoryStatus: 'INSTOCK' },
    { id: 25, code: 'P025', name: 'Blue Jeans', image: 'blue-jeans.jpg', price: 60.00, category: 'Clothing', rating: 4, inventoryStatus: 'INSTOCK' },
    { id: 26, code: 'P026', name: 'Red Dress', image: 'red-dress.jpg', price: 120.00, category: 'Clothing', rating: 5, inventoryStatus: 'INSTOCK' },
    { id: 27, code: 'P027', name: 'Black Shoes', image: 'black-shoes.jpg', price: 110.00, category: 'Clothing', rating: 4, inventoryStatus: 'INSTOCK' },
    { id: 28, code: 'P028', name: 'White Sneakers', image: 'white-sneakers.jpg', price: 90.00, category: 'Clothing', rating: 4, inventoryStatus: 'INSTOCK' },
    { id: 29, code: 'P029', name: 'Green Jacket', image: 'green-jacket.jpg', price: 150.00, category: 'Clothing', rating: 5, inventoryStatus: 'INSTOCK' },
    { id: 30, code: 'P030', name: 'Purple Gloves', image: 'purple-gloves.jpg', price: 35.00, category: 'Accessories', rating: 4, inventoryStatus: 'INSTOCK' }
]);
        const selectedProducts = ref<Product[]>([]);
        const filters = ref({ 'global': { value: '' } });

        const formatCurrency = (value: number) => {
            return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
        };

        const getStatusLabel = (status: string) => {
            switch (status) {
                case 'INSTOCK':
                    return 'success';
                case 'LOWSTOCK':
                    return 'warning';
                case 'OUTOFSTOCK':
                    return 'danger';
                default:
                    return null;
            }
        };

        return {
            products,
            selectedProducts,
            filters,
            formatCurrency,
            getStatusLabel
        };
    }
});
</script>

<style scoped>
</style>
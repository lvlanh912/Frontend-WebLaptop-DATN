import { reactive } from "vue";
const price_list=reactive({
    select:'',
    data:[
        {
        name:'Dưới 10 triệu',
        value:1
        },
        {
        name:'từ 10 đến 20 triệu',
        value:2
        },
        {
        name:'Từ 20 đến 30 triệu',
        value:3
        },
        {
           name:'Trên 30 triệu' ,
           value:4
        }
    ]
   })

const cpu_list=reactive({
    select:'',
    data:[{
        name:'Intel Core i3',
        value:'i3'
    },
    {
        name:'Intel Core i5',
        value:'i5'
    },
    {
        name:'Intel Core i7',
        value:'i7'
    },
    {
        name:'Intel Core i9',
        value:'i9'
    },
    {
        name:'Ryzen 3',
        value:'r3'
    },
    {
        name:'Ryzen 5',
        value:'r5'
    },
    {
        name:'Ryzen 7',
        value:'r7'
    },
    {
        name:'Ryzen 9',
        value:'r9'
    },
    {
        name:'Intel Xeon',
        value:'i5'
    },
    {
        name:'CPU khác',
        value:'other'
    }
]
})
const Ram_list=reactive({
    select:'',
    data:[
        {
            name:'8GB',
            value:'8'
        },
        {
            name:'16GB',
            value:'16'
        },
        {
            name:'32GB',
            value:'32'
        },
        {
            name:'64GB',
            value:'64'
        }
    ]
})
const type_list=reactive({
    select:'',
    data:[{
        name:'Laptop văn phòng',
        value:'vp'
    },
    {
        name:'Laptop Gaming',
        value:'gm'
    },
    {
        name:'Laptop đồ hoạ',
        value:'dh'
    },
    {
        name:'Laptop doanh nhân',
        value:'dn'
    }
]
})
const company_list=reactive({
    select:'',
    data:[
        {
            name:'DELL',
            value:'dell'
        },
        {
            name:'Asus',
            value:'asus'
        },
        
        {
            name:'Lenovo',
            value:'lenovo'
        },
        {
            name:'Thinkpad',
            value:'thinkpad'
        },
        {
            name:'HP',
            value:'hp'
        },
        {
            name:'MSI',
            value:'msi'
        },
        {
            name:'Acer',
            value:'acer'
        },
        {
            name:'Hãng khác',
            value:'other'
        },

    ]
})
 export {price_list,cpu_list,Ram_list,type_list,company_list}
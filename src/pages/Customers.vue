<template>
  <div class="content content-main-card">
    <card v-if='!newCustomer'>
      <template slot="header">
            <div class='row mb-5'>
                <div class="col-sm-6 text-left">
                  <button type="button" class="btn btn-light btn-sm px-5 text-white" fill="" @click="openNewCustomer">+ New Customer</button>
                </div>                
            </div>            
        </template>

        <div v-if='table1.data.length'>                
            <h6 class="title d-inline text-left float-left">Customers ({{table1.data.length}})</h6>
            <drop-down tag="div" class='float-right text-right'>
              <button aria-label="Settings menu" data-toggle="dropdown" class="dropdown-toggle btn-rotate btn btn-link btn-icon">
                <i class="tim-icons icon-settings-gear-63"></i>
              </button>
              <ul class="dropdown-menu dropdown-menu-right">
                <a href="#duplicate" class="dropdown-item">Duplicate</a>
                <a href="#delete" class="dropdown-item">Delete</a>
              </ul>
            </drop-down>

            <div class="table-responsive text-left mb-3" style='overflow-x:inherit;'>
                <base-table :data="table1.data" :columns="table1.columns" thead-classes="text-primary">
                    <template slot-scope="{row}">
                        <td>
                            <base-checkbox v-model="row.done"></base-checkbox>
                        </td>
                        <td class="text-left">
                            <p class="title">{{row.name}}</p>
                        </td>
                        <td class="text-left">
                            <p class="text-muted">{{row.address}}</p>
                        </td>
                        <td class="text-left">
                            <p class="text-muted">{{row.country}}</p>
                        </td>
                        <td class="text-left">
                            <p class="text-muted">{{row.email}}</p>
                        </td>
                        <td class="text-left">
                            <p class="text-muted">0</p>
                        </td>
                        <!--
                        <td class="td-actions text-center" style='width:50px;'>
                            <base-button type="link" artia-label="view button" @click='showCustomer(row.id)'>
                              <i class="tim-icons icon-zoom-split"></i>
                            </base-button>
                        </td>
                        -->
                        <td class="td-actions text-center" style='width:50px;'>
                            <base-button type="link" artia-label="edit button" @click='editCustomer(row.id)'>
                              <i class="tim-icons icon-pencil"></i>
                            </base-button>
                        </td>
                    </template>
                </base-table>
            </div>
        </div>

        <div v-if='!table1.data.length' class='py-4 text-center my-4'>
            <p>No customers yet. </p>
            <img src='@/assets/img/customers.png' class='mt-3 mb-5' height='200' />
        </div>   
    </card>

    <card v-if='newCustomer'>
      <template slot="header">
          <div class='row'>
            <h6 class='col-8' style='line-height:22px;'>
              <a href='' @click.prevent='closeNewCustomer'><i class="tim-icons icon-minimal-left text-light mr-3"></i></a> <span v-if='!model.id'>New</span><span v-if='model.id'>Update</span>  Customer
            </h6>
            <a class='col-4 float-right text-right' href='' @click.prevent='closeNewCustomer'>
              <i class="tim-icons icon-simple-remove text-dark mr-3"></i>
            </a>
          </div>

          <div class="row mt-3">
            <div class="col-md-6 pr-md-1 text-left">
              <base-input label="Name" v-model="model.name" placeholder="Name">          
              </base-input>
            </div>
            <div class="col-md-6 pl-md-1 text-left">
              <base-input label="Address" placeholder="Address" v-model="model.address">          
              </base-input>
            </div>
          </div>

          <div class="row">
            <div class="col-md-4 pr-md-1 text-left">
              <base-input label="City" v-model="model.city" placeholder="City">          
              </base-input>
            </div>
            <div class="col-md-4 px-md-1 text-left">
              <base-input label="Country" v-model="model.country" placeholder="Country">          
              </base-input>
            </div>
            <div class="col-md-4 pl-md-1 text-left">
              <base-input label="Postal Code" placeholder="ZIP Code" v-model="model.zip">          
              </base-input>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6 pr-md-1 text-left">
              <base-input label="Email address" v-model="model.email" type="email" placeholder="mike@email.com">          
              </base-input>
            </div>
            <div class="col-md-6 pl-md-1 text-left">
              <base-input label="Phone" v-model="model.phone" type="phone" placeholder="666-666-666">
              </base-input>
            </div>
          </div>

          <h6 class='text-left mb-2 mt-3'>Invoices Personalization</h6>
          <div class="row">
            <div class="col-md-6 pr-md-1 text-left">
              <base-input label="Tax Nº" v-model="model.tax" placeholder="Tax Nº">          
              </base-input>
            </div>
            <div class="col-md-3 px-md-1 text-left">
              <base-input label="Discount" v-model="model.discount" placeholder="Discount" type='number' min='0'>          
              </base-input>
            </div>
            <div class="col-md-3 pr-ml-1 text-left">
              <label class='control-label'>Default VAT (%)</label>
              <input class='form-control' type='number' v-model='model.vat' name='vat' min='0' />
            </div>
          </div>

          <div class="row">
            <div class="col-md-6 text-left">
              <label class='control-label'>Comments/Notes</label>
              <textarea class='form-control px-2' v-model='model.comments' placeholder="Introduce any comment / note. It will appear by default in all invoices" style='border:1px solid rgba(34, 42, 66, 0.4);border-radius:6px;'></textarea>
            </div>
            <div class="col-md-6 text-left">
              <label class='control-label'>Payment Info</label>
              <textarea class='form-control px-2' v-model='model.payment' placeholder="Payment info - It will appear by default in all invoices" style='border:1px solid rgba(34, 42, 66, 0.4);border-radius:6px;'></textarea>
            </div>
          </div>

          <div class='row text-right mt-4 col-12'>
            <base-button v-if='!model.id' type="light" fill class='float-right' @click='saveCustomer()'>Save</base-button>
            <base-button v-if='model.id' type="light" fill class='float-right' @click='saveCustomer()'>Update</base-button>
          </div>
      </template>
    </card>
  </div>
</template>

<script>
import { userSession } from '@/userSession'
import {
  Card,
  BaseInput
} from "@/components/index";
import BaseButton from '@/components/BaseButton';
import BaseTable from '@/components/BaseTable';
import BaseCheckbox from '@/components/BaseCheckbox';
import BaseAlert from '@/components/BaseAlert';
import NotificationTemplate from './Notifications/NotificationTemplate';
import { uuid } from 'vue-uuid';

const tableColumns = ["", "Name", "Address", "Country", "Email", "Total", "Edit"];

var COMPANY_FILE = 'company.json';
var CUSTOMERS_FILE ='customers.json';

export default{
  components:{
    Card,
    BaseInput,
    BaseButton,    
    BaseTable
  },
  data(){
    return {
      showPreview: false,
      tableData: [{}],
      newCustomer: false,
      table1: {
        title: "Customers",
        columns: [...tableColumns],
        data: []
      },
      customers: [],
      invoices_list: [],
      invoices: [],
      model: {
        id: null,
        name: '',
        address: '',
        city: '',
        country: '',
        zip: '',
        phone: '',
        email: '',
        vat: '',
        tax: '',
        discount: 0,
        comments: '',
        payment: ''
      }
    };
  },
  methods:{
    openNewCustomer(){
      this.clearCustomer();
      this.newCustomer = true;
    },
    closeNewCustomer(){
      this.newCustomer = false;
    },  
    fetchData(){
      //Load Customers
      userSession.getFile(CUSTOMERS_FILE).then((customers) => {
        this.customers_list = JSON.parse(customers || "[]");
        let i = 0;

        for(i in this.customers_list){
          userSession.getFile(this.customers_list[i]+'.json').then((customer) => {
            if(customer === null){
              return false;
            }
            this.customers.push(JSON.parse(customer));
            this.table1.data = this.customers;
          });
        }
      });
    },
    saveCustomer(){
      let isNew = false;
      this.customer = this.model;
      if(this.customer.id === null){
        this.customer.id = uuid.v4();
        this.customers_list.unshift(this.customer.id);
        userSession.putFile(CUSTOMERS_FILE, JSON.stringify(this.customers_list));
        isNew = true;
      }

      let customerFile = this.customer.id+".json";
      userSession.putFile(customerFile, JSON.stringify(this.customer));

      if(isNew){
        this.customers.push(this.customer);
        this.table1.data = this.customers;
      }
      //this.clearInvoice();
      this.newCustomer = false;

      this.$notify({
        message: 'Customer created successfully',
        icon: "tim-icons icon-bell-55",
        horizontalAlign: 'center',
        verticalAlign: 'bottom',
        type: 'success',
        timeout: 1500
      });
    },
    showCustomer(id){

    },
    editCustomer(id){
      let search_customer = this.customers_list.indexOf(id);
      if(search_customer === -1){
        this.$notify({
          message: 'Something wrong happened',
          icon: "tim-icons icon-bell-55",
          horizontalAlign: 'center',
          verticalAlign: 'bottom',
          type: 'danger',
          timeout: 1500
        });
        return false;
      }

      this.customer = this.customers[search_customer];
      this.model = this.customer;
      this.newCustomer = true;
    },
    clearCustomer(){
      this.model = {
        id: null,
        name: '',
        address: '',
        city: '',
        country: '',
        zip: '',
        phone: '',
        email: '',
        vat: '',
        tax: '',
        discount: 0,
        comments: '',
        payment: ''
      };
    }
  },
  async mounted(){
    this.i18n = this.$i18n;
    this.fetchData();
  }
}
</script>
<style>
</style>

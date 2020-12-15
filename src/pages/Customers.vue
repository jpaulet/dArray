<template>
  <div class="content content-main-card">
    <card v-if='!newCustomer'>
      <template slot="header">
            <div class='row mb-4'>
                <div class="col-sm-6 text-left">
                  <button type="button" class="btn btn-light btn-sm px-4 px-md-5 text-white" fill="" @click="openNewCustomer">+ New Customer</button>
                </div>
            </div>
        </template>

        <div class='text-center pt-5 mt-5' v-if='loadingPage'>
          <breeding-rhombus-spinner
            :animation-duration="2000"
            :size="65"
            color="#344675"
            style='margin:0px auto;'
          />
        </div>

        <div v-if='table1.data.length && !loadingPage'>
            <h6 class="title d-inline text-left float-left">Customers ({{table1.data.length}})</h6>
            <drop-down tag="div" class='float-right text-right' style='display:none;'>
              <button aria-label="Settings menu" data-toggle="dropdown" class="dropdown-toggle btn-rotate btn btn-link btn-icon">
                <i class="tim-icons icon-settings-gear-63"></i>
              </button>
              <ul class="dropdown-menu dropdown-menu-right">
                <a href="#duplicate" class="dropdown-item">Duplicate</a>
                <a href="#delete" class="dropdown-item">Delete</a>
              </ul>
            </drop-down>

            <div class="table-responsive text-left mb-3" style='overflow-x:inherit;'>
              <table class='table tablesorter'>
                <thead class="text-primary">
                  <tr>
                    <th>Legal</th>
                    <th class='d-none d-sm-table-cell'>Address</th>
                    <th class='d-none d-sm-table-cell'>City / Country</th>
                    <th>Contact</th>
                    <th class='text-left'>Type</th>
                    <th style='width:50px;font-size:10px;text-align:center;'>Edit</th>
                    <th style='width:50px;font-size:10px;text-align:center;'>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for='(row,index) in table1.data' :key='index'>
                    <td style='display:none;'>
                        <base-checkbox v-model="row.done"></base-checkbox>
                    </td>
                    <td class="text-left">
                        <p class="title" style='font-size:12px;'>{{row.legal}}</p>
                    </td>
                    <td class="text-left d-none d-sm-table-cell">
                        <p class="text-muted" style='font-size:12px;'>{{row.address}}</p>
                    </td>
                    <td class="text-left d-none d-sm-table-cell">
                        <p class="text-muted" style='font-size:12px;'>{{row.city}} <span style='font-size:11px;'>({{row.country}})</span></p>
                    </td>
                    <td class="text-left">
                        <p class="text-muted" style='font-size:12px;'>
                          <span v-if='row.name'>{{row.name}}:</span>
                          <a style='font-size:11px;text-decoration:underline;'>{{row.email}}</a>
                        </p>
                    </td>
                    <td class="text-left">
                        <p class="text-muted"><span class='badge badge-light' style='font-size:11px;'>{{row.type}}</span></p>
                    </td>
                    <td class="td-actions text-center px-0" style='width:50px;'>
                        <base-button type="link" artia-label="edit button" @click='editCustomer(row.id)'>
                          <i class="tim-icons icon-pencil"></i>
                        </base-button>
                    </td>
                    <td class="td-actions text-center px-0" style='width:50px;'>
                        <base-button type="link" artia-label="delete button" @click='deleteCustomer(row.id)'>
                          <i class="tim-icons icon-simple-remove"></i>
                        </base-button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
        </div>

        <div v-if='!table1.data.length && !loadingPage' class='py-4 text-center my-4'>
            <p>No customers yet. </p>
            <img src='@/assets/img/customers.jpg' class='mt-3 mb-5' height='200' />
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

          <h6 class='text-left mb-2 mt-3'>Customer</h6>
          <div class="row mt-3">
            <div class="col-md-6 pr-md-1 text-left">
              <base-input label="Legal Name" v-model="model.legal" placeholder="Legal status / Name">
              </base-input>
            </div>
            <div class="col-md-6 pl-md-1 text-left">
              <label> Customer Type </label>
              <drop-down tag="div">
                <button aria-label="Customer Type" data-toggle="dropdown" class="dropdown-toggle btn-rotate btn btn-white btn-dropdown" style='background:#fff;color:#333;border:1px solid rgba(29, 37, 59, 0.5);text-align:left;height:38px;font-weight:200;color:#222a42;border-color:rgba(29, 37, 59, 0.5);border-radius: 0.4285rem;font-size: 0.75rem;box-shadow:none;'>
                  <i></i>
                  {{ model.type }}
                </button>
                <ul class="dropdown-menu">
                  <a href="#" class="dropdown-item" @click.prevent='model.type = "Customer"'>Customer</a>
                  <a href="#" class="dropdown-item" @click.prevent='model.type = "Contact"'>Contact</a>
                  <a href="#" class="dropdown-item" @click.prevent='model.type = "Partner"'>Partner</a>
                  <a href="#" class="dropdown-item" @click.prevent='model.type = "Competition"'>Competition</a>
                  <a href="#" class="dropdown-item" @click.prevent='model.type = "Potencial"'>Potencial Customer</a>
                  <a href="#" class="dropdown-item" @click.prevent='model.type = "Others"'>Others</a>
                </ul>
              </drop-down>
            </div>
          </div>

          <h6 class='text-left mb-2 mt-3'>Address</h6>
          <div class="row">
            <div class="col-md-4 pr-md-1 text-left">
              <base-input label="Address" placeholder="Address" v-model="model.address">
              </base-input>
            </div>
            <div class="col-md-3 px-md-1 text-left">
              <base-input label="City" v-model="model.city" placeholder="City">
              </base-input>
            </div>
            <div class="col-md-3 px-md-1 text-left">
              <base-input label="Country" v-model="model.country" placeholder="Country">
              </base-input>
            </div>
            <div class="col-md-2 pl-md-1 text-left">
              <base-input label="Postal Code" placeholder="ZIP Code" v-model="model.zip">
              </base-input>
            </div>
          </div>

          <h6 class='text-left mb-2 mt-3'>Contact</h6>
          <div class="row">
            <div class="col-md-6 pr-md-1 text-left">
              <base-input label="Contact Name" v-model="model.name" type="text" placeholder="Contact Name">
              </base-input>
            </div>
            <div class="col-md-6 pl-md-1 text-left">
              <base-input label="Position" v-model="model.position" type="text" placeholder="Position">
              </base-input>
            </div>
            <div class="col-md-4 pr-md-1 text-left">
              <base-input label="Email address" v-model="model.email" type="email" placeholder="mike@email.com">
              </base-input>
            </div>
            <div class="col-md-4 px-md-1 text-left">
              <base-input label="URL" v-model="model.url" type="url" placeholder="http://example.com">
              </base-input>
            </div>
            <div class="col-md-4 pl-md-1 text-left">
              <base-input label="Phone" v-model="model.phone" type="phone" placeholder="666-666-666">
              </base-input>
            </div>
          </div>

          <h6 class='text-left mb-2 mt-3'>Invoices Personalization</h6>
          <div class="row">
            <div class="col-md-6 pr-md-1 text-left">
              <base-input label="NIF / CIF" v-model="model.nif" placeholder="NIF / CIF">
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

          <div class='row text-right mt-4 col-12 mb-4'>
            <base-button v-if='!model.id' type="light" fill class='float-right' @click='saveCustomer()'>Save</base-button>
            <base-button v-if='model.id' type="light" fill class='float-right' @click='saveCustomer()'>Update</base-button>
          </div>
      </template>
    </card>
  </div>
</template>

<script>
import { BreedingRhombusSpinner } from 'epic-spinners'
import { userSession } from '@/userSession'
import {
  Card,
  BaseInput
} from '@/components/index'
import BaseButton from '@/components/BaseButton'
// import BaseTable from '@/components/BaseTable'
import { uuid } from 'vue-uuid'

const tableColumns = ['Legal', 'Address', 'City / Country', 'Contact', 'Type', 'Edit', 'Delete']

// var COMPANY_FILE = 'company.json'
var CUSTOMERS_FILE = 'customers.json'

export default {
  components: {
    Card,
    BaseInput,
    BaseButton,
    // BaseTable,
    BreedingRhombusSpinner
  },
  data () {
    return {
      loadingPage: true,
      showPreview: false,
      tableData: [{}],
      newCustomer: false,
      table1: {
        title: 'Customers',
        columns: [...tableColumns],
        data: []
      },
      customers: [],
      invoicesList: [],
      invoices: [],
      model: {
        id: null,
        type: 'Customer Type',
        legal: '',
        name: '',
        position: '',
        url: '',
        address: '',
        city: '',
        country: '',
        zip: '',
        phone: '',
        email: '',
        vat: '',
        nif: '',
        discount: 0,
        comments: '',
        payment: ''
      }
    }
  },
  methods: {
    openNewCustomer () {
      this.clearCustomer()
      this.newCustomer = true
    },
    closeNewCustomer () {
      this.newCustomer = false
    },
    fetchData () {
      // Load Customers
      userSession.getFile(CUSTOMERS_FILE, this.$DECRYPT).then((customers) => {
        this.customersList = JSON.parse(customers || '[]')
        // this.customersList = ["a7ef2d0f-530c-4886-b188-2af2647826bf"]
        // userSession.putFile(CUSTOMERS_FILE, JSON.stringify(this.customersList))
        let i = 0

        for (i in this.customersList) {
          userSession.getFile(this.customersList[i] + '.json', this.$DECRYPT).then((customer) => {
            if (customer === null) {
              return false
            }

            customer = JSON.parse(customer)
            let searchCustomer = this.customersList.indexOf(customer.id)
            this.$set(this.customers, searchCustomer, customer)
          })
        }

        setTimeout(() => {
          this.table1.data = this.customers
          this.loadingPage = false
        }, 700)
      })
    },
    saveCustomer () {
      let isNew = false
      this.customer = this.model
      if (this.customer.id === null) {
        this.customer.id = uuid.v4()
        this.customersList.push(this.customer.id)
        userSession.putFile(CUSTOMERS_FILE, JSON.stringify(this.customersList), this.$ENCRYPT)
        isNew = true
      }

      let customerFile = this.customer.id + '.json'
      userSession.putFile(customerFile, JSON.stringify(this.customer), this.$ENCRYPT)

      if (isNew) {
        this.customers.push(this.customer)
        this.table1.data = this.customers
      }
      // this.clearInvoice();
      this.newCustomer = false

      this.$notify({
        message: 'Customer created successfully',
        icon: 'tim-icons icon-bell-55',
        horizontalAlign: 'center',
        verticalAlign: 'bottom',
        type: 'success',
        timeout: 1500
      })
    },
    showCustomer (id) {

    },
    editCustomer (id) {
      let searchCustomer = this.customersList.indexOf(id)
      if (searchCustomer === -1) {
        this.$notify({
          message: 'Something wrong happened',
          icon: 'tim-icons icon-bell-55',
          horizontalAlign: 'center',
          verticalAlign: 'bottom',
          type: 'danger',
          timeout: 1500
        })
        return false
      }

      this.customer = this.customers[searchCustomer]
      this.model = this.customer
      this.newCustomer = true
    },
    deleteCustomer (id) {
      let searchCustomer = this.customersList.indexOf(id)
      if (searchCustomer === -1) {
        this.$notify({
          message: 'Something wrong happened',
          icon: 'tim-icons icon-bell-55',
          horizontalAlign: 'center',
          verticalAlign: 'bottom',
          type: 'danger',
          timeout: 1500
        })
        return false
      }

      this.customersList.splice(searchCustomer, 1)
      this.customers.splice(searchCustomer, 1)

      userSession.deleteFile(id + '.json')
      userSession.putFile(CUSTOMERS_FILE, JSON.stringify(this.customersList), this.$ENCRYPT)
    },
    clearCustomer () {
      this.model = {
        id: null,
        name: '',
        legal: '',
        position: '',
        url: '',
        type: 'Customer Type',
        address: '',
        city: '',
        country: '',
        zip: '',
        phone: '',
        email: '',
        vat: '',
        nif: '',
        discount: 0,
        comments: '',
        payment: ''
      }
    }
  },
  async mounted () {
    this.i18n = this.$i18n
    this.fetchData()

    if (this.$route.query.newCustomer) {
      this.openNewCustomer()
    }
  }
}
</script>
<style>
  .table > thead > tr > th{
    padding: 10px 7px;
  }
  .content-main-card .card{
    height: 100%;
  }
  .btn-dropdown:hover{
    background-color: #fff !important;
    font-weight: 600;
    background-image: none !important;
  }
  .btn-dropdown:active{
    background-color: #fff !important;
    font-weight: 600;
    background-image: none !important;
  }
  .btn-dropdown:focus{
    background-color: #fff !important;
    font-weight: 600;
    background-image: none !important;
  }
  tbody tr:hover td{
    background-color: #f8f8f8;
  }
</style>

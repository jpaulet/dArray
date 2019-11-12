<template>
  <div class="content content-main-card">
    <card v-if='!newInvoice && !showPreview'>
        <template slot="header">
            <div class='row mb-4'>
                <div class="col-sm-6 text-left">
                  <button type="button" class="btn btn-light btn-sm px-5 text-white" fill="" @click="openNewInvoice">+ New Invoice</button>
                </div>
                <div class="col-sm-6 text-right" v-if='false'>
                    <div class="btn-group btn-group-toggle" data-toggle="buttons float-right">
                       <label v-for="(option, index) in invoiceOptions"
                              :key="option"
                              class="btn btn-success btn-sm btn-simple"
                              :class="{active:activeIndex === index}"
                              :id="index">
                          <input type="radio"
                                @click="initBigChart(index)"
                                name="options" autocomplete="off"
                                :checked="activeIndex === index">
                          {{ option }}
                       </label>
                    </div>
                </div>
            </div>
        </template>

        <div v-if='table1.data.length'>
            <h6 class="title d-inline text-left float-left">Invoices ({{table1.data.length}})</h6>
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
                <base-table :data="table1.data" :columns="table1.columns" thead-classes="text-primary">
                    <template slot-scope="{row}">
                        <td style='display:none;'>
                            <base-checkbox v-model="row.done"></base-checkbox>
                        </td>
                        <td class="text-left">
                            <p class="title">{{row.name}}</p>
                        </td>
                        <td class="text-left">
                            <p class="text-muted">{{row.client.legal}}</p>
                        </td>
                        <td class="text-left">
                            <p class="text-muted">{{row.date}}</p>
                        </td>
                        <td class="text-left">
                            <p class="text-muted">{{row.total | currency}} €</p>
                        </td>
                        <td class="text-left">
                            <p class="text-muted">
                              <drop-down tag="div">
                                <span aria-label="Invoice Status" data-toggle="dropdown" class="dropdown-toggle-permanent badge" :class="{ 'badge-success' : (row.status === 'Paid'), 'badge-warning' : (row.status === 'Pending'), 'badge-danger' : (row.status === 'Not paid'), 'badge-light' : (row.status === 'Overdue'), 'badge-ingo' : (row.status === 'Void'), 'badge-secondary' : (row.status === 'Draft') }" style='font-size:12px;margin-bottom:3px;width:100px;'>
                                  {{row.status}}
                                  <!-- Do not remove, the icon has a ::after property with a dropdown arrow -->
                                  <i class="tim-icons icon-settings-gear-63" style='display:none;'></i>
                                </span>
                                <ul class="dropdown-menu dropdown-menu-left">
                                  <a href="#" class="dropdown-item mt-0" @click='changeStatus("Paid",row.id)'>
                                    <span class='badge badge-success' style='font-size:13px;width:100%;'>Paid</span>
                                  </a>
                                  <a href="#" class="dropdown-item mt-0" @click='changeStatus("Pending",row.id)'>
                                    <span class='badge badge-warning' style='font-size:13px;width:100%;'>Pending</span>
                                  </a>
                                  <a href="#" class="dropdown-item mt-0" @click='changeStatus("Not paid",row.id)'>
                                    <span class='badge badge-danger' style='font-size:13px;width:100%;'>Not paid</span>
                                  </a>
                                  <a href="#" class="dropdown-item mt-0" @click='changeStatus("Overdue",row.id)'>
                                    <span class='badge badge-light' style='font-size:13px;width:100%;'>Overdue</span>
                                  </a>
                                  <a href="#" class="dropdown-item mt-0" @click='changeStatus("Void",row.id)'>
                                    <span class='badge badge-info' style='font-size:13px;width:100%;'>Void</span>
                                  </a>
                                  <a href="#" class="dropdown-item mt-0" @click='changeStatus("Draft",row.id)'>
                                    <span class='badge badge-secondary' style='font-size:13px;width:100%;'>Draft</span>
                                  </a>
                                </ul>
                              </drop-down>
                            </p>
                        </td>
                        <td class="td-actions text-center" style='width:50px;'>
                            <base-button type="link" artia-label="view button" @click='showInvoice(row.id)'>
                              <i class="tim-icons icon-zoom-split"></i>
                            </base-button>
                        </td>
                        <td class="td-actions text-center" style='width:50px;'>
                            <base-button type="link" artia-label="edit button" @click='editInvoice(row.id)'>
                              <i class="tim-icons icon-pencil"></i>
                            </base-button>
                        </td>
                    </template>
                </base-table>
            </div>
        </div>

        <div v-if='!table1.data.length' class='py-4 text-center my-4'>
            <p>No invoices yet. </p>
            <img src='@/assets/img/invoice.png' class='mt-3 mb-5' height='200' />
        </div>
    </card>

    <card v-if='newInvoice && !showPreview' style='background: linear-gradient(90deg, rgba(231,236,250,1) 0%, rgba(231,236,250,1) 33.5%, rgba(202,215,251,1) 33.6%, rgba(255,255,255,1) 33.5%, rgba(255,255,255,1) 100%);min-width: 850px;'>
        <template slot="header">
            <div class='row'>
                <h6 class='col-8'><a href='' @click.prevent='closeNewInvoice'><i class="tim-icons icon-minimal-left text-light mr-5 pr-5"></i></a> New Invoice</h6>
                <a class='col-4 float-right text-right' href='' @click.prevent='closeNewInvoice'><i class="tim-icons icon-simple-remove text-dark mr-3"></i></a>
            </div>
        </template>

        <div class='row mb-3 mt-3 px-4 pl-0'>

        <!-- INVOICE CONFIGURATOR -->
            <div class='col-4 ml-0 pl-0 pr-4' style='min-width: 250px;'>
                <h4 style='display:none;' class="card-title text-left"><i class="tim-icons icon-bell-55 text-primary "></i> Configure Invoice </h4>

                <div class='row text-left mt-0'>
                    <label class='ml-3' style='vertical-align:middle;line-height:40px;width:50px;'> Title </label>
                    <input class='form-control ml-0' type='text' v-model='invoice.name' name='invoice' style='min-width: 90px;max-width:60%;' placeholder="Invoice #" />
                </div>
                <div class='text-left mt-4'>
                    <h6 class='float-left' style='line-height:22px;vertical-align:middle;height:22px;'>
                        Customer
                        <span class="badge mr-3 badge-outline-secondary" data-toggle="tooltip" data-placement="top" title="You can select a existing customer (with custom Payment options, Discounts, Tax, etc.) or create a new one in `Customers` page" style='cursor:pointer;'>?</span>
                    </h6>
                    <drop-down tag="div" class='float-right text-right mr-5'>
                      <button aria-label="Settings menu" data-toggle="dropdown" class="dropdown-toggle btn-rotate btn btn-link btn-icon">
                        <i class="tim-icons icon-single-02"></i>
                      </button>
                      <ul class="dropdown-menu dropdown-menu-right">
                        <a v-for='customer in customers' v-bind:key='customer.id' href="" class="dropdown-item" @click.prevent='selectCustomer(customer.id)'>{{customer.legal}}</a>
                      </ul>
                    </drop-down>
                    <input type='text' class='form-control col-10 ml-1' v-model='invoice.client.legal' placeholder="Title" />
                    <input type='text' class='form-control col-10 ml-1 mt-1' v-model='invoice.client.address' placeholder="Address" />
                    <input type='text' class='form-control col-10 ml-1 mt-1' v-model='invoice.client.city' placeholder="City" />
                    <input type='text' class='form-control col-10 ml-1 mt-1' v-model='invoice.client.country' placeholder="Country" />
                    <input type='text' class='form-control col-10 ml-1 mt-1' v-model='invoice.client.nif' placeholder="Tax Nº" />
                    <input type='text' class='form-control col-10 ml-1 mt-1' v-model='invoice.client.email' placeholder="E-mail" />
                    <input type='text' class='form-control col-10 ml-1 mt-1' v-model='invoice.client.phone' placeholder="Phone" />
                </div>

                <div class='row text-left mt-4'>
                    <label class='ml-3' style='vertical-align:middle;line-height:40px;width:70px;'>VAT (%)</label><input class='form-control ml-4' type='number' v-model='invoice.tax' name='vat' min='0' style='width:100px;' />
                </div>

                <div class='row text-left mt-1'>
                    <label class='ml-3' style='vertical-align:middle;line-height:40px;width:70px;'>Discount</label><input class='form-control ml-4' type='number' v-model='invoice.discount' min='0' name='discount' style='width:100px;' />
                </div>

                <div class='text-left row mt-4 ml-0'>
                    <h6>Comments/Notes</h6>
                    <textarea class='form-control ml-1 px-2 col-10' v-model="invoice.comments" placeholder="Introduce any comment / note" style='border:1px solid rgba(29, 37, 59, 0.25);border-radius:6px;'></textarea>
                </div>

                <div class='text-left row mt-4 ml-0'>
                    <h6>Payment Method</h6>
                    <textarea class='form-control ml-1 px-2 col-10' v-model="invoice.payment" placeholder="Payment info" style='border:1px solid rgba(29, 37, 59, 0.25);border-radius:6px;'></textarea>
                </div>
            </div>
        <!-- END INVOICE CONFIGURATOR -->

        <!-- INVOICE PREVIEW -->
            <div class="invoice-box col-8 card pt-0" style='font-size:13px;'>
              <table cellpadding="0" cellspacing="0">
                <tr class="top">
                  <td colspan="4">
                    <table class='mb-3'>
                      <tr>
                        <td class="title mb-0 pb-0">
                          <img :src="imageSrc" style="max-height:120px;margin-top:-20px;">
                        </td>

                        <td>
                          <strong>Invoice #: {{invoice.name}}</strong><br>
                          <label style='line-height:40px;vertical-align:middle;'>Created</label>
                          <input type="date" class="form-control" style="border: 0px none; width: 120px; text-align: right; float: right; cursor: pointer;padding-right:0px;margin-right:-40px;" v-model='invoice.date'><br>
                          <label style='line-height:20px;vertical-align:middle;'>Due</label>
                          <input type="date" class="form-control" style="border: 0px none; width: 120px; text-align: right; float: right; cursor: pointer;padding-right:0px;margin-right:-40px;margin-top:-10px;" v-model='invoice.due_date'>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr class="information">
                  <td colspan="4">
                    <table class='mb-3'>
                      <tr>
                        <td style='padding-bottom:10px;'>
                            <h6>Customer Details:</h6>
                            <span class='ml-2'>{{invoice.client.legal}}</span><br>
                            <span class='ml-2'>{{invoice.client.address}}</span><br>
                            <span class='ml-2'>{{invoice.client.city}}</span> / <span class='ml-2'>{{invoice.client.country}}</span><br>
                            <span v-if='invoice.client.nif' class='ml-2'>{{invoice.client.nif}}<br> </span>
                            <span v-if='invoice.client.email' class='ml-2'>{{invoice.client.email}}<br></span>
                            <span v-if='invoice.client.phone' class='ml-2'>{{invoice.client.phone}}</span>
                        </td>

                        <td style='padding-bottom:10px;'>
                            <h6>Company Details:</h6>
                            <span class='mr-2'>{{company.company}}<br> </span>
                            <span class='mr-2'>{{company.address}}<br> </span>
                            <span class='mr-2'>{{company.city}} - {{company.country}}<br> </span>
                            <span class='mr-2'>{{company.email}}</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr class="heading" style='font-size:12px;'>
                  <td style='background-color: #fff;'>Item</td>
                  <td style='background-color: #fff;text-align:right;'>Unit Cost</td>
                  <td style='background-color: #fff;text-align:right;'>Quantity</td>
                  <td style='background-color: #fff;'>Price</td>
                </tr>

                <tr class="item" v-for="(item,index) in invoice.items" v-bind:key='index'>
                  <td style='line-height: 40px;'>
                    <input class='form-control' v-model="item.description" />
                  </td>
                  <td style='line-height: 40px;text-align:right;'>
                    <input class='form-control float-right ml-1 text-center' type="number" v-model="item.price" style='width:80px;' />
                  </td>
                  <td style='line-height: 40px;'>
                    <input class='form-control float-right text-center' type="number" v-model="item.quantity" />
                  </td>
                  <td style='line-height: 40px;min-width:90px;'>
                    ${{ item.price * item.quantity | currency }}
                  </td>
                </tr>

                <tr>
                  <td colspan="4">
                    <button class="btn btn-sm btn-light btn-add-row" @click="addRow">Add row</button>
                  </td>
                </tr>

                <tr class="subtotal">
                  <td colspan="3" class='text-right pr-3'>Subtotal:</td>
                  <td>${{ subtotal | currency }}</td>
                </tr>

                <tr class="vat">
                  <td colspan="3" class='text-right pr-3'>VAT <span style='font-size:12px;'>({{invoice.tax}} %)</span>:</td>
                  <td>${{ vat | currency }}</td>
                </tr>

                <tr class="discount" v-if='invoice.discount !== 0 && invoice.discount !== "0"'>
                  <td colspan="3" class='text-right pr-3'>Discount:</td>
                  <td>$ -{{invoice.discount}}</td>
                </tr>

                <tr class="total">
                  <td colspan="3" class='text-right pr-3'><strong>Total:</strong></td>
                  <td>${{ total | currency }}</td>
                </tr>
            </table>

            <div class='row mt-5'>
                <div class='col-6 text-left mb-5' v-if='invoice.comments'>
                    <h6>Comments</h6>
                    <div style="white-space: pre-line;" class='ml-2'>{{invoice.comments}}</div>
                </div>
                <div class='col-6 text-left mb-5' v-if='invoice.payment'>
                    <h6>Payment Method</h6>
                    <div style="white-space: pre-line;" class='ml-2'>{{invoice.payment}}</div>
                </div>
            </div>
          </div>
          <!-- END INVOICE PREVIEW -->
        </div>

        <div class='row px-2'>
            <div class='col-1 text-left mt-3'>
                <button class='btn btn-danger btn-sm ml-1' @click='clearInvoice' style='opacity:0.75;'>Clear</button>
            </div>
            <div class='col-3 text-right mt-3 pr-3'>
              <button class='btn btn-light btn-sm mr-5' style='opacity:0.8;'>Save Customer</button>
            </div>

            <div class='col-8 text-right mt-3'>
                <button class='btn btn-light btn-sm' style='opacity:0.9;' @click='showInvoice(invoice.id)'>Preview</button>
                <button class='btn btn-secondary btn-sm px-5' @click='saveInvoice'>Save</button>
            </div>
        </div>
    </card>

    <card id='previewInvoice' v-if='showPreview'>
        <!-- INVOICE PREVIEW -->
        <template slot="header">
          <div class='row'>
            <h6 class='col-8'>
              <a href='' @click.prevent='showPreview = false'><i class="tim-icons icon-minimal-left text-light mr-3"></i></a> Preview Invoice
            </h6>
            <a class='col-4 float-right text-right' href='' @click.prevent='showPreview = false'>
              <i class="tim-icons icon-simple-remove text-dark mr-3"></i>
            </a>
          </div>
        </template>
        <div class="invoice-box col-8 col-offset-2 card" style='font-size:13px;'>
          <table cellpadding="0" cellspacing="0">
            <tr class="top">
              <td colspan="4">
                <table class='mb-3'>
                  <tr>
                    <td class="title mb-0 pb-0">
                      <img id='imgLogo' :src="imageSrc" style="max-height:120px;margin-top:-20px;" />
                      <div id='imgLogoExample'>

                      </div>
                    </td>

                    <td>
                      <strong style='font-size:14px;width:100%;text-align: right;'>Invoice #: {{invoice.name}}</strong><br>
                      <label>Created</label>
                      <div style="border: 0px none; width: 90px; text-align: right; float: right; cursor: pointer;padding-right:0px;">{{invoice.date}}</div><br>
                      <label style='line-height:20px;vertical-align:middle;'>Due</label>
                      <div style="border: 0px none; width: 90px; text-align: right; float: right; cursor: pointer;padding-right:0px;"> {{invoice.due_date}}</div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr class="information">
              <td colspan="4">
                <table class='mb-3'>
                  <tr>
                    <td style='padding-bottom:10px;'>
                        <h6>Customer Details:</h6>
                        <span class='ml-2'>{{invoice.client.legal}}</span><br>
                        <span class='ml-2'>{{invoice.client.address}}</span><br>
                        <span class='ml-2'>{{invoice.client.country}}</span><br>
                        <span v-if='invoice.client.tax_number' class='ml-2'>{{invoice.client.tax_number}}<br> </span>
                        <span v-if='invoice.client.email' class='ml-2'>{{invoice.client.email}}<br></span>
                        <span v-if='invoice.client.phone' class='ml-2'>{{invoice.client.phone}}</span>
                    </td>

                    <td style='padding-bottom:10px;'>
                        <h6>Company Details:</h6>
                        <span class='mr-2'>{{company.company}}<br> </span>
                        <span class='mr-2'>{{company.address}}<br> </span>
                        <span class='mr-2'>{{company.city}} - {{company.country}}<br> </span>
                        <span class='mr-2'>{{company.email}}</span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr class="heading" style='font-size:12px;'>
              <td style='background-color: #fff;'>Item</td>
              <td style='background-color: #fff;text-align:right;padding-right:20px;'>Unit Cost</td>
              <td style='background-color: #fff;text-align:right;padding-right:12px;'>Quantity</td>
              <td style='background-color: #fff;'>Price</td>
            </tr>

            <tr class="item" v-for="(item,index) in invoice.items" v-bind:key='index'>
              <td style='line-height: 40px;'>
                {{ item.description }}
              </td>
              <td style='line-height: 40px;text-align:right;'>
                {{ item.price }}
              </td>
              <td style='line-height: 40px;'>
                {{ item.quantity }}
              </td>
              <td style='line-height: 40px;min-width:90px;'>
                ${{ item.price * item.quantity | currency }}
              </td>
            </tr>

            <tr class="subtotal">
              <td colspan="3" class='text-right pr-3'>Subtotal:</td>
              <td>${{ subtotal | currency }}</td>
            </tr>

            <tr class="vat">
              <td colspan="3" class='text-right pr-3'>VAT <span style='font-size:12px;'>({{invoice.tax}} %)</span>:</td>
              <td>${{ vat | currency }}</td>
            </tr>

            <tr class="discount" v-if='invoice.discount !== 0 && invoice.discount !== "0"'>
              <td colspan="3" class='text-right pr-3'>Discount:</td>
              <td>$ -{{invoice.discount}}</td>
            </tr>

            <tr class="total">
              <td colspan="3" class='text-right pr-3'><strong>Total:</strong></td>
              <td>${{ total | currency }}</td>
            </tr>
        </table>

        <div class='row mt-5'>
            <div class='col-6 text-left mb-5' v-if='invoice.comments'>
                <h6>Comments</h6>
                <div style="white-space: pre-line;" class='ml-2'>{{invoice.comments}}</div>
            </div>
            <div class='col-6 text-left mb-5' v-if='invoice.payment'>
                <h6>Payment Method</h6>
                <div style="white-space: pre-line;" class='ml-2'>{{invoice.payment}}</div>
            </div>
        </div>
       </div>
       <!-- END INVOICE PREVIEW -->
    </card>
  </div>
</template>

<script>
import { userSession } from '@/userSession'
import {
  Card
} from '@/components/index'
import BaseButton from '@/components/BaseButton'
import BaseTable from '@/components/BaseTable'
import BaseCheckbox from '@/components/BaseCheckbox'
import { uuid } from 'vue-uuid'

const tableColumns = ['Name', 'Client', 'Date', 'Total', 'Status', 'View', 'Edit']

var STORAGE_FILE = 'invoices.json'
var COMPANY_FILE = 'company.json'
var CUSTOMERS_FILE = 'customers.json'

export default {
  components: {
    Card,
    BaseButton,
    BaseTable,
    BaseCheckbox
  },
  data () {
    return {
      showPreview: false,
      tableData: [{}],
      newInvoice: false,
      invoiceOptions: [
        'This Month',
        'Today',
        'All'
      ],
      activeIndex: 0,
      table1: {
        title: 'Invoices',
        columns: [...tableColumns],
        data: []
      },
      invoice: {
        id: null,
        number: '',
        date: new Date().toISOString().split('T')[0],
        year: 2019,
        due_date: new Date().toISOString().split('T')[0],
        company: {},
        payment: null,
        logo: null,
        client: {},
        product: null,
        comments: '',
        status: 'Pending',
        tax: 0,
        currency: '$',
        discount: 0,
        items: [
          { description: '', quantity: 1, price: 0 }
        ],
        subtotal: 0,
        total: 0,
        vat: 0
      },
      company: {},
      customers: [],
      customersList: [],
      invoicesList: [],
      invoices: [],
      imageSrc: null
    }
  },
  methods: {
    loadCompanyLogo () {
      userSession.getFile(this.company.logo).then((logoImage) => {
        this.imageSrc = logoImage
      })
    },
    openNewInvoice () {
      this.clearInvoice()
      this.newInvoice = true
      this.invoice.payment = this.company.payment
      this.invoice.comments = this.company.comments
      this.invoice.tax = this.company.vat

      this.loadCompanyLogo()
    },
    closeNewInvoice () {
      this.newInvoice = false
    },
    addRow () {
      this.invoice.items.push({ description: '', quantity: 1, price: 0 })
    },
    clearInvoice () {
      this.invoice = {
        id: null,
        name: '',
        date: new Date().toISOString().split('T')[0],
        year: 2019,
        due_date: new Date().toISOString().split('T')[0],
        payment: null,
        logo: null,
        client: {},
        product: null,
        comments: '',
        status: 'Pending',
        tax: 0,
        currency: '$',
        discount: 0,
        items: [
          { description: '', quantity: 1, price: 0 }
        ],
        subtotal: 0,
        total: 0,
        vat: 0
      }
    },
    initBigChart (index) {
      this.activeIndex = index
    },
    selectCustomer (index) {
      let searchInvoice = this.customersList.indexOf(index)
      if (searchInvoice === -1) {
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

      this.invoice.client = this.customers[searchInvoice]
      if (!this.invoice.payment) {
        this.invoice.payment = this.company.payment
      }
      if (!this.invoice.comments) {
        this.invoice.comments = this.company.comments
      }
    },
    fetchData () {
      // Load Company data
      userSession.getFile(COMPANY_FILE).then((company) => {
        this.company = JSON.parse(company || '{}')

        this.invoice.payment = this.company.payment
        this.invoice.comments = this.company.comments
        this.invoice.tax = this.company.vat
        this.invoice.logo = this.company.logo
      })

      // Load Invoices data
      userSession.getFile(STORAGE_FILE).then((invoices) => {
        this.invoicesList = JSON.parse(invoices || '[]')
        let i = 0

        for (i in this.invoicesList) {
          userSession.getFile(this.invoicesList[i] + '.json').then((invoice) => {
            if (invoice === null) {
              return false
            }
            this.invoices.unshift(JSON.parse(invoice))
            this.table1.data = this.invoices
          })
        }
      })

      // Load Customers
      userSession.getFile(CUSTOMERS_FILE).then((customers) => {
        this.customersList = JSON.parse(customers || '[]')
        let i = 0

        for (i in this.customersList) {
          userSession.getFile(this.customersList[i] + '.json').then((customer) => {
            this.customers.push(JSON.parse(customer))
          })
        }
      })
    },
    isFilled () {
      if (!this.invoice.name || !this.invoice.client.legal || this.total === 0) {
        this.$notify({
          message: 'You should fill the invoice first',
          icon: 'tim-icons icon-bell-55',
          horizontalAlign: 'center',
          verticalAlign: 'bottom',
          type: 'danger',
          timeout: 1500
        })
        return false
      }
      return true
    },
    saveInvoice () {
      let canSave = this.isFilled()
      if (!canSave) {
        return false
      }
      let isNew = false
      if (this.invoice.id === null) {
        this.invoice.id = uuid.v4()
        if (this.invoicesList === null) {
          this.invoicesList = []
          this.invoicesList.push(this.invoice.id)
        } else {
          this.invoicesList.push(this.invoice.id)
        }
        userSession.putFile(STORAGE_FILE, JSON.stringify(this.invoicesList))
        isNew = true
      }

      let invoiceFile = this.invoice.id + '.json'
      this.invoice.total = this.total
      this.invoice.vat = this.vat
      this.invoice.subtotal = this.subtotal
      userSession.putFile(invoiceFile, JSON.stringify(this.invoice))

      if (isNew) {
        this.invoices.push(this.invoice)
        this.table1.data = this.invoices
      }
      this.clearInvoice()
      this.newInvoice = false

      this.$notify({
        message: 'Invoice created successfully',
        icon: 'tim-icons icon-bell-55',
        horizontalAlign: 'center',
        verticalAlign: 'bottom',
        type: 'success',
        timeout: 1500
      })
    },
    editInvoice (id) {
      let searchInvoice = this.invoicesList.indexOf(id)
      if (searchInvoice === -1) {
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

      this.invoice = this.invoices[searchInvoice]
      this.newInvoice = true
    },
    showInvoice (id) {
      if (!this.newInvoice) {
        let searchInvoice = this.invoicesList.indexOf(id)
        if (searchInvoice === -1) {
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

        this.invoice = this.invoices[searchInvoice]
      }
      let canSave = this.isFilled()
      if (!canSave) {
        return false
      }
      this.showPreview = true
    },
    changeStatus (status, id) {
      let searchInvoice = this.invoicesList.indexOf(id)
      if (searchInvoice === -1) {
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

      this.invoice = this.invoices[searchInvoice]
      this.invoice.status = status
      let invoiceFile = this.invoice.id + '.json'
      userSession.putFile(invoiceFile, JSON.stringify(this.invoice))
    }
  },
  filters: {
    currency (value) {
      return value.toFixed(2)
    }
  },
  computed: {
    total () {
      return this.subtotal + this.vat - this.invoice.discount
    },
    vat () {
      return this.subtotal * this.invoice.tax / 100
    },
    subtotal () {
      return this.invoice.items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      )
    }
  },
  async mounted () {
    this.i18n = this.$i18n
    this.initBigChart(2)
    this.fetchData()
  }
}
</script>

<style scoped>
  .content-main-card .card{
    min-height: 560px;
  }
  .table > thead > tr > th{
      text-align: center !important;
  }

  tbody tr:hover td{
      background-color: #f8f8f8;
  }

  .invoice-box {
    max-width: 800px;
    margin: auto;
    padding: 30px;
    /* border: 1px solid #eee; */
    -moz-box-shadow: none;
    box-shadow: none !important;
    font-size: 16px;
    line-height: 24px;
    font-family: "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif;
    color: #555;
    min-height: 765px;
  }

  .invoice-box table {
    width: 100%;
    line-height: inherit;
    text-align: left;
  }

  .invoice-box table td {
    padding: 5px;
    vertical-align: top;
  }

  .invoice-box table tr td:nth-child(n + 2) {
    text-align: right;
  }

  .invoice-box table tr.top table td {
    padding-bottom: 20px;
  }

  .invoice-box table tr.top table td.title {
    font-size: 45px;
    line-height: 45px;
    color: #333;
  }

  .invoice-box table tr.information table td {
    padding-bottom: 40px;
  }

  .invoice-box table tr.heading td {
    background: #eee;
    border-bottom: 1px solid #ddd;
    font-weight: bold;
  }

  .invoice-box table tr.details td {
    padding-bottom: 20px;
  }

  .invoice-box table tr.item td {
    border-bottom: 1px solid #eee;
  }

  .invoice-box table tr.item.last td {
    border-bottom: none;
  }

  .invoice-box table tr.item input {
    padding-left: 5px;
  }

  .invoice-box table tr.item td:first-child input {
    margin-left: -5px;
    width: 100%;
  }

  .invoice-box table tr.total td:nth-child(2) {
    border-top: 2px solid #eee;
    font-weight: bold;
  }

  .invoice-box input[type="number"] {
    width: 60px;
  }

  @media only screen and (max-width: 600px) {
    .invoice-box table tr.top table td {
      width: 100%;
      display: block;
      text-align: center;
    }

    .invoice-box table tr.information table td {
      width: 100%;
      display: block;
      text-align: center;
    }
  }

  /** RTL **/
  .rtl {
    direction: rtl;
    font-family: Tahoma, "Helvetica Neue", "Helvetica", Helvetica, Arial,
      sans-serif;
  }

  .rtl table {
    text-align: right;
  }

  .rtl table tr td:nth-child(2) {
    text-align: left;
  }

  .btn-success.btn-simple.active:hover, .btn-success.btn-simple.active:focus, .btn-success.btn-simple.active:active, .btn-success.btn-simple.active:not(:disabled):not(.disabled):active{
      background-color: #000 !important;
      background-image: none;
  }

  .form-control{
      background-color: #fff;
      border-color: rgba(29, 37, 59, 0.25);
  }

  .badge-success {
    background-color: #c2e8ce !important;
  }

  .badge-warning {
    background-color: #f6cd90 !important;
  }

  .badge-danger{
    background-color: #f0b7a4 !important;
  }

  .badge-info{
    background-color: #deecff !important;
  }
</style>

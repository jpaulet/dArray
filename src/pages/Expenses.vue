<template>
  <div class="content content-main-card">
    <card v-if='!newExpense && !showPreview'>
        <template slot="header">
            <div class='row mb-4'>
                <div class="col-sm-6 text-left">
                  <button type="button" class="btn btn-light btn-sm px-5 text-white" fill="" @click="openNewExpense">+ New Expense</button>
                </div>
                <div class="col-sm-6 text-right" v-if='table1.data.length' style='display:none;'>
                    <div class="btn-group btn-group-toggle" data-toggle="buttons float-right">
                       <label v-for="(option, index) in expenseOptions"
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
            <h6 class="title d-inline text-left float-left">Expenses ({{table1.data.length}})</h6>
            <drop-down tag="div" class='float-right text-right'>
              <button aria-label="Settings menu" data-toggle="dropdown" class="dropdown-toggle btn-rotate btn btn-link btn-icon">
                <i class="tim-icons icon-settings-gear-63"></i>
              </button>
              <ul class="dropdown-menu dropdown-menu-right">
                <a href="#" class="dropdown-item">Archive <i class="tim-icons icon-settings-gear-63" tooltip='Save to a folder & remove from the list'></i></a>
                <a href="#" class="dropdown-item">Duplicate</a>
                <a href="#" class="dropdown-item">Delete</a>
              </ul>
            </drop-down>

            <div class="table-responsive text-left mb-3" style='overflow-x:inherit;'>
                <base-table :data="table1.data" :columns="table1.columns" thead-classes="text-primary">
                    <template slot-scope="{row}">
                        <td>
                            <base-checkbox v-model="row.done"></base-checkbox>
                        </td>
                        <td class="text-left">
                            <p class="title">{{row.title}}</p>
                        </td>
                        <td class="text-left">
                            <p class="text-muted">{{row.category}}</p>
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
                                <span aria-label="Expense Status" data-toggle="dropdown" class="dropdown-toggle-permanent badge" :class="{ 'badge-success' : (row.status == 'Paid'), 'badge-warning' : (row.status == 'Pending'), 'badge-danger' : (row.status == 'Not paid') }" style='font-size:12px;margin-bottom:3px;width:100px;'>
                                  {{row.status}}
                                  <!-- Do not remove, the icon has a ::after property with a dropdown arrow -->
                                  <i class="tim-icons icon-settings-gear-63" style='display:none;'></i>
                                </span>
                                <ul class="dropdown-menu dropdown-menu-left">
                                  <a href="#" class="dropdown-item" @click='changeStatus("Paid",row.id)'>
                                    <span class='badge badge-success text-center' style='font-size:13px;width:120px;'>Paid</span>
                                  </a>
                                  <a href="#" class="dropdown-item" @click='changeStatus("Pending",row.id)'>
                                    <span class='badge badge-warning text-center' style='font-size:13px;width:120px;'>Pending</span>
                                  </a>
                                  <a href="#" class="dropdown-item" @click='changeStatus("Not paid",row.id)'>
                                    <span class='badge badge-danger text-center' style='font-size:13px;width:120px;'>Not paid</span>
                                  </a>
                                </ul>
                              </drop-down>
                            </p>
                        </td>
                        <td class="td-actions text-center" style='width:50px;'>
                            <base-button type="link" artia-label="view button" @click='showExpense(row.id)'>
                              <i class="tim-icons icon-zoom-split"></i>
                            </base-button>
                        </td>
                        <td class="td-actions text-center" style='width:50px;'>
                            <base-button type="link" artia-label="edit button" @click='editExpense(row.id)'>
                              <i class="tim-icons icon-pencil"></i>
                            </base-button>
                        </td>
                    </template>
                </base-table>
            </div>
        </div>

        <div v-if='!table1.data.length' class='py-4 text-center my-4'>
            <p>No expenses yet. </p>
            <img src='@/assets/img/expense.jpg' class='mt-3 mb-5' height='150' />
        </div>
    </card>

    <card v-if='newExpense && !showPreview' style='background: linear-gradient(90deg, rgba(231,236,250,1) 0%, rgba(231,236,250,1) 33.5%, rgba(202,215,251,1) 33.6%, rgba(255,255,255,1) 33.5%, rgba(255,255,255,1) 100%);min-width: 850px;'>
        <template slot="header">
            <div class='row'>
                <h6 class='col-8'><a href='' @click.prevent='closeNewExpense'><i class="tim-icons icon-minimal-left text-light mr-5 pr-4"></i></a> New Expense</h6>
                <a class='col-4 float-right text-right' href='' @click.prevent='closeNewExpense'><i class="tim-icons icon-simple-remove text-dark mr-3"></i></a>
            </div>
        </template>

        <div class='row mb-3 mt-3 px-4 pl-0'>

        <!-- INVOICE CONFIGURATOR -->
            <div class='col-4 ml-0 pl-0 pr-4' style='min-width: 250px;'>
                <h4 style='display:none;' class="card-title text-left"><i class="tim-icons icon-bell-55 text-primary "></i> Configure Expense </h4>

                <div class='row text-left'>
                    <label class='ml-3' style='vertical-align:middle;line-height:40px;width:70px;'> Title </label>
                    <input class='form-control ml-3 col-7' type='text' v-model='expense.title' name='expense' placeholder="Expense name" />
                </div>
                <div class='row text-left mt-2'>
                    <label class='ml-3' style='vertical-align:middle;line-height:40px;width:70px;'> Category </label>
                    <drop-down tag="li" class='form-control ml-3 col-7 float-right text-left'>
                      {{expense.category}}
                      <button aria-label="Settings menu" data-toggle="dropdown" class="dropdown-toggle btn-rotate btn btn-link btn-icon float-right">
                        <i class="tim-icons icon-single-02"></i>
                      </button>
                      <ul class="dropdown-menu dropdown-menu-right">
                        <template v-if="categories!=null" v-for="category in categories">
                            <a href="" class="dropdown-item" @click.prevent='expense.category = category.name'><strong>{{category.name}}</strong></a>
                            <template v-if='category.subItems' v-for="subcategory in category.subItems">
                                  <a href="" class="dropdown-item" @click.prevent='expense.category = subcategory.name' style='font-size:10px;'>{{subcategory.name}}</a>
                            </template>
                        </template>
                      </ul>
                    </drop-down>
                </div>

                <div class='row text-left mt-2'>
                  <label class='ml-3' style='vertical-align:middle;line-height:40px;width:70px;'>Created</label>
                  <input type="date" class="form-control ml-3 col-7 text-right" v-model='expense.date'><br>
                </div>         

                <div class='row text-left mt-2'>
                    <label class='ml-3' style='vertical-align:middle;line-height:40px;width:70px;'>VAT</label>
                    <input class='form-control ml-3 col-7 text-right' type='number' v-model='expense.tax' name='vat' min='0' />
                </div>

                <div class='row text-left mt-4 ml-0'>
                    <h6>Comments/Notes</h6>
                    <textarea class='form-control ml-1 px-2 col-10' v-model="expense.comments" placeholder="Introduce any comment / note" style='border:1px solid rgba(29, 37, 59, 0.25);border-radius:6px;'></textarea>
                </div>

                <div class='text-left row mt-4 ml-0'>
                    <h6>Payment Method</h6>
                    <textarea class='form-control ml-1 px-2 col-10' v-model="expense.payment" placeholder="Payment info" style='border:1px solid rgba(29, 37, 59, 0.25);border-radius:6px;'></textarea>
                </div>
            </div>
        <!-- END INVOICE CONFIGURATOR -->

        <!-- INVOICE PREVIEW -->
            <div class="expense-box col-8 card pt-0" style='font-size:13px;'>
              <table cellpadding="0" cellspacing="0" class='col-10' style='margin:0px auto;'>
                <tr> 
                  <td colspan='8'> 
                    <h6 class='text-center'>- Ticket -</h6> 
                  </td> 
                </tr>

                <tr> 
                  <td colspan="8" class='text-center'> 
                    <strong>Expense #: {{expense.title}}</strong>
                  </td>
                </tr>

                <tr>
                  <td colspan="8" class='text-center'>
                      <label><strong style='margin-right:10px;'>Date:</strong> {{expense.date}}</label>                      
                  </td>
                </tr>

                <tr><td><br /></td></tr>
            
                <tr class="heading" style='font-size:12px;'>
                  <td style='background-color: #fff;'>Item</td>
                  <td style='background-color: #fff;text-align:right;padding-right:20px;'>Unit Cost</td>
                  <td style='background-color: #fff;text-align:right;padding-right:12px;'>Quantity</td>
                  <td style='background-color: #fff;'>Price</td>
                </tr>

                <tr class="item" v-for="item in expense.items">
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
                  <td colspan="3" class='text-right pr-3'>VAT <span style='font-size:12px;'>({{expense.tax}} %)</span>:</td>
                  <td>${{ vat | currency }}</td>
                </tr>

                <tr class="total">
                  <td colspan="3" class='text-right pr-3'><strong>Total:</strong></td>
                  <td>${{ total | currency }}</td>
                </tr>
            </table>

            <div class='row col-10 mt-5' style='margin:0px auto;'>
                <div class='col-6 text-left mb-5' v-if='expense.comments'>
                    <h6>Comments</h6>
                    <div style="white-space: pre-line;" class='ml-2'>{{expense.comments}}</div>
                </div>
                <div class='col-6 text-left mb-5' v-if='expense.payment'>
                    <h6>Payment Method</h6>
                    <div style="white-space: pre-line;" class='ml-2'>{{expense.payment}}</div>
                </div>
            </div>
          </div>
          <!-- END INVOICE PREVIEW -->
        </div>

        <div class='row px-2'>
            <div class='col-4 text-left mt-3'>
                <button class='btn btn-danger btn-sm ml-1' @click='clearExpense' style='opacity:0.75;'>Clear</button>
            </div>

            <div class='col-8 text-right mt-3'>
                <button class='btn btn-light btn-sm' style='opacity:0.9;' @click='showExpense(expense.id)'>Preview</button>
                <button class='btn btn-secondary btn-sm px-5' @click='saveExpense'>Save</button>
            </div>
        </div>
    </card>

    <card v-if='showPreview'>
        <!-- INVOICE PREVIEW -->
        <template slot="header">
          <div class='row'>
            <h6 class='col-8'>
              <a href='' @click.prevent='showPreview = false'><i class="tim-icons icon-minimal-left text-light mr-3"></i></a> Preview Expense
            </h6>
            <a class='col-4 float-right text-right' href='' @click.prevent='showPreview = false'>
              <i class="tim-icons icon-simple-remove text-dark mr-3"></i>
            </a>
          </div>
        </template>
        <div class="expense-box col-8 col-offset-2 card" style='font-size:13px;margin:0px auto;'>
          <table cellpadding="0" cellspacing="0">
            <tr class="top">
              <td colspan="4">
                <table class='mb-3'>
                  <tr>
                    <td>
                      <strong>Expense #: {{expense.name}}</strong><br>
                      <label style='line-height:40px;vertical-align:middle;'>Created</label>
                      <div style="border: 0px none; width: 120px; text-align: right; float: right; cursor: pointer;padding-right:0px;margin-right:-20px;">{{expense.date}}</div><br>
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

            <tr class="item" v-for="item in expense.items">
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
              <td colspan="3" class='text-right pr-3'>VAT <span style='font-size:12px;'>({{expense.tax}} %)</span>:</td>
              <td>${{ vat | currency }}</td>
            </tr>

            <tr class="total">
              <td colspan="3" class='text-right pr-3'><strong>Total:</strong></td>
              <td>${{ total | currency }}</td>
            </tr>
        </table>

        <div class='row col-8 mt-5' style='margin:0px auto;'>
            <div class='col-6 text-left mb-5' v-if='expense.comments'>
                <h6>Comments</h6>
                <div style="white-space: pre-line;" class='ml-2'>{{expense.comments}}</div>
            </div>
            <div class='col-6 text-left mb-5' v-if='expense.payment'>
                <h6>Payment Method</h6>
                <div style="white-space: pre-line;" class='ml-2'>{{expense.payment}}</div>
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
import BaseAlert from '@/components/BaseAlert'
import NotificationTemplate from './Notifications/NotificationTemplate'
import { uuid } from 'vue-uuid'

const tableColumns = ['', 'Title', 'Category', 'Date', 'Total', 'Status', 'View', 'Edit']

var STORAGE_FILE = 'expenses.json'
var COMPANY_FILE = 'company.json'

export default {
  components: {
    Card,
    BaseButton,
    BaseTable,
    BaseCheckbox,
    BaseAlert
  },
  data () {
    return {
      showPreview: false,
      tableData: [{}],
      newExpense: false,
      expenseOptions: [
        'This Month',
        'Today',
        'All'
      ],
      activeIndex: 0,
      table1: {
        title: 'Expenses',
        columns: [...tableColumns],
        data: []
      },
      expense: {
        id: null,
        title: '',
        date: new Date().toISOString().split('T')[0],
        payment: null,
        comments: '',
        status: 'Pending',
        tax: 0,
        currency: '$',
        items: [
          { description: '', quantity: 1, price: 0 }
        ],
        subtotal: 0,
        total: 0,
        vat: 0
      },
      company: {},
      expenses_list: [],
      expenses: [],
      categories: [{
          name: 'Advertising'
        },
        {
          name: 'Car & Truck Expenses',
          subItems: [
              { name: 'Gas' },
              { name: 'Mileage' },
              { name: 'Repairs' },
              { name: 'Vehicle Insurance' },
              { name: 'Vehicle Licensing' }
          ]
        },
        {
          name: 'Contractors'
        },
        {
          name: 'Education and Training'
        },
        {
          name: 'Employee Benefits',
          subItems: [
              { name: 'Accident Insurance' },
              { name: 'Health Insurance' },
              { name: 'Life Insurance' }
          ]
        },
        {
          name: 'Meals & Entertainment',
          subItems: [
              { name: 'Entertainment' },
              { name: 'Restaurants/Dining' }
          ]
        },
        {
          name: 'Office Expenses & Postage',
          subItems: [
              { name: 'Hardware' },
              { name: 'Office Supplies' },
              { name: 'Packaging' },
              { name: 'Postage' },
              { name: 'Printing' },
              { name: 'Shipping & Couriers' },
              { name: 'Software' },
              { name: 'Stationery' }
          ]
        },
        {
          name: 'Other Expenses',
          subItems: [
              { name: 'Bank Fees' },
              { name: 'Business Insurance' },
              { name: 'Commissions' },
              { name: 'Depreciation' },
              { name: 'Interest - Mortgage' },
              { name: 'Interest - Other' },
              { name: 'Online Services' },
              { name: 'Reference Materials' },
              { name: 'Repairs & Maintenance' },
              { name: 'Subscriptions/Dues/Memberships' },
              { name: 'Taxes & Licenses' },
              { name: 'Wages' }
          ]
        },
        {
          name: 'Personal'
        },
        {
          name: 'Professional Services',
          subItems: [
              { name: 'Accounting' },
              { name: 'Legal Fees' }
          ]
        },
        {
          name: 'Rent or Lease',
          subItems: [
              { name: 'Equipment' },
              { name: 'Machinery' },
              { name: 'Office Space' },
              { name: 'Vehicles' }
          ]
        },
        {
          name: 'Supplies'
        },
        {
          name: 'Travel',
          subItems: [
              { name: 'Airfare' },
              { name: 'Hotel/Lodging/Accommodation' },
              { name: 'Taxi & Parking' }
          ]
        },
        {
          name: 'Utilities',
          subItems: [
              { name: 'Gas & Electrical' },
              { name: 'Phone' }
          ]
        }
      ]
    }
  },
  methods: {
    openNewExpense () {
      this.clearExpense()
      this.newExpense = true
    },
    closeNewExpense () {
      this.newExpense = false
    },
    addRow () {
      this.expense.items.push({ description: '', quantity: 1, price: 0 })
    },
    clearExpense () {
      this.expense = {
        id: null,
        title: '',
        date: new Date().toISOString().split('T')[0],
        payment: null,
        comments: '',
        status: 'Pending',
        tax: 0,
        currency: '$',
        items: [
          { description: '', quantity: 1, price: 0 }
        ],
        subtotal: 0,
        total: 0,
        vat: 0
      }
    },
    fetchData () {
      // Load Company data
      userSession.getFile(COMPANY_FILE).then((company) => {
        this.company = JSON.parse(company || '{}')
        this.expense.tax = this.company.vat
      })

      // Load Expenses data
      userSession.getFile(STORAGE_FILE).then((expenses) => {
        this.expenses_list = JSON.parse(expenses || '[]')
        let i = 0

        for (i in this.expenses_list) {
          userSession.getFile(this.expenses_list[i] + '.json').then((expense) => {
            if (expense === null) {
              return false
            }
            this.expenses.push(JSON.parse(expense))
            this.table1.data = this.expenses
          })
        }
      })
    },
    saveExpense () {
      let isNew = false
      if (this.expense.id === null) {
        this.expense.id = uuid.v4()
        this.expenses_list.push(this.expense.id)
        userSession.putFile(STORAGE_FILE, JSON.stringify(this.expenses_list))
        isNew = true
      }

      let expenseFile = this.expense.id + '.json'
      this.expense.total = this.total
      this.expense.vat = this.vat
      this.expense.subtotal = this.subtotal
      userSession.putFile(expenseFile, JSON.stringify(this.expense))

      if (isNew) {
        this.expenses.push(this.expense)
        this.table1.data = this.expenses
      }
      this.clearExpense()
      this.newExpense = false

      this.$notify({
        message: 'Expense created successfully',
        icon: 'tim-icons icon-bell-55',
        horizontalAlign: 'center',
        verticalAlign: 'bottom',
        type: 'success',
        timeout: 1500
      })
    },
    editExpense (id) {
      let search_expense = this.expenses_list.indexOf(id)
      if (search_expense === -1) {
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

      this.expense = this.expenses[search_expense]
      this.newExpense = true
    },
    showExpense (id) {
      let search_expense = this.expenses_list.indexOf(id)
      if (search_expense === -1) {
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

      this.expense = this.expenses[search_expense]
      this.showPreview = true
    },
    changeStatus (status, id) {
      let search_expense = this.expenses_list.indexOf(id)
      if (search_expense === -1) {
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

      this.expense = this.expenses[search_expense]
      this.expense.status = status
      let expenseFile = this.expense.id + '.json'
      userSession.putFile(expenseFile, JSON.stringify(this.expense))
    }
  },
  filters: {
    currency (value) {
      return value.toFixed(2)
    }
  },
  computed: {
    total () {
      return this.subtotal + this.vat
    },
    vat () {
      return this.subtotal * this.expense.tax / 100
    },
    subtotal () {
      return this.expense.items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      )
    }
  },
  async mounted () {
    this.i18n = this.$i18n
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

  .expense-box {
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
    min-height: 500px;
  }

  .expense-box table {
    width: 100%;
    line-height: inherit;
    text-align: left;
  }

  .expense-box table td {
    padding: 5px;
    vertical-align: top;
  }

  .expense-box table tr td:nth-child(n + 2) {
    text-align: right;
  }

  .expense-box table tr.top table td {
    padding-bottom: 20px;
  }

  .expense-box table tr.top table td.title {
    font-size: 45px;
    line-height: 45px;
    color: #333;
  }

  .expense-box table tr.information table td {
    padding-bottom: 40px;
  }

  .expense-box table tr.heading td {
    background: #eee;
    border-bottom: 1px solid #ddd;
    font-weight: bold;
  }

  .expense-box table tr.details td {
    padding-bottom: 20px;
  }

  .expense-box table tr.item td {
    border-bottom: 1px solid #eee;
  }

  .expense-box table tr.item.last td {
    border-bottom: none;
  }

  .expense-box table tr.item input {
    padding-left: 5px;
  }

  .expense-box table tr.item td:first-child input {
    margin-left: -5px;
    width: 100%;
  }

  .expense-box table tr.total td:nth-child(2) {
    border-top: 2px solid #eee;
    font-weight: bold;
  }

  .expense-box input[type="number"] {
    width: 60px;
  }

  @media only screen and (max-width: 600px) {
    .expense-box table tr.top table td {
      width: 100%;
      display: block;
      text-align: center;
    }

    .expense-box table tr.information table td {
      width: 100%;
      display: block;
      text-align: center;
    }
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
</style>

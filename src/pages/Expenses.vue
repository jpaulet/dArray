<template>
  <div class="content content-main-card">
    <card v-if='!newExpense && !showPreview'>
      <template slot="header">
        <div class='row mb-4'>
          <div class="col-6 text-left">
            <button type="button" class="btn btn-light btn-sm px-4 px-md-5 text-white" fill="" @click="openNewExpense">+ New Expense</button>
          </div>
          <div class="col-6 text-right" style='margin-top:2px;'>
            <div class="btn-group btn-group-toggle float-right" data-toggle="buttons">
             <label v-for="(option, index) in expenseOptions" :key="option" class="btn btn-light btn-sm btn-simple" :class="{' active' : (activeIndex === index) }" :id="index" @click.prevent="changeViewType(index,option)">
                <input type="radio" name="options" autocomplete="off" :checked="activeIndex === index">
              {{ option }}
            </label>
            </div>
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
            <h6 class="title d-inline text-left float-left">Expenses ({{table1.data.length}})</h6>
            <drop-down tag="div" class='float-right text-right'>
              <button aria-label="Settings menu" data-toggle="dropdown" class="dropdown-toggle btn-rotate btn btn-link btn-icon">
                <i class="tim-icons icon-settings-gear-63"></i>
              </button>
              <ul class="dropdown-menu dropdown-menu-right">
                <a v-if='activeIndex === 0' href="#" class="dropdown-item" @click.prevent='archiveExpenses()'>Archive <i class="tim-icons icon-alert-circle-exc ml-2" data-toggle="tooltip" data-html="true" title="Save to folder & delete from list" style='font-size:12px;color:#777;margin-top:-10px;'></i></a>
                <a v-if='activeIndex === 0' href="#" class="dropdown-item" @click.prevent='duplicateExpenses()'>Duplicate</a>
                <a href="#" class="dropdown-item" @click.prevent='deleteExpenses()'>Delete</a>
              </ul>
            </drop-down>

            <div class="table-responsive text-left mb-3" style='overflow-x:inherit;'>
              <table class='table tablesorter'>
                <thead class="text-primary">
                  <tr>
                    <th style='width:50px;'> </th>
                    <th class='text-left'>TITLE</th>
                    <th class='text-left'>DATE</th>
                    <th class='text-right pr-3'>TOTAL</th>
                    <th class='d-none d-sm-table-cell text-center'>STATUS</th>
                    <th class='d-none d-sm-table-cell' style='width:50px;font-size:10px;'>VIEW</th>
                    <th class='d-none d-sm-table-cell' style='text-align:center;width:50px;font-size:10px;'>EDIT</th>
                    <th class='d-sm-none d-md-none d-lg-none' style='text-align:center;width:50px;'></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(row,index) in table1.data" :key='index'>
                    <td style='width:50px;'>
                      <base-checkbox v-model="row.done"></base-checkbox>
                    </td>
                    <td class="text-left">
                      <p class="title">{{row.title}}</p>
                      <p class="text-muted" style='font-size:11px;'>{{row.category}}</p>
                    </td>
                    <td class="text-left">
                      <p class="text-muted">{{row.date | moment("D MMM YY")}}</p>
                    </td>
                    <td class="text-right pr-3">
                      <p class="text-muted">
                        <span v-if='company.position === "prefix"'>{{row.currency ? row.currency : company.currency}}</span>
                        {{row.total | currency}}
                        <span v-if='company.position !== "prefix"'>{{row.currency ? row.currency : company.currency}}</span>
                      </p>
                    </td>
                    <td class="text-center d-none d-sm-table-cell">
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
                    <td class="d-none d-sm-table-cell td-actions text-center" style='width:50px;'>
                        <base-button type="link" artia-label="view button" @click='showExpense(row.id)'>
                          <i class="tim-icons icon-zoom-split"></i>
                        </base-button>
                    </td>
                    <td class="d-none d-sm-table-cell td-actions text-center" style='width:50px;'>
                        <base-button type="link" artia-label="edit button" @click='editExpense(row.id)'>
                          <i class="tim-icons icon-pencil"></i>
                        </base-button>
                    </td>
                    <td class="d-sm-none d-md-none d-lg-none td-actions text-center" style='width:50px;'>
                        <base-button type="link" artia-label="view button" @click='showInvoice(row.id)'>
                          <i class="tim-icons icon-zoom-split"></i>
                        </base-button>
                        <base-button type="link" artia-label="edit button" @click='editInvoice(row.id)'>
                          <i class="tim-icons icon-pencil"></i>
                        </base-button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
        </div>

        <div v-if='!table1.data.length && !loadingPage' class='py-4 text-center my-4'>
            <p>No expenses yet. </p>
            <img src='@/assets/img/expense.jpg' class='mt-3 mb-5' height='200' />
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

        <!-- EXPENSE CONFIGURATOR -->
            <div class='col-4 ml-0 pl-0 pr-4' style='min-width: 250px;'>
                <h4 style='display:none;' class="card-title text-left"><i class="tim-icons icon-bell-55 text-primary "></i> Configure Expense </h4>

                <div class='row text-left'>
                    <label class='ml-3' style='vertical-align:middle;line-height:40px;width:70px;'> Title </label>
                    <input class='form-control ml-1 col-7' type='text' v-model='expense.title' name='expense' placeholder="*Expense name (required)" required />
                </div>
                <div class='row text-left mt-2'>
                    <label class='ml-3' style='vertical-align:middle;line-height:40px;width:70px;'> Category </label>
                    <drop-down tag="li" class='form-control ml-1 col-7 float-right text-left' style='font-size:9px;line-height:22px;'>
                      {{expense.category}}
                      <button aria-label="Settings menu" data-toggle="dropdown" class="dropdown-toggle btn-rotate btn btn-link btn-icon float-right">
                      </button>
                      <ul class="dropdown-menu dropdown-menu-right" v-if="categories">
                        <a class="dropdown-item" v-for="(category,index) in categories" @click.prevent='changeCategory(category.name)' :key='index'><strong>{{category.name}}</strong></a>
                        <!--
                        <template v-if='category && category.subItems.length > 0'>
                          <a class="dropdown-item" v-for="(subcategory,name,subindex) in category.subItems" @click.prevent='expense.category = subcategory.name' style='font-size:10px;' :key='subindex'>{{subcategory.name}}</a>
                        </template>
                        -->
                      </ul>
                    </drop-down>
                </div>

                <div class='row text-left mt-2'>
                  <label class='ml-3' style='vertical-align:middle;line-height:40px;width:70px;'>Created</label>
                  <input type="date" class="form-control ml-1 col-7 text-right" v-model='expense.date'><br>
                </div>

                <div class='row text-left mt-2'>
                    <label class='ml-3' style='vertical-align:middle;line-height:40px;width:70px;'>VAT</label>
                    <input class='form-control ml-1 col-7 text-center' type='number' v-model='expense.tax' name='vat' min='0' />
                </div>

                <div class='row text-left mt-2'>
                    <label class='ml-3' style='vertical-align:middle;line-height:40px;width:70px;'>Currency</label>
                    <select v-model="expense.currency" class='form-control col-7 ml-1' style='border:1px solid rgba(34, 42, 66, 0.4);'>
                      <option v-for='(currency,index) in currencies' :key='`option-`+index' :value='currency.symbol'>{{currency.name}}</option>
                    </select>
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
        <!-- END EXPENSE CONFIGURATOR -->

        <!-- EXPENSE PREVIEW -->
            <div class="expense-box col-8 card pt-0 pr-0" style='font-size:13px;'>
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

                <tr class="item" v-for="(item,index) in expense.items" :key='index'>
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
                    {{expense.currency}}{{ item.price * item.quantity | currency }}
                  </td>
                </tr>

                <tr>
                  <td colspan="4">
                    <button class="btn btn-sm btn-light btn-add-row" @click="addRow">Add row</button>
                  </td>
                </tr>

                <tr class="subtotal">
                  <td colspan="3" class='text-right pr-3'>Subtotal:</td>
                  <td>{{expense.currency}}{{ subtotal | currency }}</td>
                </tr>

                <tr class="vat">
                  <td colspan="3" class='text-right pr-3'>VAT <span style='font-size:12px;'>({{expense.tax}} %)</span>:</td>
                  <td>{{expense.currency}}{{ vat | currency }}</td>
                </tr>

                <tr class="total">
                  <td colspan="3" class='text-right pr-3'><strong>Total:</strong></td>
                  <td>{{expense.currency}}{{ total | currency }}</td>
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
          <!-- END EXPENSE PREVIEW -->
        </div>

        <div class='row px-2'>
            <div class='col-4 text-left mt-3'>
                <button class='btn btn-danger btn-sm ml-1' @click='clearExpense' style='opacity:0.75;color:#333;'>Clear</button>
            </div>

            <div class='col-8 text-right mt-3'>
                <button class='btn btn-light btn-sm' style='opacity:0.9;' @click='showExpense(expense.id)'>Preview</button>
                <button class='btn btn-secondary btn-sm px-5' @click='saveExpense' v-if='activeIndex === 0'>Save</button>
            </div>
        </div>
    </card>

    <card v-if='showPreview'>
        <!-- EXPENSE PREVIEW -->
        <template slot="header">
          <div class='row mb-3'>
            <h6 class='col-5' style='line-height:36px;'>
              <a href='' @click.prevent='showPreview = false'><i class="tim-icons icon-minimal-left text-light mr-3"></i></a> Preview Expense
            </h6>
            <div class='col-4 text-left'>
              <button type="button" class='btn btn-sm btn-light' @click="printPDF" id='printButton'>
                  <span v-if='!loadingDownload'><i class='tim-icons icon-cloud-download-93 text-white mr-2'></i>Print Expense</span>
                  <span v-if='loadingDownload'><img src='@/assets/img/loader.gif' style='width:20px;' />Downloading</span>
               </button>
            </div>
            <a class='col-3 float-right text-right' href='' @click.prevent='showPreview = false' style='line-height:36px;'>
              <i class="tim-icons icon-simple-remove text-dark mr-3"></i>
            </a>
          </div>
        </template>
        <div id='printExpense' class="expense-box col-8 col-offset-2 card pt-1 mt-0" style='font-size:13px;margin:0px auto;width:595px;transform:scale(0.9);' ref="printExpense">
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

            <tr class="item" v-for="(item,index) in expense.items" :key='index'>
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
                {{expense.currency}}{{ item.price * item.quantity | currency }}
              </td>
            </tr>

            <tr class="subtotal">
              <td colspan="3" class='text-right pr-3'>Subtotal:</td>
              <td>{{expense.currency}}{{ subtotal | currency }}</td>
            </tr>

            <tr class="vat">
              <td colspan="3" class='text-right pr-3'>VAT <span style='font-size:12px;'>({{expense.tax}} %)</span>:</td>
              <td>{{expense.currency}}{{ vat | currency }}</td>
            </tr>

            <tr class="total">
              <td colspan="3" class='text-right pr-3'><strong>Total:</strong></td>
              <td>{{expense.currency}}{{ total | currency }}</td>
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
       <!-- END EXPENSE PREVIEW -->
    </card>

    <modal :show.sync="showArchive" body-classes="p-0" modal-classes="modal-dialog-centered modal-sm" style='transform:translate(0,0) !important;'>
      <template slot="header">
        <h5 class="modal-title ml-2" id="exampleModalLabel">Archive Expenses</h5>
      </template>
      <form class='row text-center mb-4 mt-4 pt-2 pb-2' role="form">
        <label class='col-3 ml-3 text-mutted' style='font-size:12px;line-height:40px;color:#555;'>Folder:</label>
        <drop-down tag="div">
          <button aria-label="Dropdown link" data-toggle="dropdown" class="dropdown-toggle btn-rotate btn btn-secondary" @click.prevent>
            {{selectedFolder}}
          </button>
          <ul class="dropdown-menu">
            <a href="#" class="dropdown-item py-1" @click.prevent='selectedFolder = "Expenses"'>Expenses</a>
            <a v-for='(expenseFolder,index) in expenseFolders' :key='index' href="#" class="dropdown-item py-1" @click.prevent='selectedFolder = "Expenses/" + expenseFolder'> - {{expenseFolder}}</a>
          </ul>
        </drop-down>
      </form>
      <template slot="footer">
        <base-button type="danger" @click="showArchive = false" style='opacity:0.5;'>Close</base-button>
        <base-button type="light" @click.prevent='saveToFolder()'>Archive</base-button>
      </template>
    </modal>

  </div>
</template>
<script src="https://html2canvas.hertzen.com/dist/html2canvas.js"></script>
<script>
import { BreedingRhombusSpinner } from 'epic-spinners'
import { userSession } from '@/userSession'
import {
  Card, BaseButton, BaseCheckbox, BaseTable, Modal
} from '@/components/index'
import { uuid } from 'vue-uuid'
import Vue from 'vue'
import * as jsPDF from 'jspdf'
import html2canvas from "html2canvas"
window.html2canvas = html2canvas //html2canvas must be set as global var

const tableColumns = ['', 'Title', 'Category', 'Date', 'Total', 'Status', 'View', 'Edit']

var STORAGE_FILE = 'expenses.json'
var COMPANY_FILE = 'company.json'
var ARCHIVED_FILE = 'archiveExpenses.json'

export default {
  components: {
    Card,
    BaseButton,
    BaseTable,
    BaseCheckbox,
    Modal,
    BreedingRhombusSpinner
  },
  data () {
    return {
      loadingPage: true,
      showArchive: false,
      selected: [],
      showArchive: false,
      selectedFolder: 'Expenses',
      loadingDownload: false,
      showPreview: false,
      newExpense: false,
      expenseFolders: [],
      expenseOptions: [
        'Active',
        'Archived'
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
        year: '',
        month: '',
        quarter: '',
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
        vat: 0,
        category: ''
      },
      company: {},
      expensesList: [],
      expenses: [],
      categories: [
        {
          name: 'Advertising'
        },
        {
          name: 'Vehicle Expenses',
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
      ],
      currencies: [
        {"cc":"AED","symbol":"\u062f.\u0625;","name":"UAE dirham"},
        {"cc":"AFN","symbol":"Afs","name":"Afghan afghani"},
        {"cc":"ALL","symbol":"L","name":"Albanian lek"},
        {"cc":"AMD","symbol":"AMD","name":"Armenian dram"},
        {"cc":"ANG","symbol":"NA\u0192","name":"Netherlands Antillean gulden"},
        {"cc":"AOA","symbol":"Kz","name":"Angolan kwanza"},
        {"cc":"ARS","symbol":"$","name":"Argentine peso"},
        {"cc":"AUD","symbol":"$","name":"Australian dollar"},
        {"cc":"AWG","symbol":"\u0192","name":"Aruban florin"},
        {"cc":"AZN","symbol":"AZN","name":"Azerbaijani manat"},
        {"cc":"BAM","symbol":"KM","name":"Bosnia and Herzegovina konvertibilna marka"},
        {"cc":"BBD","symbol":"Bds$","name":"Barbadian dollar"},
        {"cc":"BDT","symbol":"\u09f3","name":"Bangladeshi taka"},
        {"cc":"BGN","symbol":"BGN","name":"Bulgarian lev"},
        {"cc":"BHD","symbol":".\u062f.\u0628","name":"Bahraini dinar"},
        {"cc":"BIF","symbol":"FBu","name":"Burundi franc"},
        {"cc":"BMD","symbol":"BD$","name":"Bermudian dollar"},
        {"cc":"BND","symbol":"B$","name":"Brunei dollar"},
        {"cc":"BOB","symbol":"Bs.","name":"Bolivian boliviano"},
        {"cc":"BRL","symbol":"R$","name":"Brazilian real"},
        {"cc":"BSD","symbol":"B$","name":"Bahamian dollar"},
        {"cc":"BTN","symbol":"Nu.","name":"Bhutanese ngultrum"},
        {"cc":"BWP","symbol":"P","name":"Botswana pula"},
        {"cc":"BYR","symbol":"Br","name":"Belarusian ruble"},
        {"cc":"BZD","symbol":"BZ$","name":"Belize dollar"},
        {"cc":"CAD","symbol":"$","name":"Canadian dollar"},
        {"cc":"CDF","symbol":"F","name":"Congolese franc"},
        {"cc":"CHF","symbol":"Fr.","name":"Swiss franc"},
        {"cc":"CLP","symbol":"$","name":"Chilean peso"},
        {"cc":"CNY","symbol":"\u00a5","name":"Chinese/Yuan renminbi"},
        {"cc":"COP","symbol":"Col$","name":"Colombian peso"},
        {"cc":"CRC","symbol":"\u20a1","name":"Costa Rican colon"},
        {"cc":"CUC","symbol":"$","name":"Cuban peso"},
        {"cc":"CVE","symbol":"Esc","name":"Cape Verdean escudo"},
        {"cc":"CZK","symbol":"K\u010d","name":"Czech koruna"},
        {"cc":"DJF","symbol":"Fdj","name":"Djiboutian franc"},
        {"cc":"DKK","symbol":"Kr","name":"Danish krone"},
        {"cc":"DOP","symbol":"RD$","name":"Dominican peso"},
        {"cc":"DZD","symbol":"\u062f.\u062c","name":"Algerian dinar"},
        {"cc":"EEK","symbol":"KR","name":"Estonian kroon"},
        {"cc":"EGP","symbol":"\u00a3","name":"Egyptian pound"},
        {"cc":"ERN","symbol":"Nfa","name":"Eritrean nakfa"},
        {"cc":"ETB","symbol":"Br","name":"Ethiopian birr"},
        {"cc":"EUR","symbol":"\u20ac","name":"European Euro"},
        {"cc":"FJD","symbol":"FJ$","name":"Fijian dollar"},
        {"cc":"FKP","symbol":"\u00a3","name":"Falkland Islands pound"},
        {"cc":"GBP","symbol":"\u00a3","name":"British pound"},
        {"cc":"GEL","symbol":"GEL","name":"Georgian lari"},
        {"cc":"GHS","symbol":"GH\u20b5","name":"Ghanaian cedi"},
        {"cc":"GIP","symbol":"\u00a3","name":"Gibraltar pound"},
        {"cc":"GMD","symbol":"D","name":"Gambian dalasi"},
        {"cc":"GNF","symbol":"FG","name":"Guinean franc"},
        {"cc":"GQE","symbol":"CFA","name":"Central African CFA franc"},
        {"cc":"GTQ","symbol":"Q","name":"Guatemalan quetzal"},
        {"cc":"GYD","symbol":"GY$","name":"Guyanese dollar"},
        {"cc":"HKD","symbol":"HK$","name":"Hong Kong dollar"},
        {"cc":"HNL","symbol":"L","name":"Honduran lempira"},
        {"cc":"HRK","symbol":"kn","name":"Croatian kuna"},
        {"cc":"HTG","symbol":"G","name":"Haitian gourde"},
        {"cc":"HUF","symbol":"Ft","name":"Hungarian forint"},
        {"cc":"IDR","symbol":"Rp","name":"Indonesian rupiah"},
        {"cc":"ILS","symbol":"\u20aa","name":"Israeli new sheqel"},
        {"cc":"INR","symbol":"\u20B9","name":"Indian rupee"},
        {"cc":"IQD","symbol":"\u062f.\u0639","name":"Iraqi dinar"},
        {"cc":"IRR","symbol":"IRR","name":"Iranian rial"},
        {"cc":"ISK","symbol":"kr","name":"Icelandic kr\u00f3na"},
        {"cc":"JMD","symbol":"J$","name":"Jamaican dollar"},
        {"cc":"JOD","symbol":"JOD","name":"Jordanian dinar"},
        {"cc":"JPY","symbol":"\u00a5","name":"Japanese yen"},
        {"cc":"KES","symbol":"KSh","name":"Kenyan shilling"},
        {"cc":"KGS","symbol":"\u0441\u043e\u043c","name":"Kyrgyzstani som"},
        {"cc":"KHR","symbol":"\u17db","name":"Cambodian riel"},
        {"cc":"KMF","symbol":"KMF","name":"Comorian franc"},
        {"cc":"KPW","symbol":"W","name":"North Korean won"},
        {"cc":"KRW","symbol":"W","name":"South Korean won"},
        {"cc":"KWD","symbol":"KWD","name":"Kuwaiti dinar"},
        {"cc":"KYD","symbol":"KY$","name":"Cayman Islands dollar"},
        {"cc":"KZT","symbol":"T","name":"Kazakhstani tenge"},
        {"cc":"LAK","symbol":"KN","name":"Lao kip"},
        {"cc":"LBP","symbol":"\u00a3","name":"Lebanese lira"},
        {"cc":"LKR","symbol":"Rs","name":"Sri Lankan rupee"},
        {"cc":"LRD","symbol":"L$","name":"Liberian dollar"},
        {"cc":"LSL","symbol":"M","name":"Lesotho loti"},
        {"cc":"LTL","symbol":"Lt","name":"Lithuanian litas"},
        {"cc":"LVL","symbol":"Ls","name":"Latvian lats"},
        {"cc":"LYD","symbol":"LD","name":"Libyan dinar"},
        {"cc":"MAD","symbol":"MAD","name":"Moroccan dirham"},
        {"cc":"MDL","symbol":"MDL","name":"Moldovan leu"},
        {"cc":"MGA","symbol":"FMG","name":"Malagasy ariary"},
        {"cc":"MKD","symbol":"MKD","name":"Macedonian denar"},
        {"cc":"MMK","symbol":"K","name":"Myanma kyat"},
        {"cc":"MNT","symbol":"\u20ae","name":"Mongolian tugrik"},
        {"cc":"MOP","symbol":"P","name":"Macanese pataca"},
        {"cc":"MRO","symbol":"UM","name":"Mauritanian ouguiya"},
        {"cc":"MUR","symbol":"Rs","name":"Mauritian rupee"},
        {"cc":"MVR","symbol":"Rf","name":"Maldivian rufiyaa"},
        {"cc":"MWK","symbol":"MK","name":"Malawian kwacha"},
        {"cc":"MXN","symbol":"$","name":"Mexican peso"},
        {"cc":"MYR","symbol":"RM","name":"Malaysian ringgit"},
        {"cc":"MZM","symbol":"MTn","name":"Mozambican metical"},
        {"cc":"NAD","symbol":"N$","name":"Namibian dollar"},
        {"cc":"NGN","symbol":"\u20a6","name":"Nigerian naira"},
        {"cc":"NIO","symbol":"C$","name":"Nicaraguan c\u00f3rdoba"},
        {"cc":"NOK","symbol":"kr","name":"Norwegian krone"},
        {"cc":"NPR","symbol":"NRs","name":"Nepalese rupee"},
        {"cc":"NZD","symbol":"NZ$","name":"New Zealand dollar"},
        {"cc":"OMR","symbol":"OMR","name":"Omani rial"},
        {"cc":"PAB","symbol":"B./","name":"Panamanian balboa"},
        {"cc":"PEN","symbol":"S/.","name":"Peruvian nuevo sol"},
        {"cc":"PGK","symbol":"K","name":"Papua New Guinean kina"},
        {"cc":"PHP","symbol":"\u20b1","name":"Philippine peso"},
        {"cc":"PKR","symbol":"Rs.","name":"Pakistani rupee"},
        {"cc":"PLN","symbol":"z\u0142","name":"Polish zloty"},
        {"cc":"PYG","symbol":"\u20b2","name":"Paraguayan guarani"},
        {"cc":"QAR","symbol":"QR","name":"Qatari riyal"},
        {"cc":"RON","symbol":"L","name":"Romanian leu"},
        {"cc":"RSD","symbol":"din.","name":"Serbian dinar"},
        {"cc":"RUB","symbol":"R","name":"Russian ruble"},
        {"cc":"SAR","symbol":"SR","name":"Saudi riyal"},
        {"cc":"SBD","symbol":"SI$","name":"Solomon Islands dollar"},
        {"cc":"SCR","symbol":"SR","name":"Seychellois rupee"},
        {"cc":"SDG","symbol":"SDG","name":"Sudanese pound"},
        {"cc":"SEK","symbol":"kr","name":"Swedish krona"},
        {"cc":"SGD","symbol":"S$","name":"Singapore dollar"},
        {"cc":"SHP","symbol":"\u00a3","name":"Saint Helena pound"},
        {"cc":"SLL","symbol":"Le","name":"Sierra Leonean leone"},
        {"cc":"SOS","symbol":"Sh.","name":"Somali shilling"},
        {"cc":"SRD","symbol":"$","name":"Surinamese dollar"},
        {"cc":"SYP","symbol":"LS","name":"Syrian pound"},
        {"cc":"SZL","symbol":"E","name":"Swazi lilangeni"},
        {"cc":"THB","symbol":"\u0e3f","name":"Thai baht"},
        {"cc":"TJS","symbol":"TJS","name":"Tajikistani somoni"},
        {"cc":"TMT","symbol":"m","name":"Turkmen manat"},
        {"cc":"TND","symbol":"DT","name":"Tunisian dinar"},
        {"cc":"TRY","symbol":"TRY","name":"Turkish new lira"},
        {"cc":"TTD","symbol":"TT$","name":"Trinidad and Tobago dollar"},
        {"cc":"TWD","symbol":"NT$","name":"New Taiwan dollar"},
        {"cc":"TZS","symbol":"TZS","name":"Tanzanian shilling"},
        {"cc":"UAH","symbol":"UAH","name":"Ukrainian hryvnia"},
        {"cc":"UGX","symbol":"USh","name":"Ugandan shilling"},
        {"cc":"USD","symbol":"US$","name":"United States dollar"},
        {"cc":"UYU","symbol":"$U","name":"Uruguayan peso"},
        {"cc":"UZS","symbol":"UZS","name":"Uzbekistani som"},
        {"cc":"VEB","symbol":"Bs","name":"Venezuelan bolivar"},
        {"cc":"VND","symbol":"\u20ab","name":"Vietnamese dong"},
        {"cc":"VUV","symbol":"VT","name":"Vanuatu vatu"},
        {"cc":"WST","symbol":"WS$","name":"Samoan tala"},
        {"cc":"XAF","symbol":"CFA","name":"Central African CFA franc"},
        {"cc":"XCD","symbol":"EC$","name":"East Caribbean dollar"},
        {"cc":"XDR","symbol":"SDR","name":"Special Drawing Rights"},
        {"cc":"XOF","symbol":"CFA","name":"West African CFA franc"},
        {"cc":"XPF","symbol":"F","name":"CFP franc"},
        {"cc":"YER","symbol":"YER","name":"Yemeni rial"},
        {"cc":"ZAR","symbol":"R","name":"South African rand"},
        {"cc":"ZMK","symbol":"ZK","name":"Zambian kwacha"},
        {"cc":"ZWR","symbol":"Z$","name":"Zimbabwean dollar"}
      ]
    }
  },
  methods: {

    changeCategory(name){
      this.$set(this.expense, 'category', name)
    },

    checkHasSelected() {
      this.selected = this.expenses.filter((item) => { return item.done === true })

      if(this.selected.length === 0){
        this.$notify({
          message: 'Select one or more expense/s first',
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

    archiveExpenses() {
      if(!this.checkHasSelected()){
        return false
      }
      this.showArchive = true

      userSession.getFile('Expenses/folders.json', this.$DECRYPT).then(expenseFolders => {
        if(!expenseFolders){
          this.expenseFolders = []
          return false
        }
        this.expenseFolders = JSON.parse(expenseFolders)
      })
    },

    duplicateExpenses() {
      if(!this.checkHasSelected()){
        return false
      }

      this.selected.filter((el) => {
        let newExpense = Object.assign({}, el);
        newExpense.id = uuid.v4()
        newExpense.title = el.title+" (Copy)"
        delete newExpense.done
        this.expensesList.push(newExpense.id)
        userSession.putFile(STORAGE_FILE, JSON.stringify(this.expensesList), this.$ENCRYPT)

        let expenseFile = newExpense.id + '.json'
        userSession.putFile(expenseFile, JSON.stringify(newExpense), this.$ENCRYPT)
        this.expenses.push(newExpense)
      });
    },

    deleteExpenses() {
      if(!this.checkHasSelected()){
        return false
      }

      this.expensesList = this.expensesList.filter((el) => {
        return !this.selected.some((f) => {
          return f.id === el
        })
      })

      if(this.activeIndex === 0){
        this.selected.map((el) => {
          userSession.deleteFile(el.id+'.json')
        })

        userSession.putFile(STORAGE_FILE, JSON.stringify(this.expensesList), this.$ENCRYPT)
        this.expenses = this.expenses.filter((el) => {
          return !this.selected.some((f) => {
            return f.id === el.id
          })
        })

        this.$set(this.table1, 'data', this.expenses)
        this.selected = []
        this.deselectAll()
      }else{
        userSession.putFile(ARCHIVED_FILE, JSON.stringify(this.expensesList), this.$ENCRYPT)
        this.expenses = this.expenses.filter((el) => {
          return !this.selected.some((f) => {
            return f.id === el.id
          })
        })

        this.$set(this.table1, 'data', this.expenses)
        this.selected = []
        this.deselectAll()
      }
    },

    deselectAll(){
      this.expenses.map( item => {
        delete item.done
      })
    },

    printPDF() {
      this.loadingDownload = true
      var pdf = new jsPDF('p', 'pt', 'letter');
      let expense = document.getElementById('printExpense')
      pdf.html(expense, {
        callback: (pdf) => {
          pdf.save(this.expense.title+'.pdf');

          this.$notify({
            message: 'Expense PDF saved successfully',
            icon: 'tim-icons icon-bell-55',
            horizontalAlign: 'center',
            verticalAlign: 'bottom',
            type: 'success',
            timeout: 1500
          })

          this.loadingDownload = false
          /*
          var iframe = document.createElement('iframe');
          iframe.setAttribute('style', 'position:fixed;right:0; top:0; bottom:0; height:100%; width:100%; z-index:10000;');
          document.body.appendChild(iframe);
          iframe.src = pdf.output('datauristring');
          */
        }
      });
    },

    openNewExpense () {
      this.clearExpense()
      this.newExpense = true
      this.expense.currency = this.company.currencySymbol
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
        year: '',
        month: '',
        quarter: '',
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
      userSession.getFile(COMPANY_FILE, this.$DECRYPT).then((company) => {
        if(!company){
          this.company = {}
          this.company.currency = '$'
        }else{
          this.company = JSON.parse(company)
        }
        this.expense.tax = this.company.vat

        if(this.invoice && this.invoice.currency !== undefined){
          this.expense.currency = this.company.currency
        }
      })

      // Load Expenses data
      userSession.getFile(STORAGE_FILE, this.$DECRYPT).then((expenses) => {
        if(!expenses){
          this.expensesList = []
        }else{
          this.expensesList = JSON.parse(expenses)
        }
        var notFoundList = []

        for (let i = 0; i < this.expensesList.length; i++){
          userSession.getFile(this.expensesList[i] + '.json', this.$DECRYPT).then((expense) => {
            if (expense) {
              expense = JSON.parse(expense)
              let searchExpense = this.expensesList.indexOf(expense.id)
              this.$set(this.expenses, searchExpense, expense)
            }else{
              notFoundList.push(this.expensesList[i])
            }
          })
        }

        setTimeout(() => {
          this.table1.data = this.expenses
          this.loadingPage = false

          if(notFoundList.length > 0){
            for(let j = 0; j < notFoundList.length; j++){
              var index = this.expensesList.indexOf(notFoundList[j])
              if (index > -1) {
                this.expensesList.splice(index, 1)
                this.expenses.splice(index, 1)
              }
            }

            userSession.putFile(STORAGE_FILE, JSON.stringify(this.expensesList), this.$ENCRYPT)
          }
        }, 700);
      })
    },

    isFilled () {
      if (!this.expense.title || this.total === 0) {
        this.$notify({
          message: 'You should fill the expense first: Title & the total couldn\'t be 0',
          icon: 'tim-icons icon-bell-55',
          horizontalAlign: 'center',
          verticalAlign: 'bottom',
          type: 'danger',
          timeout: 3000
        })
        return false
      }
      return true
    },

    saveExpense () {
      let canSave = this.isFilled()
      if (!canSave) {
        return false
      }
      let isNew = false
      if (this.expense.id === null) {
        this.expense.id = uuid.v4()
        this.expensesList.push(this.expense.id)
        userSession.putFile(STORAGE_FILE, JSON.stringify(this.expensesList), this.$ENCRYPT)
        isNew = true
      }

      let expenseFile = this.expense.id + '.json'
      this.expense.total = this.total
      this.expense.vat = this.vat
      this.expense.subtotal = this.subtotal
      this.expense.year = this.expense.date.substr(0,4)
      this.expense.month = this.expense.date.substr(5,2)
      this.expense.quarter = "Q"+(this.expense.month % 4)
      userSession.putFile(expenseFile, JSON.stringify(this.expense), this.$ENCRYPT)

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
      let searchExpense = this.expensesList.indexOf(id)
      if (searchExpense === -1) {
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

      this.expense = this.expenses[searchExpense]
      this.newExpense = true
    },

    showExpense (id) {
      let searchExpense = this.expensesList.indexOf(id)
      if (searchExpense === -1) {
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

      this.expense = this.expenses[searchExpense]
      this.showPreview = true
    },

    changeStatus (status, id) {
      let searchExpense = this.expensesList.indexOf(id)
      if (searchExpense === -1) {
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

      this.expense = this.expenses[searchExpense]

      this.$set(this.expense,'status',status)
      let expenseFile = this.expense.id + '.json'
      userSession.putFile(expenseFile, JSON.stringify(this.expense), this.$ENCRYPT)
    },

    changeViewType (index,option) {
      this.activeIndex = index

      if(option === 'Archived'){
        this.loadArchived()
      }else{
        this.loadingPage = true
        this.expenses = []
        this.fetchData()
      }
    },

    loadArchived(){
      this.loadingPage = true
      this.expenses = []

      // Load Expenses data
      userSession.getFile(ARCHIVED_FILE, this.$DECRYPT).then((expenses) => {
        if(!expenses){
          this.expensesList = []
        }else{
          this.expensesList = JSON.parse(expenses)
        }
        var i = 0

        for (i in this.expensesList) {
          userSession.getFile(this.expensesList[i], this.$DECRYPT).then((expense) => {
            if (expense === null) {
              return false
            }

            expense = JSON.parse(expense)
            this.$set(this.expenses, this.expenses.length, expense)
            this.expensesList[i] = expense.id
          })
        }

        setTimeout(() => {
          this.table1.data = this.expenses
          this.loadingPage = false
        }, 700);
      })
    },

    saveToFolder(folder) {
      if(!this.checkHasSelected()){
        return false
      }

      //Remove from current file list
      const newExpensesList = this.expensesist.filter((el) => {
        return !this.selected.some((f) => {
          return f.id === el
        })
      })

      this.selected.map((el) => {
        userSession.getFile(el.id+'.json', this.$DECRYPT).then((theFile) => {
          if(!theFile){ return false }
          //Save the file
          userSession.putFile(this.selectedFolder+'/'+el.name.toLowerCase().replace(/\s/g, '')+'.json',theFile, this.$ENCRYPT)

          //Save to Archived File
          userSession.getFile(ARCHIVED_FILE).then((archived) => {
            if(!archived){
              var files = []
            }else{
              var files = JSON.parse(archived)
            }

            files.push(this.selectedFolder+'/'+el.name.toLowerCase().replace(/\s/g, '')+'.json')
            userSession.putFile(ARCHIVED_FILE, JSON.stringify(files), this.$ENCRYPT)
          })

          //Delete from Invoice Filesystem and transfer to Files/Filesystem
          userSession.getFile(this.selectedFolder+'/filesystem.json', this.$DECRYPT).then((uploads) => {
            if(!uploads){
              var files = []
            }else{
              var files = JSON.parse(uploads)
            }

            const upload = {
              id: files.length + 1,
              name: el.name.toLowerCase().replace(/\s/g, '')+'.json',
              path: this.selectedFolder+'/'+el.name.toLowerCase().replace(/\s/g, '')+'.json',
              size: '',
              progress: '100%',
              ext: 'json',
              type: 'Expense',
              progressTimer: null,
              color: '#24bddf'
            }

            files.push(upload)
            userSession.putFile(this.selectedFolder+'/filesystem.json', JSON.stringify(files), this.$ENCRYPT)
            userSession.deleteFile(el.id+'.json')
          })
        })
      })

      //Upload the new files list
      userSession.putFile(STORAGE_FILE, JSON.stringify(newExpensesList), this.$ENCRYPT)
      this.expenses = this.expenses.filter((el) => {
        return !this.selected.some((f) => {
          return f.id === el.id
        })
      })

      this.table1.data = this.expenses
      this.selected = []
      this.deselectAll()
      this.showArchive = false
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
    this.changeViewType(0)
    this.fetchData()

    if(this.$route.query.newExpense){
      this.openNewExpense()
    }
  }
}
</script>

<style scoped>
  .content-main-card .card{
    height: 100%;
  }
  .table > thead > tr > th{
    padding: 10px 7px;
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
    background-color: #c2e8cea3 !important;
    color:#8ebb9c;
  }
  .badge-warning {
    color:#ff8d7287;
    background-color: #f6cd9061 !important;
  }
  .badge-danger{
    color:#fd5d93b8;
    background-color: #f3b9a66b !important;
  }
  .badge-info{
    color:#1d8cf894;
    background-color: #deecff94 !important;
  }

  .btn-danger{
    color:#333 !important;
    background:transparent;
    background-color: none;
    text-decoration: underline;
  }

  .btn.btn-link.dropdown-toggle{
    margin-right: 0px !important;
  }
</style>

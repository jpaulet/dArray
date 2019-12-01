<template>
  <div class="content content-main-card">
    <card v-if='!newInvoice && !showPreview'>
        <template slot="header">
            <div class='row mb-4'>
                <div class="col-sm-6 text-left">
                  <button type="button" class="btn btn-light btn-sm px-5 text-white" fill="" @click="openNewInvoice">+ New Invoice</button>
                </div>
                <div class="col-sm-6 text-right">
                    <div class="btn-group btn-group-toggle" data-toggle="buttons float-right">
                       <label v-for="(option, index) in invoiceOptions"
                              :key="option"
                              class="btn btn-light btn-sm btn-simple"
                              :class="{active:activeIndex === index}"
                              :id="index">
                          <input type="radio"
                                @click="changeViewType(index,option)"
                                name="options" autocomplete="off"
                                :checked="activeIndex === index">
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
            <h6 class="title d-inline text-left float-left">Invoices ({{table1.data.length}})</h6>
            <drop-down tag="div" class='float-right text-right'>
              <button aria-label="Settings menu" data-toggle="dropdown" class="dropdown-toggle btn-rotate btn btn-link btn-icon">
                <i class="tim-icons icon-settings-gear-63"></i>
              </button>
              <ul class="dropdown-menu dropdown-menu-right">
                <a v-if='activeIndex === 0' href="#" class="dropdown-item" @click.prevent='archiveInvoices()'>Archive <i class="tim-icons icon-alert-circle-exc ml-2" data-toggle="tooltip" data-html="true" title="Save to folder & delete from list" style='font-size:12px;color:#777;margin-top:-10px;'></i></a>
                <a v-if='activeIndex === 0' href="#" class="dropdown-item" @click.prevent='duplicateInvoices()'>Duplicate</a>
                <a href="#" class="dropdown-item" @click.prevent='deleteInvoices()'>Delete</a>
              </ul>
            </drop-down>

            <div v-if='table1.data.length' class="table-responsive text-left mb-3" style='overflow-x:inherit;'>
                <base-table :data="table1.data" :columns="table1.columns" thead-classes="text-primary">
                    <template slot-scope="{row}">
                        <td>
                            <base-checkbox v-model="row.done" class='rowDone'></base-checkbox>
                        </td>
                        <td class="text-left" style="cursor:pointer;">
                          <p class="title">{{row.client.legal}}</p>
                          <p class="text-muted" style='font-size:13px'>{{row.name}}</p>
                        </td>
                        <td class="text-left" style="cursor:pointer;">
                          <p class="text-muted">{{row.date | moment("D MMM YY")}}</p>
                          <p class="text-muted" style='color:#ddd;font-size:11px;'>Due: {{row.due_date | moment("from")}}</p>
                        </td>
                        <td class="text-left" style="cursor:pointer;">
                          <p class="text-muted">{{row.total | currency}} €</p>
                        </td>
                        <td class="text-left">
                            <p class="text-muted">
                              <drop-down tag="div">
                                <span aria-label="Invoice Status" data-toggle="dropdown" class="dropdown-toggle-permanent badge" :class="{ 'badge-success' : (row.status === 'Paid'), 'badge-warning' : (row.status === 'Pending'), 'badge-danger' : (row.status === 'Not paid'), 'badge-light' : (row.status === 'Overdue'), 'badge-info' : (row.status === 'Void'), 'badge-secondary' : (row.status === 'Draft') }" style='font-size:12px;margin-bottom:3px;width:100px;'>
                                  {{row.status}}
                                  <!-- Do not remove, the icon has a ::after property with a dropdown arrow -->
                                  <i class="tim-icons icon-settings-gear-63" style='display:none;'></i>
                                </span>
                                <ul class="dropdown-menu dropdown-menu-left">
                                  <a href="#" class="dropdown-item mt-0" @click.prevent='changeStatus("Paid",row.id)'>
                                    <span class='badge badge-success' style='font-size:13px;width:100%;'>Paid</span>
                                  </a>
                                  <a href="#" class="dropdown-item mt-0" @click.prevent='changeStatus("Pending",row.id)'>
                                    <span class='badge badge-warning' style='font-size:13px;width:100%;'>Pending</span>
                                  </a>
                                  <a href="#" class="dropdown-item mt-0" @click.prevent='changeStatus("Not paid",row.id)'>
                                    <span class='badge badge-danger' style='font-size:13px;width:100%;'>Not paid</span>
                                  </a>
                                  <a href="#" class="dropdown-item mt-0" @click.prevent='changeStatus("Overdue",row.id)'>
                                    <span class='badge badge-light' style='font-size:13px;width:100%;'>Overdue</span>
                                  </a>
                                  <a href="#" class="dropdown-item mt-0" @click.prevent='changeStatus("Void",row.id)'>
                                    <span class='badge badge-info' style='font-size:13px;width:100%;'>Void</span>
                                  </a>
                                  <a href="#" class="dropdown-item mt-0" @click.prevent='changeStatus("Draft",row.id)'>
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

        <div v-if='!table1.data.length && !loadingPage' class='py-4 text-center my-4'>
            <p>No invoices yet. </p>
            <img src='@/assets/img/invoice.jpg' class='mt-3 mb-5' height='200' />
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
                <button class='btn btn-danger btn-sm ml-1' @click='clearInvoice' style='opacity:0.75;color:#333;'>Clear</button>
            </div>
            <div class='col-3 text-right mt-3 pr-3'>
              <button class='btn btn-light btn-sm mr-5' style='opacity:0.8;'>Save Customer</button>
            </div>

            <div class='col-8 text-right mt-3'>
                <button class='btn btn-light btn-sm' style='opacity:0.9;' @click='showInvoice(invoice.id)'>Preview</button>
                <button class='btn btn-secondary btn-sm px-5' @click='saveInvoice' v-if='activeIndex === 0 || newInvoice'>Save</button>
            </div>
        </div>
    </card>

    <card id='previewInvoice' v-show='showPreview'>
        <!-- INVOICE PREVIEW -->
        <template slot="header">
          <div class='row mb-3'>
            <h6 class='col-5 mb-0' style='line-height:36px;'>
              <a href='' @click.prevent='showPreview = false'><i class="tim-icons icon-minimal-left text-light mr-3"></i></a> Preview Invoice
            </h6>
            <div class='col-4 text-left'>
              <button type="button" class='btn btn-sm btn-light' @click="printPDF" id='printButton'>
                  <span v-if='!loadingDownload'><i class='tim-icons icon-cloud-download-93 text-white mr-2'></i>Print Invoice</span>
                  <span v-if='loadingDownload'><img src='@/assets/img/loader.gif' style='width:20px;' />Downloading</span>
               </button>
            </div>
            <a class='col-3 float-right text-right' href='' @click.prevent='showPreview = false' style='line-height:36px;'>
              <i class="tim-icons icon-simple-remove text-dark mr-3"></i>
            </a>
          </div>
        </template>
        <div id='printInvoice' class="invoice-box col-8 col-offset-2 card pt-1 mt-0" style='font-size:13px;max-width:595px;margin:0px auto;transform:scale(0.9);' ref="printInvoice">
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

                    <td class='pb-0 mb-0'>
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
              <td>
                {{ item.description }}
              </td>
              <td style='text-align:right;'>
                {{ item.price }}
              </td>
              <td>
                {{ item.quantity }}
              </td>
              <td style='min-width:90px;'>
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

    <modal :show.sync="showArchive" body-classes="p-0" modal-classes="modal-dialog-centered modal-sm" style='transform:translate(0,0);'>
      <template slot="header">
        <h5 class="modal-title ml-2" id="exampleModalLabel">Archive Invoices</h5>
      </template>
      <form class='row text-center mb-4 mt-4 pt-2 pb-2' role="form">
        <label class='col-3 ml-3 text-mutted' style='font-size:12px;line-height:40px;color:#555;'>Folder:</label>
        <drop-down tag="div">
          <button aria-label="Dropdown link" data-toggle="dropdown" class="dropdown-toggle btn-rotate btn btn-secondary" @click.prevent>
            {{selectedFolder}}
          </button>
          <ul class="dropdown-menu">
            <a href="" class="dropdown-item py-1" @click.prevent='selectedFolder = "Invoices"'>Invoices</a>
            <a v-for='(invoiceFolder,index) in invoiceFolders' :key='index' href="" class="dropdown-item py-1" @click.prevent='selectedFolder = "Invoices/" + invoiceFolder'> - {{invoiceFolder}}</a>
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
import Vue from 'vue'
import { BreedingRhombusSpinner } from 'epic-spinners'
import {
  Card, BaseButton, BaseTable, BaseCheckbox, Modal
} from '@/components/index'
import { userSession } from '@/userSession'
import { uuid } from 'vue-uuid'
import * as jsPDF from 'jspdf'
import html2canvas from "html2canvas"
const axios = require('axios');
require('promise.prototype.finally').shim();

window.html2canvas = html2canvas //html2canvas must be set as global var

const tableColumns = ['', 'CLIENT', 'DATE', 'AMOUNT', 'STATUS', 'VIEW', 'EDIT']

var STORAGE_FILE = 'invoices.json'
var COMPANY_FILE = 'company.json'
var CUSTOMERS_FILE = 'customers.json'
var ARCHIVED_FILE = 'archievedInvoices.json'

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
      loadingDownload: false,
      showPreview: false,
      tableData: [{}],
      newInvoice: false,
      invoiceOptions: [
        'Active',
        'Archived'
      ],
      invoiceFolders: [],
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
        year: '',
        month: '',
        quarter: '',
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
      imageSrc: null,
      selected: [],
      showArchive: false,
      selectedFolder: 'Invoices',
    }
  },
  methods: {
    checkHasSelected() {
      this.selected = this.invoices.filter((item) => { return item.done === true })

      if(this.selected.length === 0){
        this.$notify({
          message: 'Select one or more invoice/s first',
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

    archiveInvoices() {
      if(!this.checkHasSelected()){
        return false
      }
      this.showArchive = true

      console.log('Invoices/folders.json')
      userSession.getFile('Invoices/folders.json', this.$DECRYPT).then(invoiceFolders => {
        if(!invoiceFolders){
          this.invoiceFolders = []
          return false
        }
        console.log(invoiceFolders)
        this.invoiceFolders = JSON.parse(invoiceFolders)
      })
    },

    duplicateInvoices() {
      if(!this.checkHasSelected()){
        return false
      }

      this.selected.filter((el) => {
        let newInvoice = Object.assign({}, el);
        newInvoice.id = uuid.v4()
        newInvoice.name = el.name+" (Copy)"
        delete newInvoice.done
        this.invoicesList.push(newInvoice.id)
        userSession.putFile(STORAGE_FILE, JSON.stringify(this.invoicesList), this.$ENCRYPT)

        let invoiceFile = newInvoice.id + '.json'
        userSession.putFile(invoiceFile, JSON.stringify(newInvoice), this.$ENCRYPT)
        this.invoices.push(newInvoice)
      });
    },

    deleteInvoices() {
      if(!this.checkHasSelected()){
        return false
      }

      const newInvoicesList = this.invoicesList.filter((el) => {
        return !this.selected.some((f) => {
          return f.id === el
        })
      })

      if(this.activeIndex === 0){
        this.selected.map((el) => {
          userSession.deleteFile(el.id+'.json')
        })

        userSession.putFile(STORAGE_FILE, JSON.stringify(newInvoicesList), this.$ENCRYPT)
        this.invoices = this.invoices.filter((el) => {
          return !this.selected.some((f) => {
            return f.id === el.id
          })
        })
      }else{
        userSession.putFile(ARCHIVED_FILE, JSON.stringify(newInvoicesList), this.$ENCRYPT)
        this.invoices = this.invoices.filter((el) => {
          return !this.selected.some((f) => {
            return f.id === el.id
          })
        })
      }

      this.$set(this.table1, 'data', this.invoices)
      //this.table1.data = this.invoices

      this.selected = []
      this.deselectAll()
    },

    deselectAll(){
      this.invoices.map( item => {
        delete item.done
      })
    },

    printPDF() {
      this.loadingDownload = true
      var pdf = new jsPDF('p', 'pt', 'letter');
      let invoice = document.getElementById('printInvoice')
      pdf.html(invoice, {
        callback: (pdf) => {
          pdf.save(this.invoice.name+'.pdf');

          this.$notify({
            message: 'Invoice PDF saved successfully',
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

    loadCompanyLogo () {
      userSession.getFile(this.company.logo, this.$DECRYPT).then((logoImage) => {
        if(!logoImage){ return false }
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
        year: '',
        month: '',
        quarter: '',
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

    changeViewType (index,option) {
      this.activeIndex = index

      if(option === 'Archived'){
        this.loadArchived()
      }else{
        this.loadingPage = true
        this.invoices = []
        this.fetchData()
      }
    },

    loadArchived(){
      this.loadingPage = true
      this.invoices = []

      // Load Invoices data
      userSession.getFile(ARCHIVED_FILE, this.$DECRYPT).then((invoices) => {
        if(!invoices){ 
          this.invoicesList = []
        }else{
          this.invoicesList = JSON.parse(invoices)
        }
        var i = 0

        for (i in this.invoicesList) {
          userSession.getFile(this.invoicesList[i], this.$DECRYPT).then((invoice) => {
            if (invoice === null) {
              return false
            }

            invoice = JSON.parse(invoice)
            //let searchInvoice = this.invoicesList.indexOf(invoice.id)
            this.$set(this.invoices, this.invoices.length, invoice)
            this.invoicesList[i] = invoice.id
          })
        }

        setTimeout(() => {
          this.table1.data = this.invoices
          this.loadingPage = false
        }, 700);
      })
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
      const loadInvoicesAll = async () => {
        const data = await userSession.getFile(COMPANY_FILE, this.$DECRYPT).then((company) => {
          if(!company){ 
            this.company = {}
          }else{
            this.company = JSON.parse(company)
          }

          this.invoice.payment = this.company.payment
          this.invoice.comments = this.company.comments
          this.invoice.tax = this.company.vat
          this.invoice.logo = this.company.logo

          // Load Invoices data
          return userSession.getFile(STORAGE_FILE, this.$DECRYPT).then((invoices) => {
            if(invoices){ 
              this.invoicesList = JSON.parse(invoices)
            }
            
            return Promise.all(
              this.invoicesList.map((invoiceFile) => {
                userSession.getFile(invoiceFile + '.json', this.$DECRYPT).then((invoice) => {
                  if (invoice === null) {
                    this.invoicesList.splice(i,1)
                    return false
                  }

                  invoice = JSON.parse(invoice)
                  let searchInvoice = this.invoicesList.indexOf(invoice.id)
                  this.$set(this.invoices, searchInvoice, invoice)
                },(error) => {
                  console.log("Error loading the Invoice file: "+error)
                })
              })
            )
          },(error) => {
            console.log("Error loading the Invoices files: "+error)
          })       
        })        
      }

      loadInvoicesAll().then( () => {
        setTimeout(() => { 
          this.table1.data = this.invoices
          this.loadingPage = false
        }, 700)
      })
      
      // Load Customers
      userSession.getFile(CUSTOMERS_FILE, this.$DECRYPT).then((customers) => {
        if(!customers){
          this.customersList = []
        }
        this.customersList = JSON.parse(customers)
        var i = 0

        for (i in this.customersList) {
          userSession.getFile(this.customersList[i] + '.json', this.$DECRYPT).then((customer) => {
            if(!customer){
              return false
            }
            customer = JSON.parse(customer)
            let searchCustomer = this.customersList.indexOf(customer.id)
            this.$set(this.customers, searchCustomer, customer)
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
        userSession.putFile(STORAGE_FILE, JSON.stringify(this.invoicesList), this.$ENCRYPT)
        isNew = true
      }

      let invoiceFile = this.invoice.id + '.json'
      this.invoice.total = this.total
      this.invoice.vat = this.vat
      this.invoice.subtotal = this.subtotal
      this.invoice.year = this.invoice.date.substr(0,4)
      this.invoice.month = this.invoice.date.substr(5,2)
      this.invoice.quarter = 'Q'+(this.invoice.month % 4)

      console.log(this.invoice)
      userSession.putFile(invoiceFile, JSON.stringify(this.invoice), this.$ENCRYPT)

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
      userSession.putFile(invoiceFile, JSON.stringify(this.invoice), this.$ENCRYPT)
    },

    saveToFolder(folder) {
      console.log('saveToFolder '+folder)
      if(!this.checkHasSelected()){
        return false
      }

      //Remove from current file list
      const newInvoicesList = this.invoicesList.filter((el) => {
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
              type: 'Invoice',
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
      userSession.putFile(STORAGE_FILE, JSON.stringify(newInvoicesList), this.$ENCRYPT)
      this.invoices = this.invoices.filter((el) => {
        return !this.selected.some((f) => {
          return f.id === el.id
        })
      })

      this.table1.data = this.invoices
      this.selected = []
      this.deselectAll()
      this.showArchive = false
    },

    orderBy(field){
      console.log("order by field: "+field)
      this.invoices.sort((a,b) => {
        if(field === "name" || field === "client"){
          return (a.field.toUpperCase() <= b.field.toUpperCase()) ? -1 : 1;
        }else if(field === "total" || field === "date"){
          return a.field - b.field
        }
      })
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
  async created() {
    this.loadingPage = true
    this.fetchData()

    if(this.$route.query.newInvoice){
      this.openNewInvoice()
    }
  },
  async mounted () {
    this.i18n = this.$i18n
    this.activeIndex = 0

    this.$on('online', () => {
      if(this.invoices.length === 0){
        this.fetchData()
      }
    })
  }
}
</script>
<style scoped>
  .content-main-card .card{
    height: 100%;
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
  .modal-dialog{
    transform: translate(0,-15%) !important;
  }
  .modal .modal-header .close{
    margin-top:-22px !important;
    color:#000 !important;
  }
  .btn-danger{
    color:#333 !important;
    background:transparent;
    background-color: none;
    text-decoration: underline;
  }
  .table>thead>tr>th{
    color:#041f658c;
  }
</style>

<template>
  <div class="content" style='/*opacity:0.35;*/'>
    <div v-if='loadingPage' style='position: relative;top: 100px;z-index: 9999;text-align: center;font-size: 64px;'>
      <div class='text-center pt-5 mt-5' v-if='loadingPage'>
        <breeding-rhombus-spinner
          :animation-duration="2000"
          :size="65"
          color="#344675"
          style='margin:0px auto;'
        />
      </div>
    </div>
    <template v-if='!loadingPage'>
      <div class=''>
        <div v-if='(totalInvoices == 0 && totalExpenses == 0)' class='col-12 alert text-left alert-light' role='alert' style='opacity:0.6;border:0px;'> 
          Welcome! Create <router-link to="invoices?newInvoice=true" style='color:#222;'>new invoices</router-link> & <router-link to="expenses?newExpense=true" style='color:#222;'>expenses</router-link> to start getting some information in the dashboard! 
        </div>
      </div>
      <div class="row">
        <div class="col-12 col-sm-7">
          <card type="chart">
            <template slot="header">
              <div class="row">
                <div class="col-sm-12 text-left">
                  <h5 class="card-category">Lasts 12 Months</h5>
                  <h2 class="card-title">
                    Total Earnings: <span class='ml-3' style='font-weight:400;'>+{{totalInvoices}}</span> <span style='font-size:0.8rem;'>{{company.currencySymbol}}</span>
                  </h2>
                  <div class='row px-1' style='font-size:13px;font-weight: 200;'>
                    <div class='col-4 text-center'>
                      Avg Month: <strong>{{averageInvoice.total}}</strong> <span style='font-size:0.5rem;'>{{company.currencySymbol}}</span>
                    </div>
                    <div class='col-4 text-center'>
                      Avg Invoice: <strong>{{averageInvoice.perInvoice}}</strong><span style='font-size:0.5rem;'>{{company.currencySymbol}}</span>
                    </div>
                    <div class='col-4 text-center'>
                      Last Month: <strong>+{{averageInvoice.lastMonthTendency}}%</strong> <span class='ml-1 tim-icons icon-minimal-up'></span>
                    </div>
                  </div>
                </div>
                <div class="col-sm-6 text-right" style='display:none;' v-if='false'>
                  <div class="btn-group btn-group-toggle" data-toggle="buttons float-right">
                     <label v-for="(option, index) in bigLineChartCategories" :key="option" class="btn btn-success btn-sm btn-simple" :class="{active:bigLineChart.activeIndex === index}" :id="index">
                        <input type="radio" @click="initBigChart(index)" name="options" autocomplete="off" :checked="bigLineChart.activeIndex === index">
                        {{ option }}
                     </label>
                  </div>
                </div>
              </div>
            </template>
            <line-chart
              class="chart-area"
              ref="bigChart"
              chart-id="big-line-chart"
              :chart-data="bigLineChart.chartData"
              :gradient-colors="bigLineChart.gradientColors"
              :gradient-stops="bigLineChart.gradientStops"
              :extra-options="bigLineChart.extraOptions">
            </line-chart>
          </card>
        </div>
        <div class="col-12 col-sm-5">
          <card type="chart" cardCol>
            <template slot="header">
              <div class="row">
                <div class="col-sm-12 text-left mb-3">
                  <h5 class="card-category">Lasts 6 Months</h5>
                  <h2 class="card-title">
                    {{$t('dashboard.totalShipments')}}: <span class='ml-3' style='font-weight:400;'>{{totalInvoicesVAT}}</span> <span style='font-size:0.8rem;'>{{company.currencySymbol}}</span>
                  </h2>
                </div>
              </div>
            </template>
            <line-chart
              class="chart-area"
              ref=greenLineChart
              chart-id="green-line-chart"
              :chart-data="greenLineChart.chartData"
              :gradient-colors="greenLineChart.gradientColors"
              :gradient-stops="greenLineChart.gradientStops"
              :extra-options="greenLineChart.extraOptions">
            </line-chart>
          </card>
        </div> 
      </div>
      <div class="row">
        <div class="col-12 col-sm-7">
          <card type="chart" cardCol >
          <template slot="header">
            <h5 class="card-category">Lasts 12 Months</h5>
            <h3 class="card-title">
              {{$t('dashboard.dailySales')}}: <span class='ml-3' style='font-weight:400;'>-{{totalExpenses}}</span> <span style='font-size:0.8rem;'>{{company.currencySymbol}}</span>
            </h3>
            <div class='row px-1' style='font-size:13px;font-weight: 200;'>
              <div class='col-4 text-center'>Avg Month: <strong>{{averageExpense.total}}</strong><span style='font-size:0.5rem;'>{{company.currencySymbol}}</span></div>
              <div class='col-4 text-center'>Avg Expense: <strong>{{averageExpense.perExpense}}</strong><span style='font-size:0.5rem;'>{{company.currencySymbol}}</span></div>
              <div class='col-4 text-center'>Last Month: <strong>+{{averageExpense.lastMonthTendency}}%</strong> <span class='ml-1 tim-icons icon-minimal-up'></span></div>
            </div>
          </template>
            <line-chart
              class="chart-area"
              ref="blueBarChart"
              chart-id="blue-bar-chart"
              :chart-data="blueBarChart.chartData"
              :gradient-stops="blueBarChart.gradientStops"
              :extra-options="blueBarChart.extraOptions">
            </line-chart>
          </card>
        </div>
             
        <div class="col-12 col-sm-5">
          <card type="chart" cardCol>
            <template slot="header" class='mb-3'>
              <h5 class="card-category">Lasts 6 Months</h5>
              <h3 class="card-title mb-4">
                Expenses VAT: <span class='ml-3' style='font-weight:400;'>{{totalExpensesVAT}}</span> <span style='font-size:0.8rem;'>{{company.currencySymbol}}</span>
              </h3>
            </template>
            <line-chart
              class="chart-area"
              ref="purpleLineChart"
              chart-id="purple-line-chart"
              :chart-data="purpleLineChart.chartData"
              :gradient-stops="purpleLineChart.gradientStops"
              :extra-options="purpleLineChart.extraOptions">
            </line-chart>
          </card>
        </div>
      </div>

      <div class="row" v-if='false'>
        <div class="col-lg-6 col-md-12">
          <card type="tasks">
            <template slot="header">
              <h6 class="title d-inline">Tasks(5)</h6>
              <p class="card-category d-inline">Today</p>
              <drop-down tag="div">
                <button aria-label="Settings menu" data-toggle="dropdown" class="dropdown-toggle btn-rotate btn btn-link btn-icon">
                  <i class="tim-icons icon-settings-gear-63"></i>
                </button>
                <ul class="dropdown-menu dropdown-menu-right">
                  <a href="#pablo" class="dropdown-item">Action</a>
                  <a href="#pablo" class="dropdown-item">Another Action</a>
                  <a href="#pablo" class="dropdown-item">Something else</a>
                </ul>
              </drop-down>
            </template>
            <div class="table-full-width table-responsive">
              <task-list></task-list>
            </div>
          </card>
        </div>
        <div class="col-lg-6 col-md-12">
          <card class="card">
            <h4 slot="header" class="card-title mb-0 pb-0">
              Customers
            </h4>
            <div class="table-responsive">
              <user-table></user-table>
            </div>
          </card>
        </div>
      </div>
    </template>
  </div>
</template>
<script>

import {
  Card
} from '@/components/index'

import Vue from 'vue'
import { BreedingRhombusSpinner } from 'epic-spinners'
import LineChart from '@/components/Charts/LineChart'
import BarChart from '@/components/Charts/BarChart'
import * as chartConfigs from '@/components/Charts/config'
import TaskList from './Dashboard/TaskList'
import UserTable from './Dashboard/UserTable'
import config from '@/config'

var INVOICES_FILE = 'invoices.json'
var EXPENSES_FILE = 'expenses.json'
var COMPANY_FILE = 'company.json'

export default {
  components: {
    Card,
    LineChart,
    BarChart,
    TaskList,
    UserTable,
    BreedingRhombusSpinner
  },
  data () {
    return {
      company: {},
      loadingPage: true,
      listMonths: [],
      invoicesList: [],
      invoices: [],
      expenses: [],
      totalInvoices: 0,
      totalInvoicesVAT: 0,
      monthlyInvoices: [],
      monthlyVAT: [],
      totalExpenses: 0,
      totalExpensesVAT: 0,
      monthlyExpenses: [],
      monthlyExpensesVAT: [],
      averageInvoice: { 'total':0, 'perInvoice':0, 'tendency':0, 'lastMonthTendency':0 },
      averageExpense: { 'total':0, 'perExpense':0, 'tendency':0, 'lastMonthTendency':0 },
      bigLineChartCategories: [
        'Accounts',
        'Purchases',
        'Sessions'
      ],
      bigLineChart: {
        allData: [
          [1000, 700, 900, 700, 850, 600, 750, 600, 900, 800, 1100, 1000],
          [80, 120, 105, 110, 95, 105, 90, 100, 80, 95, 70, 120],
          [60, 80, 65, 130, 80, 105, 90, 130, 70, 115, 60, 130]
        ],
        activeIndex: 0,
        chartData: { datasets: [{ }] },
        extraOptions: chartConfigs.purpleChartOptions,
        gradientColors: config.colors.primaryGradient,
        gradientStops: [1, 0.4, 0],
        categories: []
      },
      greenLineChart: {},
      purpleLineChart: {},
      blueBarChart: {}
    }
  },
  methods: {
    initBigChart (index) {
      //let chartData = {
      this.bigLineChart.chartData = {
        datasets: [{
          fill: true,
          borderColor: config.colors.primary,
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: config.colors.primary,
          pointBorderColor: 'rgba(255,255,255,0)',
          pointHoverBackgroundColor: config.colors.primary,
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
          data: this.monthlyInvoices.slice(-12)
        }],
        labels: this.listMonths.slice(-12)
      }

      this.bigLineChart.activeIndex = index
    },

    initChart2 (){
      this.greenLineChart = {
        extraOptions: chartConfigs.purpleChartOptions,
        chartData: {
          labels: this.listMonths.slice(-6),
          datasets: [{
            label: '',
            fill: true,
            borderColor: config.colors.primary,
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: config.colors.primary,
            pointBorderColor: 'rgba(255,255,255,0)',
            pointHoverBackgroundColor: config.colors.primary,
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: this.monthlyVAT.slice(-6)
          }]
        },
        gradientColors: config.colors.primaryGradient,
        gradientStops: [1, 0.4, 0]
      }
    },

    initChart3 (){
      this.purpleLineChart = {
        extraOptions: chartConfigs.purpleChartOptions,
        chartData: {
          labels: this.listMonths.slice(-6),
          datasets: [{
            label: '',
            fill: true,
            borderColor: config.colors.primary,
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: config.colors.primary,
            pointBorderColor: 'rgba(255,255,255,0)',
            pointHoverBackgroundColor: config.colors.primary,
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: this.monthlyExpenses.slice(-6)
          }]
        },
        gradientColors: config.colors.primaryGradient,
        gradientStops: [1, 0.4, 0]
      }
    },

    initChart4 (){
      this.blueBarChart = {
        extraOptions: chartConfigs.purpleChartOptions,
        chartData: {
          labels: this.listMonths.slice(-12),
          datasets: [{
            label: 'Data',
            fill: true,
            borderColor: config.colors.primary,
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBorderColor: 'rgba(255,255,255,0)',
            pointHoverBackgroundColor: config.colors.primary,
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: this.monthlyExpenses.slice(-12)
          }]
        },
        gradientColors: config.colors.primaryGradient,
        gradientStops: [1, 0.4, 0]
      }
    },

    fetchData(){
      // Load Invoices data
      userSession.getFile(INVOICES_FILE, this.$DECRYPT).then((invoices) => {
        if(!invoices){ 
          this.invoicesList = []
        }else{
          this.invoicesList = JSON.parse(invoices)
        }
        var i = 0
        var j = 0
        if(this.invoicesList.length === 0){
          this.calcInvoices()
        }

        for (i in this.invoicesList) {
          userSession.getFile(this.invoicesList[i] + '.json', this.$DECRYPT).then((invoice) => {
            if (invoice === null) {
              this.invoicesList.splice(i,1)
              return
            }

            invoice = JSON.parse(invoice)
            let searchInvoice = this.invoicesList.indexOf(invoice.id)
            this.$set(this.invoices, searchInvoice, invoice)

            if(j === (this.invoicesList.length - 1)) {
              this.calcInvoices()
            }
            j++
          })
        }        
      })

      // Load Expenses data
      userSession.getFile(EXPENSES_FILE, this.$DECRYPT).then((expenses) => {
        if(!expenses){
          this.expensesList = []
        }else{
          this.expensesList = JSON.parse(expenses)
        }
        var i = 0
        var j = 0
        if(this.expensesList.length === 0){
          this.calcExpenses()
        }

        for (i in this.expensesList) {
          userSession.getFile(this.expensesList[i] + '.json', this.$DECRYPT).then((expense) => {
            if (!expense) {
              //this.expensesList.splice(i,1)
              j++
              return
            }

            expense = JSON.parse(expense)
            let searchExpense = this.expensesList.indexOf(expense.id)
            this.$set(this.expenses, searchExpense, expense)

            if(j === (this.expensesList.length - 1)) {
              this.calcExpenses()
            }
            j++
          })
        }
      })

      // Load Customers
      userSession.getFile(COMPANY_FILE, this.$DECRYPT).then((company) => {
        if(!company){ 
          this.company = {}
          this.company.currency = '$'
        }else{
          this.company = JSON.parse(company)
        }
      })
    },

    getLastMonths() {
      var theMonths = new Array('JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC')
      var today = new Date()
      var aMonth = today.getMonth()
      var i
      for (i=0; i<=11; i++) {
        this.listMonths[(11-i)] = theMonths[aMonth]
        aMonth--
        if (aMonth < 0) {
          aMonth = 11
        }
      }
    },

    calcInvoices() {
      var total = 0
      var totalVAT = 0
      var monthlyInvoices = []
      var monthlyVAT = []

      for(let i=1;i<=12;i++){
        monthlyInvoices[i] = 0
        monthlyVAT[i] = 0
      }

      this.invoices.map((invoice) => {
        monthlyInvoices[parseInt(invoice.date.substr(5,2),10)] += invoice.total
        monthlyVAT[parseInt(invoice.date.substr(5,2),10)] += invoice.vat
        total = total + invoice.total
        totalVAT = totalVAT + invoice.vat
      })

      delete monthlyInvoices[0]
      delete monthlyVAT[0]

      this.totalInvoices = (total).toFixed(2)
      this.totalInvoicesVAT = (totalVAT).toFixed(2)
      this.monthlyInvoices = monthlyInvoices
      this.monthlyVAT = monthlyVAT

      this.averageInvoice.total = (total / 12).toFixed(2)
      if(!this.invoices.length){
        this.averageInvoice.perInvoice = 0
        this.averageInvoice.lastMonthTendency = 0
      }else{
        this.averageInvoice.perInvoice = (total / this.invoices.length).toFixed(2)
        this.averageInvoice.lastMonthTendency = (100 - ((monthlyInvoices[11] * 100) / (monthlyInvoices[12] === 0 ? 1 : monthlyInvoices[12]))).toFixed(2)

      }
      this.averageInvoice.tendency = 0

      this.initBigChart(0)      
      this.initChart2()

      this.loadingPage = false
    },

    calcExpenses() {
      var total = 0
      var totalVAT = 0
      var monthlyExpenses = []
      var monthlyVAT = []
      
      for(let i=1;i<=12;i++){
        monthlyExpenses[i] = 0
        monthlyVAT[i] = 0
      }

      this.expenses.map((expense) => {
        monthlyExpenses[parseInt(expense.date.substr(5,2),10)] += expense.total
        monthlyVAT[parseInt(expense.date.substr(5,2),10)] += expense.vat
        total = total + expense.total
        totalVAT = totalVAT + expense.vat
      })

      delete monthlyExpenses[0]
      delete monthlyVAT[0]

      this.totalExpenses = (total).toFixed(2)
      this.totalExpensesVAT = (totalVAT).toFixed(2)
      this.monthlyExpenses = monthlyExpenses
      this.monthlyExpensesVAT = monthlyVAT

      this.averageExpense.total = (total / 12).toFixed(2)
      if(!this.expenses.length){
        this.averageExpense.perInvoice = 0
        this.averageExpense.lastMonthTendency = 0
      }else{
        this.averageExpense.perInvoice = (total / this.expenses.length).toFixed(2)
        this.averageExpense.lastMonthTendency = (100 - ((monthlyExpenses[11] * 100) / (monthlyExpenses[12] === 0 ? 1 : monthlyExpenses[12]))).toFixed(2)
      }
      this.averageExpense.tendency = 0

      this.initChart3()
      this.initChart4()

      this.loadingPage = false
    }
  },
  async created (){
    this.getLastMonths()
    await this.fetchData()
  },
  mounted () {
    this.i18n = this.$i18n
  }
}
</script>
<style scoped>
  .card{
    min-height: 93% !important;
  }
  .card-title{
    font-size: 1.21rem !important;
  }
  .card-chart .card-body{
    margin-top: 1rem !important;
    padding-bottom: 0 !important;
  }
</style>

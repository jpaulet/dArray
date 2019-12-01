<template>
  <div class="content content-main-card">
    <card>
      <div id="container">
        <div>
          <div @click="openFilePicker" id="uploader" class='mb-4'>
            <p><span style='color:rgb(52, 70, 117);'>Click</span> to choose a file to upload</p>
            <input type="file" ref="filepicker" @change="uploadFile" />
          </div>

          <div v-if='!loadingPage'>
            <h4 class='text-left'> Path </h4>
            <div class='text-left mb-3'>
              <a href='#' @click.prevent='changeFolder("/",0)' class='text-left text-muted badge badge-light' style='font-size:11px;line-height:14px;color:#fff !important;background-color:#344675;'> /Home </a>
              <a v-if='path !== "/" && folder !== "/" && folder !== ""' v-for='(folder,index) in path.split("/")' :key='index' @click.prevent='changeFolder(folder,index+1)' href='#' class='text-left text-muted badge badge-light ml-2' style='font-size:11px;line-height:14px;color:#fff !important;background-color:#344675;'> /{{folder}} </a>
            </div>

            <h4 class='text-left'> Folders </h4>
            <div class='text-left row' style='clear:both;'>
              <div v-for='(folder,index) in folders' :key='index' class='text-center folder' style='cursor:pointer;padding:8px 15px;width:90px;margin-right:30px;float:left;' @click='changeFolder(folder,currentDepth+1)'>
                <img src='@/assets/img/folder.png' height='42' />
                <p style='font-size:11px;margin-top:5px;'>{{folder}}</p>
              </div>
              <div v-if='currentDepth < 5' class='text-center folder' style='cursor:pointer;padding:8px 15px;width:115px;margin-right:0px;float:left;' @mousedown='openNewFolder()'>
                <img src='@/assets/img/folderplus.png' height='42' />
                <div v-if='!newFolder' style='font-size:11px;margin-top:5px;'>New Folder</div>
                <input v-if='newFolder' v-model='folderName' ref="newFolder" id='newFolder' type='form-control' name='New Folder' placeholder="Folder name" style='width:90px;height:26px;font-size:11px;padding:3px;border-radius:8px;border:1px solid #eee;' />
                <button v-if='newFolder' @click.prevent='saveFolder()' type='submit' class='btn btn-primary btn-sm' style='font-size:11px;width:90px;'> Save </button>
              </div>
            </div>

            <h4 class='mt-4 text-left' style='width:100%;clear:both;'> Your Files </h4>
            <div class='row'>
              <div class="upload col-6" v-for="(upload, index) in uploads" :key="index" style='cursor:pointer;min-width:280px;' @click='downloadFile(upload.id,upload.name,upload.extension,upload.type)'>
                <div class="ext" :style="{'background-color': upload.color}">
                  <p>{{upload.ext.toUpperCase()}}</p>
                </div>
                <div class="upload-details">
                  <div class="name-container">
                    <p class="filename">{{upload.name}}</p>
                    <div>
                      <p class="filesize">{{upload.size}}</p>
                      <p @click.prevent="removeUpload(index)" class="cancel-btn" style='border:1px solid #eee;border-radius:50%;width:18px;height:18px;line-height:15px;font-size:12px;text-align:center;'>x</p>
                    </div>
                  </div>
                  <div class="upload-bar" v-if="upload.progress !== '100%'">
                    <div class="upload-progress" :style="{width: upload.progress}"></div>
                  </div>
                </div>
              </div>
              <div class='' v-if='!uploads.length'>
                  <div class='p-5'> No files yet. </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class='text-center pt-5 mt-5' v-if='loadingPage'>
        <breeding-rhombus-spinner
          :animation-duration="2000"
          :size="65"
          color="#344675"
          style='margin:0px auto;'
        />
      </div>
    </card>
  </div>
</template>
<script>
import { BreedingRhombusSpinner } from 'epic-spinners'
import { userSession } from '@/userSession'
import {
  Card
} from '@/components/index'
var FILESYSTEM = 'filesystem.json'
var FOLDERS = 'folders.json'

export default {
  components: {
    Card,
    BreedingRhombusSpinner
  },
  data () {
    return {
      path: '/',
      uploads: [],
      folders: ['Invoices', 'Expenses'],
      colors: ['#24bddf', '#5fcc9c', '#6a65d8'],
      newFolder: false,
      folderName: '',
      currentDepth: 0,
      loadingPage: false
    }
  },
  methods: {
    fetchData () {
      this.loadingPage = true
      // Load Files
      userSession.getFile(FILESYSTEM, this.$DECRYPT).then((filesystem) => {
        if(!filesystem){
          return false
        }
        this.uploads = JSON.parse(filesystem || [])
        let i = 0

        for (i in this.uploads) {
          this.uploads[i].progress = '100%'
        }

        userSession.getFile(FOLDERS, this.$DECRYPT).then((folders) => {
          if (!folders) {
            if (this.path === '/') {
              this.folders = ['Invoices', 'Expenses']
              userSession.putFile(FOLDERS, JSON.stringify(this.folders), this.$ENCRYPT)
            }
          } else {
            this.folders = JSON.parse(folders || [])
          }
          this.loadingPage = false
        }).catch(function(e) {
          console.log("Error: "+e)
          this.loadingPage = false
        })
      }).catch(function(e) {
        console.log("Error: "+e)
        this.loadingPage = false
      })      
    },

    changeFolder (folder, depth) {
      this.loadingPage = true
      let localPath = this.path
      if (localPath === '/') {
        localPath = folder + '/'
      } else {
        if(this.currentDepth > depth){
          var the_arr = localPath.replace(/^\/|\/$/g, '').split('/')
          for(let i=depth;i<this.currentDepth;i++){ 
            the_arr.pop()
          }
          localPath = the_arr.join('/') + '/'
        }else{
          localPath = localPath + folder + '/'
        }
      }

      if (folder === '/') {
        this.path = ''
      } else {
        this.path = localPath
      }
      this.currentDepth = depth
      this.uploads = []

      userSession.getFile(this.path + FOLDERS, this.$DECRYPT).then((filesystem) => {
        if (!filesystem) {
          if (this.path === '/') {
            this.folders = ['Invoices', 'Expenses']
          } else {
            this.folders = []
          }
          this.loadingPage = false
          return false
        }
        this.folders = JSON.parse(filesystem || [])

        userSession.getFile(this.path + FILESYSTEM, this.$DECRYPT).then((filesystem) => {
          if (!filesystem) {
            this.uploads = []
            this.loadingPage = false
            return false
          }
          this.uploads = JSON.parse(filesystem || [])
          let i = 0

          for (i in this.uploads) {
            this.uploads[i].progress = '100%'
          }

          this.loadingPage = false
        })
      })
    },

    saveFolder () {
      this.folderName = this.folderName.toLowerCase().replace(/\s/g, '')
      this.folders.push(this.folderName)

      this.folderName = ''
      this.newFolder = false

      let localPath = this.path
      if (localPath === '/') {
        localPath = ''
      }
      userSession.putFile(localPath + FOLDERS, JSON.stringify(this.folders), this.$ENCRYPT)
    },

    openNewFolder () {
      this.newFolder = true
      this.$nextTick(() => this.$refs.newFolder.focus())
    },

    closeNewFolder () {
      this.newFolder = false      
    },

    getRandomColor (type) {
      const randomIndex = Math.floor(Math.random() * 3)
      return this.colors[randomIndex]
    },

    removeUpload (index) {
      let localPath = this.path
      if (localPath === '/') {
        localPath = ''
      }
      clearInterval(this.uploads[index].progressTimer)
      userSession.deleteFile(localPath + this.uploads[index].id + '_' + this.uploads[index].name)
      this.uploads.splice(index, 1)
      userSession.putFile(localPath + FILESYSTEM, JSON.stringify(this.uploads), this.$ENCRYPT)
    },

    openFilePicker () {
      this.$refs.filepicker.click()
    },

    uploadFile () {
      let reader = new FileReader()
      const input = this.$refs.filepicker
      const file = input.files[0]
      var dataURL = null
      let extension = file.name.substring(file.name.lastIndexOf('.') + 1, file.name.length)
      if (extension === 'jpg' || extension === 'jpeg' || extension === 'gif' || extension === 'png' || extension === 'bmp') {
        var type = 'image'
      }else{
        var type = 'file'
      }

      const upload = {
        id: this.uploads.length + 1,
        name: file.name,
        path: this.path + '/' + file.name,
        size: this.getFileSize(file.size),
        progress: '0%',
        ext: extension,
        progressTimer: null,
        type: type,
        color: this.getRandomColor(extension)
      }

      let localPath = this.path
      if (localPath === '/') {
        localPath = ''
      }

      this.uploads.push(upload)
      const timer = setInterval(this.updateProgress, 300, upload.id)
      upload.progressTimer = timer

      reader.onload = () => {
        dataURL = reader.result
        userSession.putFile(this.path + upload.id + '_' + upload.name, dataURL, this.$ENCRYPT)
      }

      reader.readAsDataURL(input.files[0])
      userSession.putFile(this.path + FILESYSTEM, JSON.stringify(this.uploads), this.$ENCRYPT)
    },

    getFileSize (size) {
      if (size < 1000000) return `${Math.ceil(size / 1024)} kb`
      else if (size >= 1000000) return `${Math.ceil(size / 1024000)} mb`
    },

    updateProgress (id) {
      const index = id - 1
      const progress = Number.parseInt(
        this.uploads[index].progress.replace('%', '')
      )

      this.$set(this.uploads[index], 'progress', `${progress + 10}%`)
      if (progress + 10 === 100) clearInterval(this.uploads[index].progressTimer)
    },

    downloadFile (id, filename, extension, type) {
      if (type === 'Invoice') {
        userSession.getFile(this.path + filename, this.$DECRYPT).then((theFile) => {
          if (theFile === null) {
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

          var element = document.createElement('a')
          element.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(theFile))
          element.setAttribute('download', filename)

          element.style.display = 'none'
          document.body.appendChild(element)
          element.click()
          document.body.removeChild(element)
        })

        return true
      }

      userSession.getFile(this.path + id + '_' + filename, this.$DECRYPT).then((theFile) => {
        if (theFile === null) {
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

        extension = filename.substr(filename.indexOf('.') + 1,filename.lenght)
        var element = document.createElement('a')
        element.setAttribute('href', theFile)
        element.setAttribute('download', filename)

        element.style.display = 'none'
        document.body.appendChild(element)
        element.click()
        document.body.removeChild(element)
      })
    }
  },
  async mounted () {
    this.i18n = this.$i18n
    this.fetchData()
  }
}
</script>

<style lang='scss'>
#container {
  background-color: white;
  margin: auto;
  /* box-shadow: 0px 40px 25px 0px rgba(132, 223, 220, 0.3); */
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 16px;
}

.folder:hover{
  box-shadow:1px 1px 2px #eee;
}

.upload:hover{
  background-color:#d5dcff70;
}

#uploader {
  height: 100px;
  border: 2px dashed #9092a5bd;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  text-align: center;
  padding: 0px 16px;

  input {
    display: none;
  }

  p {
    font-size: 18px;
    color: #b6b6b6;

    span {
      color: #6859da;
      font-weight: bold;
    }
  }
}

.upload {
  padding:12px;
  border-radius:12px;
  display: flex;
  align-items: center;

  .ext {
    width: 56px;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    margin-right: 16px;

    p {
      font-size: 14px;
      color: white;
      font-weight: bold;
      margin-top: 5px;
    }
  }

  .name-container {
    display: flex;
    justify-content: space-between;
    font-size: 15px;

    .filename {
      color: #424242;
      margin-right: 16px;
    }

    div {
      display: flex;
      align-items: center;

      p:nth-child(1) {
        color: #9d9d9d;
      }

      p:nth-child(2) {
        margin-left: 16px;
        cursor: pointer;
        color: #e4e4e4;
      }
    }
  }

  .upload-details {
    width: 100%;
  }

  .upload-bar {
    width: 100%;
    margin-top: 8px;
    border-radius: 5px;
    background-color: #ebf6f4;

    .upload-progress {
      height: 10px;
      background-color: #04cd8e;
      border-radius: 5px;
      transition: all 400ms;
    }
  }
}

.upload:hover .cancel-btn{
  border:1px solid #bbb !important;
  color:#bbb !important;
}

@media screen and (max-width: 567px){
  #container{
    width: 85%;
  }
}
</style>

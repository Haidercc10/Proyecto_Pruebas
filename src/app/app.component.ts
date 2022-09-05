import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, Input} from '@angular/core';
import { FingerprintReader,
   SampleFormat,
   DeviceConnected,
   DeviceDisconnected,
   SamplesAcquired,
   AcquisitionStarted,
   AcquisitionStopped, } from '@digitalpersona/devices';
import './core/modules/WebSdk';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{

  listaFingerPrintReader : any;
  infoFingerPrintReader : any;
  listaSamplesFingerPrint : any;
  currentImageFinger : any;
  currentImageFingerFixed : any;

  private reader : FingerprintReader;

  constructor(){
    this.reader = new FingerprintReader();
  }

  private onDeviceDisconnetec = (event : DeviceDisconnected) => { }

  private onDeviceConnetec = (event : DeviceConnected) => { }

  private onAcquisitionStarted = (event : AcquisitionStarted) => {
    console.log("onAcquisitionStarted")
    console.log(event)
  }

  private onAcquisitionStopped = (event : AcquisitionStopped) => {
    console.log("onAcquisitionStopped")
    console.log(event)
  }

  private onSamplesAcquired = (event : SamplesAcquired) => {
    console.log("SamplesAcquired")
    console.log(event)
    this.listaSamplesFingerPrint = event;
  }

  ngOnInit(): void {
    this.reader = new FingerprintReader();
    this.reader.on("DeviceConnected", this.onDeviceConnetec)
    this.reader.on("DeviceDisconnetec", this.onDeviceDisconnetec)
    this.reader.on("AcquisitionStarted", this.onAcquisitionStarted)
    this.reader.on("AcquisitionStopped", this.onAcquisitionStopped)
    this.reader.on("SamplesAcquired", this.onSamplesAcquired)
    this.nf_listarDispositivos();
  }

  ngOnDestroy(): void {
    this.reader.off("DeviceConnected", this.onDeviceConnetec)
    this.reader.off("DeviceDisconnetec", this.onDeviceDisconnetec)
    this.reader.off("AcquisitionStarted", this.onAcquisitionStarted)
    this.reader.off("AcquisitionStopped", this.onAcquisitionStopped)
    this.reader.off("SamplesAcquired", this.onSamplesAcquired)
  }

  /*** Lista el dispositivo */
  nf_listarDispositivos(){
    Promise.all([
      this.reader.enumerateDevices()
    ])
    .then(result => {
      this.listaFingerPrintReader = result[0];
      console.log("Datos Dispositivo")
      console.log(this.listaFingerPrintReader);
    })
    .catch(error => { console.log(error); });
  }

  /*** Lee info del dispositivo */
  fn_DeviceInfo(){
    Promise.all([
      this.reader.getDeviceInfo(this.listaFingerPrintReader[0])
      ])
      .then(results => {
        this.infoFingerPrintReader = results[0];
        console.log("Info FingerReader");
        console.log( this.infoFingerPrintReader);
      }).catch((error) => {
        console.log(error);
      });
  }

  /*** Iniciar captura de huella */
  fn_StartCapturaFP() {
    this.reader.startAcquisition(SampleFormat.PngImage, this.infoFingerPrintReader['DeviceID']).then((response) => {
        console.log("Empezar captura");
        console.log(response);
    }).catch((error) => {
      console.log(error)
    });
  }

   /*** Detener captura de huella */
   fn_EndCapturaFP() {
    this.reader.stopAcquisition(this.infoFingerPrintReader['DeviceID'])
    .then((response) => {
        console.log("Parar captura");
        console.log(response);
    })
    .catch((error) => {
      console.log(error)
    });
  }

  /*** Tomar captura */
fn_CapturaFP() {
  var ListImages = this.listaSamplesFingerPrint['samples'];
  var lsize = Object.keys(ListImages).length;

  if(ListImages != null && ListImages != undefined) {
    if(lsize > 0) {
      this.currentImageFinger = ListImages[0];
      this.currentImageFingerFixed = this.fn_FixFormatImagenBase64(this.currentImageFinger);

      console.log(this.currentImageFinger)
      console.log(this.currentImageFingerFixed)
    }
  }
}

/*** Corregir formato base 64 */
fn_FixFormatImagenBase64(prm_imagebase : any) {
  var strImage = "";
  strImage = prm_imagebase;

  strImage = strImage.replace(/_/g, "/");
  strImage = strImage.replace(/-/g, "+");
 console.log(strImage)

 return strImage;


}

}

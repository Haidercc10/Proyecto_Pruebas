import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, Input} from '@angular/core';
import { FingerprintReader,
   SampleFormat,
   DeviceConnected,
   DeviceDisconnected,
   SamplesAcquired,
   AcquisitionStarted,
   AcquisitionStopped, } from '@digitalpersona/devices';

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
}

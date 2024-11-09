import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

import { OtherService } from 'src/app/services/other.service';

import Map from 'ol/Map';

import View from 'ol/View';

import OSM from 'ol/source/OSM';

import * as olProj from 'ol/proj';

import TileLayer from 'ol/layer/Tile';

import MousePosition from 'ol/control/MousePosition';

import { createStringXY } from 'ol/coordinate';

import { DragRotateAndZoom, defaults as defaultInteractions, } from 'ol/interaction';

import { AccountService } from 'src/app/services/account.service';

import { NgForm, UntypedFormControl } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';

import Swal from 'sweetalert2';

import { Observable, filter, from, map, mergeMap, of, startWith, toArray } from 'rxjs';

import { PersianNumberService } from 'ngx-persian';

import { Feature, Overlay } from 'ol';

import { Point } from 'ol/geom';

import VectorLayer from 'ol/layer/Vector';

import VectorSource from 'ol/source/Vector';

import { Icon, Style } from 'ol/style';

@Component({

  selector: 'app-map-dialog',

  templateUrl: './map-dialog.component.html',

  styleUrls: ['./map-dialog.component.css']
})


export class MapDialogComponent implements OnInit {

  location: any = [51.3833554, 35.6770113];

  map: any = {};

  showButton: boolean = true

  mapCursorSrc = '../../../assets/imgs/placeholder.png';

  tooltip_Data;

  constructor(public dialogRef: MatDialogRef<MapDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private PersianNumberService: PersianNumberService) { }


  ngOnInit(): void {

    if (this.data !== null && this.data.fLon !== 0 && this.data.showAllInMap === undefined) {

      this.location[0] = this.data.fLon;

      this.location[1] = this.data.fLat;

      if (this.data.button === false) this.showButton = false

      if (this.data.icon !== undefined) this.mapCursorSrc = this.data.icon;

      if (this.data.tooltip) this.tooltip_Data = this.data.tooltip;

      setTimeout(() => {

        this.newOpenMap();

      }, 100);

    }

    else if (this.data !== null && this.data.showAllInMap === true) {


      if (this.data.button === false) this.showButton = false;

      if (this.data.icon !== undefined) this.mapCursorSrc = this.data.icon;


      setTimeout(() => {

        this.newOpenMapAll();

      }, 100);

    }

  }

  newOpenMap() {
    this.map = new Map({
      interactions: defaultInteractions().extend([new DragRotateAndZoom()]),
      target: 'test',
      layers: [
        new TileLayer({
          source: new OSM({}),
        }),
      ],
      view: new View({
        center: olProj.fromLonLat(this.location),
        zoom: 17,
      }),
    });

    // initial location

    const marker = new Feature({
      geometry: new Point(olProj.fromLonLat(this.location)),
    });

    const vectorLayer = new VectorLayer({
      source: new VectorSource({
        features: [marker],
      }),
      style: new Style({
        image: new Icon({
          src: this.mapCursorSrc,
          scale: 0.5,
        }),
      }),
    });

    this.map.addLayer(vectorLayer);


    // When User On Hover in Marker

    if (this.tooltip_Data != undefined) {

      let isMouseOverMarker = false;

      this.map.on('pointermove', (event) => {

        const isHovering = this.map.hasFeatureAtPixel(event.pixel, {

          layerFilter: (layer) => layer === vectorLayer,

        });

        isMouseOverMarker = isHovering;

        if (isHovering) this.showMarkerText(marker, this.tooltip_Data);

        else this.map.getOverlays().clear();

      });

    }

    if (this.tooltip_Data == undefined) {

      this.map.on('click', (event) => {

        const clickedLocation = olProj.transform(event.coordinate, 'EPSG:3857', 'EPSG:4326');

        marker.setGeometry(new Point(olProj.fromLonLat(clickedLocation)));

        this.location = clickedLocation;

      });

    }

  }

  newOpenMapAll() {

    this.map = new Map({
      interactions: defaultInteractions().extend([new DragRotateAndZoom()]),
      target: 'test',
      layers: [
        new TileLayer({
          source: new OSM({}),
        }),
      ],
      view: new View({
        center: olProj.fromLonLat(this.location),
        zoom: 11,
      }),
    });

    const vectorSource = new VectorSource();

    for (const location of this.data.all_locationData) {
      const marker = new Feature({
        geometry: new Point(olProj.fromLonLat(location)),
      });

      const style = new Style({
        image: new Icon({
          src: this.mapCursorSrc,
          scale: 0.5,
        }),
      });

      marker.setStyle(style);

      vectorSource.addFeature(marker);
    }

    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });

    this.map.addLayer(vectorLayer);

    this.map.on('click', (event) => {
      const clickedLocation = olProj.transform(event.coordinate, 'EPSG:3857', 'EPSG:4326');
      this.location = clickedLocation;
    });
  }

  showMarkerText(marker, text) {

    if (text.iUserReqest) {

      const overlayElement = document.createElement('div');

      overlayElement.className = 'border border-2 border-dark rounded  py-2 px-4 bg-white d-flex flex-column dir align-items-center';

      const iUserReqest = document.createElement('p');

      const strReqestStatusComment = document.createElement('p');

      const strDefectType_strComment = document.createElement('p');

      strDefectType_strComment.textContent = ` درخواست : ${text.strDefectType_strComment} `

      strReqestStatusComment.textContent = `وضعیت : ${text.strReqestStatusComment}`;

      iUserReqest.textContent = `کد درخواست : ${this.PersianNumberService.toPersian(text.iUserReqest)}`;

      overlayElement.appendChild(iUserReqest)

      overlayElement.appendChild(strReqestStatusComment)

      overlayElement.appendChild(strDefectType_strComment)

      const overlay = new Overlay({

        element: overlayElement,

        offset: [0, -15], // 

        position: marker.getGeometry().getCoordinates(),

        positioning: 'bottom-center',

      });

      this.map.addOverlay(overlay);

    }

    if (text.strFullName) {

      const overlayElement = document.createElement('div');

      overlayElement.className = 'border border-2 border-dark rounded  py-2 px-4 bg-white d-flex flex-column dir align-items-center';

      const iWeight = document.createElement('p');

      const strFullName = document.createElement('p');

      strFullName.textContent = ` نام شهروند : ${text.strFullName} `

      iWeight.textContent = ` وزن تقریبی : ${this.PersianNumberService.toPersian(text.iWeight)}`;

      overlayElement.appendChild(strFullName)

      overlayElement.appendChild(iWeight)

      const overlay = new Overlay({

        element: overlayElement,

        offset: [0, -15], // 

        position: marker.getGeometry().getCoordinates(),

        positioning: 'bottom-center',

      });

      this.map.addOverlay(overlay);
    }

  }

  closeModal() {
    this.dialogRef.close({ data: this.location });
  }


}

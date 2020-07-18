import { Component, OnInit } from '@angular/core';
import { ScanLoaderService } from '../../services/scan-loader.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { MasterScan, Scan } from '../../services/master-scan.types';

@Component({
  selector: 'app-scan-webpage-detail',
  templateUrl: './scan-webpage-detail.component.html',
  styleUrls: ['./scan-webpage-detail.component.less'],
})
export class ScanWebpageDetailComponent implements OnInit {
  subscriptions: Subscription;
  scans: Scan[];
  siteName: string;
  folderName: string;

  constructor(
    private scanService: ScanLoaderService,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.subscriptions = this.route.params
      .pipe(
        map(params => [params.sitename, params.scanfoldername]),
        switchMap(siteValues => {
          this.siteName = siteValues[0];
          this.folderName = siteValues[1];
          return this.scanService.getMasterJSON(this.siteName, this.folderName);
        })
      )
      .subscribe((data: MasterScan) => {
        this.scans = data.scans;
        console.log(this.scans);
      });
  }
}
import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { UIChart } from 'primeng/chart';
import { DebtService } from '../../../../services/debt.service';

@Component({
    selector: 'app-home-summary',
    templateUrl: './home-summary.component.html',
    styleUrls: ['./home-summary.component.scss'],
    providers: [MessageService]
})
export class HomeSummaryComponent implements OnInit {
    data: any;
  isLoading: boolean = true;
    debtSummary!: number;
    creditSummary!: number;

    @ViewChild('chart') chart?: UIChart;

    constructor(
        private debtService: DebtService,
        private messageService: MessageService,
    ) {
    }

    ngOnInit() {
        this.loadDebtSummary();
        this.loadCreditSummary();
    }

    loadDebtSummary() {
        this.debtService.getDebtAmountSum().subscribe({
            next: (debtSummary: number) => {
                this.debtSummary = debtSummary;
                this.updateChartData();
            },
            error: error => {
                console.error('Error loading debt data', error);
                this.showError('Błąd Servera', 'Nie udało się pobrać sumy długów');
            }
        });
    }

    loadCreditSummary() {
        this.debtService.getCreditorAmountSum().subscribe({
            next: (creditSummary: number) => {
                this.creditSummary = creditSummary;
                this.updateChartData();
            },
            error: error => {
                console.error('Error loading credit data', error);
                this.showError('Błąd Servera', 'Nie udało się pobrać sumy wierzycielstwa');
            }
        });
    }

    updateChartData() {
        if (this.debtSummary !== undefined && this.creditSummary !== undefined) {
          this.isLoading = false;
            this.data = {
                labels: ['Długi', 'Wierzycielstwo'],
                datasets: [
                    {
                        data: [this.debtSummary, this.creditSummary],
                        backgroundColor: ['#ff6d6d', '#77DD77'],
                        hoverBackgroundColor: ['#ff6d6d', '#77DD77']
                    }
                ]
            };
            if (this.chart) {
                this.chart.reinit();
            }
        }
    }

    showError(title: string, content: string) {
        this.messageService.add({
            key: 'tr',
            severity: 'error',
            summary: title,
            detail: content,
            life: 10000
        });
    }
}

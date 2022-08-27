import { LoadingPreviewComponent } from './loading-preview/loading-preview.component';
import { CoinpaymentCreateTransactionComponent } from './coinpayment-create-transaction/coinpayment-create-transaction.component';
import { BankAccountsComponent } from './bank-accounts/bank-accounts.component';
import { WithdrawalComponent } from './withdrawal/withdrawal.component';
import { SendPaymentWithCoinPaymentComponent } from './send-payment-with-coin-payment/send-payment-with-coin-payment.component';
import { SendPaymentWithBankTransferComponent } from './send-payment-with-bank-transfer/send-payment-with-bank-transfer.component';
import { InviteReferralComponent } from './invite-referral/invite-referral.component';
import { MenuSidebarComponent } from './menu-sidebar/menu-sidebar.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialAuthComponent } from './social-auth/social-auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    SocialAuthComponent,
    ProgressBarComponent,
    MenuSidebarComponent,
    InviteReferralComponent,
    SendPaymentWithBankTransferComponent,
    SendPaymentWithCoinPaymentComponent,
    WithdrawalComponent,
    BankAccountsComponent,
    CoinpaymentCreateTransactionComponent,
    LoadingPreviewComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule
  ],
  exports: [
    SocialAuthComponent,
    ProgressBarComponent,
    MenuSidebarComponent,
    InviteReferralComponent,
    SendPaymentWithBankTransferComponent,
    SendPaymentWithCoinPaymentComponent,
    WithdrawalComponent,
    BankAccountsComponent,
    CoinpaymentCreateTransactionComponent,
    LoadingPreviewComponent
  ]
})
export class ComponentsModule { }

<?php

namespace App\Helpers;

use Yabacon\Paystack;
use App\Models\Transaction;
use App\Models\User;
use Carbon\Carbon;
use App\Models\Subscriber;

class Payment
{
    private $model;

    public function __construct(Transaction $model)
    {
        $this->model = $model;
    }

    //make paystack payment
    public function initialize($request, $cost)
    {
        $paymentReference = "VS".sprintf("%0.9s",str_shuffle(rand(12,30000) * time()));

         $tr = $this->model->create([
            'user_id' => auth()->user()->id,
            'plan_id' => $request->plan_id,
            'trans_ref' => $paymentReference
         ]);
        $payStack = new Paystack(config('paystack.paystack_secret'));
        $trx = $payStack->transaction->initialize(
            [
                'amount'=> $cost * 100, /* in kobo */
                'email'=>auth()->user()->email,
                'reference' => $paymentReference,
                'callback_url'=>"http://127.0.0.1:8000/api/v0.01/verify/$paymentReference",
                'metadata'=> [
                    'user_id'=> auth()->user()->id,
                    'reference'=> $paymentReference,
                    'transaction_id' => $tr->id,
                    'total' => $cost,
                ],
            ]
        );
        if(!$trx) {
            exit($trx->data->message);
        }
        return $trx->data->authorization_url;
    }

    //verify paystack payment
    public function verify($reference)
    {
        if (!$reference) {
            die('No reference supplied');
        }
        $payStack = new Paystack( config('paystack.paystack_secret') );
        $trx = $payStack->transaction->verify([
            'reference'=>$reference
        ]);

        if(!$trx->data->status="success"){
            exit($trx->message);
        }
        $trans_ref = $trx->data->metadata->reference;
          $transType = $this->model->where('trans_ref',$trans_ref)->where('user_id',auth()->user()->id)->first();
          $update = $transType->update([
                'paid' => true,
          ]);
            $active = Subscriber::where('user_id', '=', auth()->user()->id)->whereDate('created_at' , '=', Carbon::today())->first();
            $update =  $active->update([
                'status' => true
            ]);          
            if ($active) {
                $user = User::find(auth()->user()->id)->update([
                    'is_subscribed' => true
                ]);
            }
            return response()->json([
                  'message' => 'You have subscribed successfully to this platform',
            ], 200);
    }

}

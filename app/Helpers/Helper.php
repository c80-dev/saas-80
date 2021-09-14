<?php

  namespace App\Helpers;

  use App\Models\Plan;
  use Carbon\Carbon;
  use App\Models\Log;
  use App\Http\Resources\LogResource;

  class Helper
  {
   
    public $newDateTime;

    //set duration
     public function to($id)
     {
         $now = Carbon::now();
         $plan = Plan::find($id);
         $du = $plan->duration;
         if ($du == 1) {
            $this->newDateTime = Carbon::now()->addMonths(1);
         }elseif ($du == 3) {
            $this->newDateTime = Carbon::now()->addMonths(3);
         }elseif ($du == 6) {
            $this->newDateTime = Carbon::now()->addMonths(6);
         }elseif ($du == 12) {
            $this->newDateTime = Carbon::now()->addMonths(12);
         }else {
            $this->newDateTime = Carbon::now()->addMonths(1);
         }
         return $this->newDateTime;
     }

     //get plan cost
     public function getCost($id)
     {
         $plan = Plan::find($id);
         $cost = $plan->cost;
         return $cost;
     }

    //create logs
    public function createLog(array $request)
    {
        $check = Log::where('log_type', '=', 'SignIn')->where('user_id', '=', auth()->user()->id)->first();
        if($check) {
            $delete = $check->delete();  
            $create_log = Log::create([
                'user_id' => auth()->user()->id,
                'log_type' => $request['log_type'],
                'description' => $request['description']
            ]);
        }else {
            $create_log = Log::create([
                'user_id' => auth()->user()->id,
                'log_type' => $request['log_type'],
                'description' => $request['description']
            ]);
        }
    }

    //logs
    public function logs($id)
    {   
        $logs = Log::where('user_id', '=', $id)->first();
        return new LogResource($logs);
    }

    
     
  }

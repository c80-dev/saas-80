<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Helpers\General;
use App\Helpers\Helper;

class SubscriberResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $general_helper = new General();
        $logs = new Helper();
        return [
            'id'    => $this->id,
            'from'   => $general_helper->clean($this->from),
            'to'     => $general_helper->clean($this->to),
            'status' => $this->status == true ? 'Active' : 'Inactive',
            'user' => new UserResource($this->whenLoaded('user')),
            'login_logs' => $logs->logs($this->user_id),
            'plan'  => $general_helper->clean($this->whenLoaded('plan')),
            'days_remaining' => $this->to,
            'created_at'=> $this->created_at,
            'updated_at'=> $this->updated_at
        ];
    }
}

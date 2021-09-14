<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Helpers\General;

class LogResource extends JsonResource
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
        return [
            'id'        => $this->id,
            'type'      => $general_helper->clean($this->log_type),
            'description'     => $general_helper->clean($this->description),
            'created_at'=> $this->created_at->diffForHumans(),
            'updated_at'=> $this->updated_at
        ];
    }
}

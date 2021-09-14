<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Helpers\General;

class FAQResource extends JsonResource
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
            'title'      => $general_helper->clean($this->title),
            'description'     => $general_helper->clean($this->description),
            'category' =>  new CategoryResource($this->whenLoaded('category')),
            'slug'      => $general_helper->clean($this->slug),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at
        ];
    }
}

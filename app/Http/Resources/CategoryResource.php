<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Helpers\General;

class CategoryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $general_helper = new General();
        return [
            'id'        => $this->id,
            'name'      => $general_helper->clean($this->name),
            'faqs' =>  FAQResource::collection($this->whenLoaded('faqs')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at
        ];
    }
}

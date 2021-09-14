<?php

namespace App\Helpers;

use JD\Cloudder\Facades\Cloudder;

class Cloudinary
{
   //single image
    public function image_helper($request, $file)
    {
        if ($request->hasFile("$file")) {
            Cloudder::upload($request->file("$file"), null, [
                "folder" => "saas-80",  "overwrite" => FALSE,
            ]);
            $cloundary_upload = Cloudder::getResult();
            $image_url = $cloundary_upload['url'];
            return   $image_url;
        }else {
            return  $image_url = "";
        }
    }

}

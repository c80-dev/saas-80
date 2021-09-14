<?php

namespace App\Http\Controllers\Api;

use GuzzleHttp\Client;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class TicketController extends Controller
{   

    public $base_url;

    public function __construct()
    {
        $this->middleware('auth:api');
        $this->middleware('superadmin');
        $this->base_url = new Client(["base_uri" => "https://sass-80.herokuapp.com/"]);
    }

    //get all tickets
    public function allTickets()
    {

        $response = $this->base_url->request('GET', 'tickets');
        $ticekts = json_decode($response->getBody());
        return  $ticekts;
    }

    //reply to tickets
    public function replyTicket(Request $request, $id)
    {
        $validator =  Validator::make($request->all(),[
            'response' => 'required'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'message' => $validator->errors()
            ], 422);

        }else {
            $response = $this->base_url->request('PATCH', "tickets/$id",  [
                'json' => [
                    'response' => $request->response
                ]
            ]);
            if ($response->getStatusCode()== 200) {
                return response()->json([
                    'message' => "Ticket responded to"
                ], 422);
            }else {
                return response()->json([
                    'message' => "Sorry there was an error"
                ], 422);
            }
        }
    }
}

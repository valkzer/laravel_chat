<?php

namespace App\Http\Controllers;

use App\Message;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Response;

class APIController extends Controller
{

    public function sendMessage(Request $request)
    {
        try{
            Auth::user()->messages()->create($request->only('message'));
        }catch (\Exception $e){
            return Response::make('Internal error',500);
        }
        return Response::make('Message sent',200);
    }
    public function getMessages($last_message_id)
    {
        try{
            return Response::json($this->filterMessagesData(Message::where('id','>',$last_message_id)->with('user')->get()),200);
        }catch (\Exception $e){
            return Response::make('Internal error',500);
        }
    }

    private function filterMessagesData(Collection $messages){
        return $messages->map(function($element){
            return [
                        'id'            => $element->id,
                        'created_at'    => $element->created_at->format('d/M h:i a'),
                        'message'       => $element->message,
                        'user'          => ['name' => $element->user->name]
                   ];
        });
    }


}

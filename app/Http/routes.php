<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', ['middleware' => 'auth' , function () { return view('chat');}]);

Route::group(['middleware' => 'auth', 'prefix' => 'api/v1'],function(){
    Route::group(['prefix' => 'messages'], function(){
        Route::get('{last_message_id}'  , 'APIController@getMessages');
        Route::post('send'              , 'APIController@sendMessage');
    });
});

Route::auth();

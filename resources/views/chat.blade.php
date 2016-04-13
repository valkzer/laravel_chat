@extends('layouts.app')
@section('head_extra')
    <link href="{!! asset('css/chat.css') !!}" media="all" rel="stylesheet" type="text/css" />
@endsection

@section('content')
<div id="error-container"></div>
<div class="container-fluid">
    <div class="row chat-box" id="message-history">
    </div>
    <div class="row chat-box">
        <div class="col-xs-12">
            <span id="username">
                {{ Auth::user()->name }}
            </span>
            <span id="username-separator">
                >
            </span>
            <span id="message-content">
                <input type="text" name="message" id="message" tabindex="0" autofocus>
            </span>
        </div>
    </div>
</div>
@endsection
@section('footer_extra')
    <script type="text/javascript" src="{!! asset('js/chat.js') !!}"></script>
@endsection

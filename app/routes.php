<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

Route::get('/', function()
{
	return View::make('animationPicture');

    
});

Route::resource('posts','PostsController');

Route::get('/upload',function(){

	return View::make('upload');

});

Route::get('/uploadPictures',function(){

	return View::make('uploadPictures');

});

Route::get('/uploadPictures2',function(){

	return View::make('uploadPictures2');

});


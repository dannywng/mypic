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
	return View::make('index');
});

Route::get('/navbar', function()
{
	return View::make('buildingNavs');
});

Route::get('/test', function()
{
	return View::make('testMaster');
});

Route::get('/testimage', function()
{
	return View::make('testImage');
});

Route::get('/testimage1col', function()
{
	return View::make('testImage1col');
});

Route::get('/slide', function()
{
	return View::make('animationPicture');
});

Route::get('/ul', function()
{
	return View::make('testul');
});
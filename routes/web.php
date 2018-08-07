<?php

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
Route::get('/topcount', 'HomeController@topCount')->name('topCount');
Route::get('/toptime', 'HomeController@topTime')->name('topTime');
Route::get('/bigdata', 'HomeController@bigData')->name('bigData');
Route::group(array('prefix' => 'api/', 'before' => 'auth.basic'), function()
{
    Route::post('close','API@close');
    Route::post('new','API@newClient');
    Route::get('topcount/{id}', 'API@topCount')->name('topCount');
    Route::get('toptime/{id}', 'API@topTime')->name('topTime');
});
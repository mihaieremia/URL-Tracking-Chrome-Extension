<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\ChromeUsers;
use App\BigData;
use App\CountHost;
use App\CountTime;
use App\CountHostUser;
use App\CountTimeUser;
class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('home');
    }
    public function topTime(){
        $data = CountTime::orderBy('time','DESC')->take(5)->get();
        return $data;
    }
    public function topCount(){
        $data = CountHost::orderBy('count','DESC')->take(5)->get();
        return $data;
    }
    public function bigData()
    {
        $data = BigData::orderBy('created_at','DESC')->get();
        return $data;
    }
}

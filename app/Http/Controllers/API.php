<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\ChromeUsers;
use App\BigData;
use App\CountHost;
use App\CountTime;
use App\CountHostUser;
use App\CountTimeUser;
class API extends Controller
{
    public function __construct()
    {
       $this->middleware('cors');
    }
    public function close(Request $req)
    {
        $website = $req->input('url');
        if (preg_match("/\b(?:(?:https?|ftp):\/\/|www\.)[-a-z0-9+&@#\/%?=~_|!:,.;]*[-a-z0-9+&@#\/%=~_|]/i",$website)) {
        $data = new BigData;
        $data->uniqueID=htmlspecialchars($req->input('userid'));
        $data->url=$website;
        $data->host=htmlspecialchars($req->input('host'));
        $data->open=htmlspecialchars($req->input('open'));
        $data->close=htmlspecialchars($req->input('close'));
        $data->time=htmlspecialchars($req->input('diff'));
        $data->save();
        if(CountHost::where('host',htmlspecialchars($req->input('host')))->exists()){
            $data = (CountHost::select(['count'])->where('host',htmlspecialchars($req->input('host')))->first())->count;
            CountHost::where('host',htmlspecialchars($req->input('host')))->update(['count'=>($data+1)]);
        }
        else{
            $data = new CountHost;
            $data->host=htmlspecialchars($req->input('host'));
            $data->count=1;
            $data->save();
        }
        if(CountTime::where('host',htmlspecialchars($req->input('host')))->exists()){
            $data = (CountTime::select(['time'])->where('host',htmlspecialchars($req->input('host')))->first())->time;
            CountTime::where('host',htmlspecialchars($req->input('host')))->update(['time'=>($data+$req->input('diff'))]);
        }
        else{
            $data = new CountTime;
            $data->host=htmlspecialchars($req->input('host'));
            $data->time=htmlspecialchars($req->input('diff'));
            $data->save();
        }
        if(CountHostUser::where('host',htmlspecialchars($req->input('host')))->where('uniqueID',htmlspecialchars($req->input('userid')))->exists()){
            $data = (CountHostUser::select(['count'])->where('host',htmlspecialchars($req->input('host')))->where('uniqueID',htmlspecialchars($req->input('userid')))->first())->count;
            CountHostUser::where('host',htmlspecialchars($req->input('host')))->where('uniqueID',htmlspecialchars($req->input('userid')))->update(['count'=>($data+1)]);
        }
        else{
            $data = new CountHostUser;
            $data->host=htmlspecialchars($req->input('host'));
            $data->uniqueID=htmlspecialchars($req->input('userid'));
            $data->count=1;
            $data->save();
        }
        if(CountTimeUser::where('host',htmlspecialchars($req->input('host')))->where('uniqueID',htmlspecialchars($req->input('userid')))->exists()){
            $data = (CountTimeUser::select(['time'])->where('host',htmlspecialchars($req->input('host')))->where('uniqueID',htmlspecialchars($req->input('userid')))->first())->time;
            User::where('host',htmlspecialchars($req->input('host')))->where('uniqueID',htmlspecialchars($req->input('userid')))->update(['time'=>($data+$req->input('diff'))]);
        }
        else{
            $data = new CountTimeUser;
            $data->host=htmlspecialchars($req->input('host'));
            $data->time=htmlspecialchars($req->input('diff'));
            $data->uniqueID=htmlspecialchars($req->input('userid'));
            $data->save();
        }
        return "Success";
        }
        return "Fail URL";
    }
    public function newClient(Request $req)
    {
        if(!ChromeUsers::where('uniqueID',$req->input('userid'))->exists())
        {
            $user = new ChromeUsers;
            $user->os=$req->input('info');
            $user->uniqueID=$req->input('userid');
            $user->save();
            return 'Success';
        }
        return "Fail";
    }  
    public function topTime($id){
        $data = CountTimeUser::where('uniqueID',$id)->orderBy('time','DESC')->take(5)->get();
        return $data;
    }
    public function topCount($id){
        $data = CountHostUser::where('uniqueID',$id)->orderBy('count','DESC')->take(5)->get();
        return $data;
    }
}

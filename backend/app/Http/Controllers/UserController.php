<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserController extends Controller
{
       
    function login(Request $req)
    {
        // $user = User::where('email', $req->email)->first();
        $users = [
            [ 
                'email' => 'Admin@gmail.com',
                'password' => 'test123',
                'created_at' => '2023-04-21T17:24:14.000000Z',
                'updated_at' => '2023-04-21T17:24:14.000000Z' 
            ],
            [
                'email' => 'User@gmail.com',
                'password' => 'test123',
                'created_at' => '2023-04-21T17:24:18.000000Z',
                'updated_at' => '2023-04-21T17:24:18.000000Z'
            ],
            [
                'email' => 'Test@gmail.com',
                'password' => 'test123',
                'created_at' => '2023-04-21T17:24:20.000000Z',
                'updated_at' => '2023-04-21T17:24:20.000000Z' 
            ]
          ];
        
        $user = array();
        foreach($users as $key=>$value)
        {
            if( $value['email'] == $req->email && $value['password'] == $req->password)
            {
                $user = $value;
            }        
        }

        if(!$user['email'] || !$user['password'])
        {
            return ["error"=>"Email or Password is not correct"];
        }
        else
        {
            return $user;
        } 
    }
}
